import fse from 'fs-extra'
import { getRandomColor } from './layers/colors';
import { getRandomGrid } from './layers/grids';

const template = `
    <svg width="256" height="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="256" height="256" fill="#000"/>
        <!-- grid -->
    </svg>
`

async function generate(ind: number) {
    const color = getRandomColor();
    const grid = await getRandomGrid(color.value);
    console.log(grid.name);
    const final = template.replace('<!-- grid -->', grid.value);
    await fse.outputFile(`out/test-${ind}.svg`, final);
}

async function bootstrap() {
    await Promise.all(
        new Array(10)
            .fill(0)
            .map(async (_, i) => await generate(i))
    );
}

bootstrap().catch(e => console.error(e));