import fse from 'fs-extra'
import { generateGradient } from './layers/gradient';
import { getRandomColor } from './layers/colors';
import { getRandomGrid } from './layers/grids';
import { getRandomNegative } from './layers/negatives';
import { addLayerToSvg, getMetadata, Layer, randomRarity, Rarity, replaceColor } from './utils';

const NUM_TO_GENERATE = process.argv[2]
    ? parseInt(process.argv[2]) 
    : 10;

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
    let color: Layer;
    let secondaryColor: Layer | undefined = undefined;
    let grid: Layer;
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

    // replace fill colors to be either gradient or primary color
    grid.value = replaceColor(grid.value, gradient ? 'url(#linear-gradient-opposite)' : color.value);
    negative.value = replaceColor(negative.value, gradient ? 'url(#linear-gradient)' : color.value);

    svg = addLayerToSvg(svg, grid);
    svg = addLayerToSvg(svg, negative);

    const datacode = secondaryColor 
        ? `${color.id}-${grid.id}-${negative.id}-${secondaryColor.id}`
        : `${color.id}-${grid.id}-${negative.id}`;

    const metadata = {
        id: ind,
        color: getMetadata(color),
        grid: getMetadata(grid),
        negative: getMetadata(negative),
        gradient: gradient && getMetadata(gradient), 
        gradientColor: secondaryColor && getMetadata(secondaryColor),
        datacode,
    }

    // if generation is not unique, regenerate
    if(alreadyGenerated[datacode]) {
        console.log('already generated: ', datacode);
        generate(ind);
    }
    
    await fse.outputFile(`out/test-${ind}.svg`, svg);
    await fse.outputFile(`out/test-${ind}.json`, JSON.stringify(metadata, null, 2));
}

async function bootstrap() {
    await Promise.all(
        new Array(NUM_TO_GENERATE)
            .fill(0)
            .map(async (_, i) => await generate(i))
    );
}

bootstrap().catch(e => console.error(e));