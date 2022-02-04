import fse from 'fs-extra'
import { generateGradient } from './layers/gradient';
import { getRandomColor } from './layers/colors';
import { getRandomGrid } from './layers/grids';
import { Layer, randomRarity, Rarity, replaceColor } from './utils';

const template = `
    <svg width="256" height="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <!-- gradient -->
        </defs>
        <rect width="256" height="256" fill="#000"/>
        <!-- grid -->
        <!-- negative -->
    </svg>
`

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
    grid = await getRandomGrid(color.value);
    // svg = svg.replace('<!-- grid -->', grid.value);

    // if chance is at least Rare, add gradient to grid and negative
    if(randomRarity() <= Rarity.Rare) {
        secondaryColor = getRandomColor();
        gradient = await generateGradient(color.value, secondaryColor.value);
        svg = svg.replace('<!-- gradient -->', gradient.value);

        // make grid fill into gradient fill
        grid.value = replaceColor(grid.value, 'url(#linear-gradient');
    }

    // replace fill colors in grid to be either gradient or primary color
    grid.value = replaceColor(grid.value, gradient ? 'url(#linear-gradient' : color.value);

    svg = svg.replace('<!-- grid -->', grid.value);
    
    await fse.outputFile(`out/test-${ind}.svg`, svg);
}

async function bootstrap() {
    await Promise.all(
        new Array(10)
            .fill(0)
            .map(async (_, i) => await generate(i))
    );
}

bootstrap().catch(e => console.error(e));