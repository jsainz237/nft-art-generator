import fs from 'fs/promises';
import { LayerConfig, randomRarity, Rarity, randomInt, Layer } from '../../utils';

const negatives = async (): Promise<LayerConfig> => {
    const getNegativeLayer = async (negativeName: string) => {
        const negative = await fs.readFile(`layers/negatives/${negativeName}.svg`);
        return negative.toString();
    }

    return {
        [Rarity.Common]: [
            { name: 'Quarter_bottom_right', value: await getNegativeLayer('Quarter_bottom_right') },
            { name: 'Quarter_top_right',    value: await getNegativeLayer('Quarter_top_right') },
            { name: 'Quarter_bottom_left',  value: await getNegativeLayer('Quarter_bottom_left') },
            { name: 'Quarter_top_left',     value: await getNegativeLayer('Quarter_top_left') },
        ],
        [Rarity.Uncommon]: [
            { name: 'Half_right',               value: await getNegativeLayer('Half_right') },
            { name: 'Half_left',                value: await getNegativeLayer('Half_left') },
            { name: 'Half_top',                 value: await getNegativeLayer('Half_top') },
            { name: 'Half_bottom',              value: await getNegativeLayer('Half_bottom') },
            { name: 'Quarter_rotated_left',     value: await getNegativeLayer('Quarter_rotated_left') },
            { name: 'Quarter_rotated_top',      value: await getNegativeLayer('Quarter_rotated_top') },
            { name: 'Quarter_rotated_bottom',   value: await getNegativeLayer('Quarter_rotated_bottom') },
            { name: 'Quarter_rotated_right',    value: await getNegativeLayer('Quarter_rotated_right') },
        ],
        [Rarity.Rare]: [
            { name: 'half_rotated_top_right',       value: await getNegativeLayer('half_rotated_top_right') },
            { name: 'half_rotated_bottom_right',    value: await getNegativeLayer('half_rotated_bottom_right') },
            { name: 'half_rotated_top_left',        value: await getNegativeLayer('half_rotated_top_left') },
            { name: 'half_rotated_bottom_left',     value: await getNegativeLayer('half_rotated_bottom_left') },
        ],
        [Rarity.Epic]: [
            { name: '3_quarters_right',     value: await getNegativeLayer('3_quarters_right') },
            { name: '3_quarters_left',      value: await getNegativeLayer('3_quarters_left') },
            { name: '3_quarters_top',       value: await getNegativeLayer('3_quarters_top') },
            { name: '3_quarters_bottom',    value: await getNegativeLayer('3_quarters_bottom') },
        ],
        [Rarity.Legendary]: [
            { name: 'Full',      value: await getNegativeLayer('Full') },
        ],
    }
}

export const getRandomNegative = async (): Promise<Layer> => {
    const rarity = randomRarity();
    const max = (await negatives())[rarity]!.length - 1;
    const negative = (await negatives())[rarity]![randomInt(max)];

    return { ...negative as Layer, rarity };
}