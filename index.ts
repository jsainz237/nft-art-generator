import fs from 'fs/promises';
import fse from 'fs-extra'
import { randomRarity } from './utils';
import { getRandomColorOfRarity } from './layers/colors';

const template = `
    <svg width="256" height="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="256" height="256" fill="#000"/>
        <!-- grid -->
    </svg>
`

async function generate() {
    let grid = (await fs.readFile('layers/grids/5x5.svg')).toString();
    grid = grid.replace(/#696969/g, '#FF0000');
    const final = template.replace('<!-- grid -->', grid.toString());
    await fse.outputFile('out/test.svg', final);
}

async function bootstrap() {
    const color = getRandomColorOfRarity(randomRarity());
    console.log(color.name);
}

bootstrap().catch(e => console.error(e));