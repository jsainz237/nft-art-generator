import { randomInt } from "crypto";
import { Layer, LayerConfig, randomRarity, Rarity } from "../../utils";

const colors: LayerConfig = {
    [Rarity.Common]: [
        { id: 'yb', value: '#1D4E89', name: 'Yale Blue' },
        { id: 'am', value: '#DA3E52', name: 'Amaranth' },
        { id: 'mc', value: '#EDDEA4', name: 'Medium Champagne' },
        { id: 'wh', value: '#FFFFFF', name: 'White' },
    ],
    [Rarity.Uncommon]: [
        { id: 'op', value: '#F6BDD1', name: 'Orchid Pink' },
        { id: 'mt', value: '#40CBC0', name: 'Medium Turquoise' },
        { id: 'az', value: '#3F84E5', name: 'Azure' },
        { id: 'bb', value: '#9097C0', name: 'Blue Bell' },
        { id: 'th', value: '#BFACC8', name: 'Thistle' },
        { id: 'cb', value: '#247BA0', name: 'Celadon Blue' },
    ]
}

export const getRandomColor = (rarityLevel?: Rarity): Layer<string> => {
    let rarity = rarityLevel ?? randomRarity();

    // if the random rarity does not exist in config,
    // get Uncommon instead, since that would be next best
    if(!colors[rarity]) {
        rarity = Rarity.Uncommon;
    }

    const max = colors[rarity]!.length;
    const color = colors[rarity]![randomInt(max)];

    return { ...color as Layer, rarity };
}