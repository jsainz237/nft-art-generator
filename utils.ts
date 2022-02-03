export interface Layer {
    value: any;
    name: string;
}

export enum Rarity {
    // name -- percentage
    Common = 100,
    Uncommon = 30,
    Rare = 10,
    Epic = 5,
    Legendary = 2,
}

export type LayerConfig = Partial<Record<Rarity, Layer[]>>;

export function randomInt(max: number = 100) {
    return Math.floor(Math.random() * (max + 1));
}

export function randomRarity(): Rarity {
    const rarities = Object.entries(Rarity)
        .filter(([n, v]) => typeof v === 'number')
        .sort(([na, va]: any, [nb, vb]: any) => va - vb);

    for(const [name, percentage] of rarities) {
        if(randomInt() <= percentage) {
            return Rarity[name as keyof typeof Rarity];
        }
    }

    return Rarity.Common;
}

export function replaceColor(str: string, color: string): string {
    return str.replace(/#696969/g, color);
}