import fse from 'fs-extra'
import sharp from 'sharp';
import pLimit from 'p-limit';
import ProgressBar from 'progress';
import { generateGradient } from './layers/gradient';
import { getRandomColor } from './layers/colors';
import { getRandomGrid } from './layers/grids';
import { getRandomNegative } from './layers/negatives';
import { addLayerToSvg, getMetadata, Layer, randomRarity, Rarity, replaceColor } from './utils';

const limit = pLimit(10);

const NUM_TO_GENERATE = process.argv[2]
    ? parseInt(process.argv[2]) 
    : 10;

const progressBar = new ProgressBar('generating :current/:total [:bar] :percent :rate/bps :etas', {
    width: 50,
    total: NUM_TO_GENERATE,
});

const template = `
    <svg width="256" height="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <!-- insert defs above -->
        </defs>
        <rect width="256" height="256" fill="#000"/>
        <!-- insert content above -->
    </svg>
`

const alreadyGenerated: Record<string, boolean> = {};

async function generate(ind: number) {
    const id = ind + 1;
    let color: Layer;
    let secondaryColor: Layer | undefined = undefined;
    let grid: Layer;
    let isBorders: boolean = false;
    let negative: Layer;
    let gradient: Layer | undefined = undefined;

    let svg = template;

    // get random primary color
    color = getRandomColor();

    // get random grid layer
    grid = await getRandomGrid();
    
    // get random negative layer
    negative = await getRandomNegative();

    // if chance is at least Rare, add gradient to grid and negative
    if(randomRarity() <= Rarity.Rare) {
        do {
            secondaryColor = getRandomColor()
        } while(secondaryColor.value === color.value);

        gradient = await generateGradient(color.value, secondaryColor.value);
        svg = addLayerToSvg(svg, gradient);
    }

    // determine if grid should be borders
    if(randomRarity() <= Rarity.Legendary) {
        isBorders = true;
    }

    // replace fill colors to be either gradient or primary color
    grid.value = replaceColor(
        grid.value,
        gradient ? 'url(#linear-gradient-opposite)' : color.value,
        isBorders
    );
    negative.value = replaceColor(negative.value, gradient ? 'url(#linear-gradient)' : color.value);

    svg = addLayerToSvg(svg, grid);
    svg = addLayerToSvg(svg, negative);

    const datacode = `
        ${color.id}-
        ${grid.id}
        ${isBorders ? '-b' : ''}-
        ${negative.id}
        ${secondaryColor ? `-${secondaryColor.id}` : ''}
    `.replace(/[ \n]/g, '');

    const same_datacode_with_opposite_colors = secondaryColor && `
        ${secondaryColor.id}-
        ${grid.id}
        ${isBorders ? '-b' : ''}-
        ${negative.id}
        ${color.id}
    `.replace(/[ \n]/g, '');

    const metadata = {
        name: `dot-${id}`,
        description: "idk it's just dots",
        datacode,
        attributes: [
            getMetadata({ color }),
            getMetadata({ grid }),
            getMetadata({ negative }),
            getMetadata({ gradient }),
            getMetadata({ 'gradient color': secondaryColor }),
            (!isBorders ? null : {
                value: 'borders',
            })
        ].filter(val => !!val),
    }

    // if generation is not unique, regenerate
    if(
        alreadyGenerated[datacode] || 
        (
            same_datacode_with_opposite_colors && 
            alreadyGenerated[same_datacode_with_opposite_colors]
        )
    ) {
        generate(id);
    }
    
    await fse.outputFile(`out/${id}.svg`, svg);
    await fse.outputFile(`out/${id}.json`, JSON.stringify(metadata, null, 2));
    await sharp(`./out/${id}.svg`).resize(1024).toFile(`./out/${id}.png`);
    progressBar.tick();
}

async function bootstrap() {
    const promises = new Array(NUM_TO_GENERATE).fill(0)
        .map((_, i) => limit(generate, i));

    await Promise.all(promises);
}

bootstrap()
    .then(() => console.log('done'))
    .catch(e => console.error(e));