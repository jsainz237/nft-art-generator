export interface Layer<T=string> {
    id: string | number;
    value: T;
    name: string;
    rarity: Rarity;
}

export function getMetadata(trait: { [key: string]: Layer | undefined }) {
    const [trait_type, layer] = Object.entries(trait)[0];
    
    if(!layer) return null;

    return { trait_type, value: layer.name };
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

export function replaceColor(str: string, colorOrId: string, toBorder?: boolean): string {
    const replacement = toBorder
        ? `fill="none" stroke="${colorOrId}" stroke-width="2"`
        : `fill="${colorOrId}"`;

    return str.replace(/(fill=".+?")/g, replacement);
}
export function addLayerToSvg(svg: string, layer: Layer): string {
    const defRegex = RegExp(/<defs>\n((.|\n)*)<\/defs>/m);
    const contentRegex = RegExp(/<\/defs>\n((.|\n)*)<\/svg>/m);

    // console.log(layer.value);
    const defs = layer.value.match(defRegex)?.[1] ?? '';
    const content = layer.value.match(contentRegex)?.[1] ?? '';


    return svg
        .replace(/<!-- insert defs above -->/g, `${defs}<!-- insert defs above -->`)
        .replace(/<!-- insert content above -->/g, `${content}<!-- insert content above -->`)
}