import { randomInt } from "crypto";
import { Layer, LayerConfig, randomRarity, Rarity } from "../../utils";

const colors: LayerConfig = {
    [Rarity.Common]: [
        { value: '#1D4E89', name: 'Yale Blue' },
        { value: '#DA3E52', name: 'Amaranth' },
        { value: '#EDDEA4', name: 'Medium Champagne' },
        { value: '#FFFFFF', name: 'White' },
    ],
    [Rarity.Uncommon]: [
        { value: '#F6BDD1', name: 'Orchid Pink' },
        { value: '#40CBC0', name: 'Medium Turquoise' },
        { value: '#3F84E5', name: 'Azure' },
        { value: '#9097C0', name: 'Blue Bell' },
        { value: '#BFACC8', name: 'Thistle' },
        { value: '#247BA0', name: 'Celadon Blue' },
    ]
}

export const getRandomColor = (): Layer => {
    let rarity = randomRarity();

    // if the random rarity does not exist in config,
    // get Uncommon instead, since that would be next best
    if(!colors[rarity]) {
        rarity = Rarity.Uncommon;
    }

    const max = colors[rarity]!.length;
    return colors[rarity]![randomInt(max)];
}