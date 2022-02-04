import fs from 'fs/promises';
import { LayerConfig, randomRarity, Rarity, randomInt, Layer } from '../../utils';

const grids = async (color: string): Promise<LayerConfig> => {
    const getGridLayer = async (gridName: string) => {
        const grid = await fs.readFile(`layers/grids/${gridName}.svg`);
        return grid.toString();
    }

    return {
        [Rarity.Common]: [
            { name: '5x5',                  value: await getGridLayer('5x5') },
            { name: 'missing_corners',      value: await getGridLayer('missing_corners') },
            { name: '3x3',                  value: await getGridLayer('3x3') },
            { name: '5_horizontal',         value: await getGridLayer('5_horizontal') },
            { name: '5_vertical',           value: await getGridLayer('5_vertical') },
        ],
        [Rarity.Uncommon]: [
            { name: 'missing_corners_rotated',  value: await getGridLayer('missing_corners_rotated') },
            { name: '3x3_rotated',              value: await getGridLayer('3x3_rotated') },
            { name: '5_plus_corners',           value: await getGridLayer('5_plus_corners') },
            { name: '3_horizontal',             value: await getGridLayer('3_horizontal') },
            { name: '3_vertical',               value: await getGridLayer('3_vertical') },
            { name: '5_plus',                   value: await getGridLayer('5_plus') },
            { name: '3_plus',                   value: await getGridLayer('3_plus') },
        ],
        [Rarity.Rare]: [
            { name: '3_rotated_cw',     value: await getGridLayer('3_rotated_cw') },
            { name: '3_rotated_ccw',    value: await getGridLayer('3_rotated_ccw') },
            { name: '5_plus_rotated',   value: await getGridLayer('5_plus_rotated') },
            { name: '3_plus_rotated',   value: await getGridLayer('3_plus_rotated') },
            { name: '5_rotated_cw',     value: await getGridLayer('5_rotated_cw') },
            { name: '5_rotated_ccw',    value: await getGridLayer('5_rotated_ccw') },
        ],
        [Rarity.Epic]: [
            { name: 'frame',    value: await getGridLayer('frame') },
            { name: 'cube',     value: await getGridLayer('cube') },
            { name: 'single',   value: await getGridLayer('single') },
        ],
        [Rarity.Legendary]: [
            { name: 'diamond',      value: await getGridLayer('diamond') },
            { name: 'single_large', value: await getGridLayer('single_large') },
        ],
    }
}

export const getRandomGrid = async (color: string): Promise<Layer> => {
    const rarity = randomRarity();
    const max = (await grids(color))[rarity]!.length - 1;
    const grid = (await grids(color))[rarity]![randomInt(max)];

    return { ...grid as Layer, rarity };
}