import fs from 'fs/promises';
import { LayerConfig, randomRarity, Rarity, randomInt, Layer } from '../../utils';

const grids = async (): Promise<LayerConfig> => {
    const getGridLayer = async (gridName: string) => {
        const grid = await fs.readFile(`layers/grids/${gridName}.svg`);
        return grid.toString();
    }

    return {
        [Rarity.Common]: [
            { id: 0, name: '5x5',                  value: await getGridLayer('5x5') },
            { id: 1, name: 'missing_corners',      value: await getGridLayer('missing_corners') },
            { id: 2, name: '3x3',                  value: await getGridLayer('3x3') },
            { id: 3, name: '5_horizontal',         value: await getGridLayer('5_horizontal') },
            { id: 4, name: '5_vertical',           value: await getGridLayer('5_vertical') },
        ],
        [Rarity.Uncommon]: [
            { id: 5,  name: 'missing_corners_rotated',  value: await getGridLayer('missing_corners_rotated') },
            { id: 6,  name: '3x3_rotated',              value: await getGridLayer('3x3_rotated') },
            { id: 7,  name: '5_plus_corners',           value: await getGridLayer('5_plus_corners') },
            { id: 8,  name: '3_horizontal',             value: await getGridLayer('3_horizontal') },
            { id: 9,  name: '3_vertical',               value: await getGridLayer('3_vertical') },
            { id: 10, name: '5_plus',                   value: await getGridLayer('5_plus') },
            { id: 11, name: '3_plus',                   value: await getGridLayer('3_plus') },
        ],
        [Rarity.Rare]: [
            { id: 12, name: '3_rotated_cw',     value: await getGridLayer('3_rotated_cw') },
            { id: 13, name: '3_rotated_ccw',    value: await getGridLayer('3_rotated_ccw') },
            { id: 14, name: '5_plus_rotated',   value: await getGridLayer('5_plus_rotated') },
            { id: 15, name: '3_plus_rotated',   value: await getGridLayer('3_plus_rotated') },
            { id: 16, name: '5_rotated_cw',     value: await getGridLayer('5_rotated_cw') },
            { id: 17, name: '5_rotated_ccw',    value: await getGridLayer('5_rotated_ccw') },
        ],
        [Rarity.Epic]: [
            { id: 18, name: 'frame',    value: await getGridLayer('frame') },
            { id: 19, name: 'cube',     value: await getGridLayer('cube') },
            { id: 20, name: 'single',   value: await getGridLayer('single') },
        ],
        [Rarity.Legendary]: [
            { id: 21, name: 'diamond',      value: await getGridLayer('diamond') },
            { id: 22, name: 'single_large', value: await getGridLayer('single_large') },
        ],
    }
}

export const getRandomGrid = async (): Promise<Layer> => {
    const rarity = randomRarity();
    const max = (await grids())[rarity]!.length - 1;
    const grid = (await grids())[rarity]![randomInt(max)];

    return { ...grid as Layer, rarity };
}