import fs from 'fs/promises';
import { getRandomColor } from '../colors';
import { Layer, Rarity, replaceColor, randomInt, randomRarity } from '../../utils';

type GradientConfig = { x1: number, x2: number, y1: number, y2: number };

const gradientDirections: Record<string, GradientConfig> = {
    right: { x1: 0, x2: 1, y1: 0, y2: 0 },
    left: { x1: 1, x2: 0, y1: 0, y2: 0 },
    down: { x1: 0, x2: 0, y1: 0, y2: 1 },
    up: { x1: 0, x2: 0, y1: 1, y2: 0 },
}

const getGradientTemplate = (
    { x1, x2, y1, y2 }: GradientConfig,
    color1: string,
    color2: string
) => `
    <linearGradient id="linear-gradient" x1="${x1}" x2="${x2}" y1="${y1}" y2="${y2}" gradientUnits="objectBoundingBox">
        <stop offset="0" stop-color="${color1}"/>
        <stop offset="1" stop-color="${color2}"/>
    </linearGradient>
`

function getRandomDirection() {
    const directions = Object.keys(gradientDirections);
    const randomKey = directions[randomInt(directions.length - 1)];
    const config = gradientDirections[randomKey as keyof typeof gradientDirections];

    return { name: randomKey, config };
}

export const generateGradient = async (color1: string, color2: string): Promise<Layer> => {
    // get random direction config
    const direction = getRandomDirection();
    const gradient = getGradientTemplate(direction.config, color1, color2);

    const gradientName = `gradient-${direction.name}`;

    return { name: gradientName, value: gradient, rarity: Rarity.Epic };
}