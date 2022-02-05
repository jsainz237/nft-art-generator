import fs from 'fs/promises';
import { LayerConfig, randomRarity, Rarity, randomInt, Layer } from '../../utils';

const negatives = async (): Promise<LayerConfig> => {
    const getNegativeLayer = async (negativeName: string) => {
        const negative = await fs.readFile(`layers/negatives/${negativeName}.svg`);
        return negative.toString();
    }

    return {
        [Rarity.Common]: [
            { id: 0, name: 'None',                  value: await getNegativeLayer('None') },
            { id: 1, name: 'Quarter_bottom_right',  value: await getNegativeLayer('Quarter_bottom_right') },
            { id: 2, name: 'Quarter_top_right',     value: await getNegativeLayer('Quarter_top_right') },
            { id: 3, name: 'Quarter_bottom_left',   value: await getNegativeLayer('Quarter_bottom_left') },
            { id: 4, name: 'Quarter_top_left',      value: await getNegativeLayer('Quarter_top_left') },
        ],
        [Rarity.Uncommon]: [
            { id: 5, name: 'Half_right',               value: await getNegativeLayer('Half_right') },
            { id: 6, name: 'Half_left',                value: await getNegativeLayer('Half_left') },
            { id: 7, name: 'Half_top',                 value: await getNegativeLayer('Half_top') },
            { id: 8, name: 'Half_bottom',              value: await getNegativeLayer('Half_bottom') },
            { id: 9, name: 'Quarter_rotated_left',     value: await getNegativeLayer('Quarter_rotated_left') },
            { id: 10, name: 'Quarter_rotated_top',      value: await getNegativeLayer('Quarter_rotated_top') },
            { id: 11, name: 'Quarter_rotated_bottom',   value: await getNegativeLayer('Quarter_rotated_bottom') },
            { id: 12, name: 'Quarter_rotated_right',    value: await getNegativeLayer('Quarter_rotated_right') },
        ],
        [Rarity.Rare]: [
            { id: 13, name: 'half_rotated_top_right',       value: await getNegativeLayer('half_rotated_top_right') },
            { id: 14, name: 'half_rotated_bottom_right',    value: await getNegativeLayer('half_rotated_bottom_right') },
            { id: 15, name: 'half_rotated_top_left',        value: await getNegativeLayer('half_rotated_top_left') },
            { id: 16, name: 'half_rotated_bottom_left',     value: await getNegativeLayer('half_rotated_bottom_left') },
        ],
        [Rarity.Epic]: [
            { id: 17, name: '3_quarters_right',     value: await getNegativeLayer('3_quarters_right') },
            { id: 18, name: '3_quarters_left',      value: await getNegativeLayer('3_quarters_left') },
            { id: 19, name: '3_quarters_top',       value: await getNegativeLayer('3_quarters_top') },
            { id: 20, name: '3_quarters_bottom',    value: await getNegativeLayer('3_quarters_bottom') },
        ],
        [Rarity.Legendary]: [
            { id: 21, name: 'Full', value: await getNegativeLayer('Full') },
        ],
    }
}

export const getRandomNegative = async (): Promise<Layer> => {
    const rarity = randomRarity();
    const max = (await negatives())[rarity]!.length - 1;
    const negative = (await negatives())[rarity]![randomInt(max)];

    return { ...negative as Layer, rarity };
}