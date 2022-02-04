export interface Layer<T=string> {
    value: T;
    name: string;
    rarity: Rarity;
    [key: string]: any;
}

export enum Rarity {
    // name -- percentage
    Common = 100,
    Uncommon = 40,
    Rare = 20,
    Epic = 8,
    Legendary = 3,
}

export type LayerConfig = Partial<Record<Rarity, Omit<Layer, 'rarity'>[]>>;

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

export function replaceColor(str: string, colorOrId: string): string {
    return str.replace(/(fill=".+?")/g, `fill="${colorOrId}"`);
}