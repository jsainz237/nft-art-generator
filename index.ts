import fs from 'fs/promises';
import fse from 'fs-extra'

const template = `
    <svg width="256" height="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="256" height="256" fill="#000"/>
        <!-- grid -->
    </svg>
`

async function bootstrap() {
    const grid = await fs.readFile('layers/grids/5x5.svg');
    const final = template.replace('<!-- grid -->', grid.toString());
    await fse.outputFile('out/test.svg', final);
}

bootstrap().catch(e => console.error(e));