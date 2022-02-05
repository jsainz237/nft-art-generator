import fs from 'fs/promises';
import { getRandomColor } from '../colors';
import { Layer, Rarity, replaceColor, randomInt, randomRarity } from '../../utils';

type GradientConfig = { x1: number, x2: number, y1: number, y2: number, opposite: string };

const gradientDirections: Record<string, GradientConfig> = {
    right: { x1: 0, x2: 1, y1: 0, y2: 0, opposite: 'left' },
    left: { x1: 1, x2: 0, y1: 0, y2: 0, opposite: 'right' },
    down: { x1: 0, x2: 0, y1: 0, y2: 1, opposite: 'up' },
    up: { x1: 0, x2: 0, y1: 1, y2: 0, opposite: 'down' },
}

const getGradientTemplate = (
    direction: GradientConfig,
    color1: string,
    color2: string
) => {
    const pd = direction;
    const od = gradientDirections[direction.opposite];
    return `
        <defs>
            <linearGradient id="linear-gradient" x1="${pd.x1}" x2="${pd.x2}" y1="${pd.y1}" y2="${pd.y2}" gradientUnits="objectBoundingBox">
                <stop offset="0" stop-color="${color1}"/>
                <stop offset="1" stop-color="${color2}"/>
            </linearGradient>
            <linearGradient id="linear-gradient-opposite" x1="${od.x1}" x2="${od.x2}" y1="${od.y1}" y2="${od.y2}" gradientUnits="objectBoundingBox">
                <stop offset="0" stop-color="${color1}"/>
                <stop offset="1" stop-color="${color2}"/>
            </linearGradient>
        </defs>
    `
}

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

    return { id: 1, name: gradientName, value: gradient, rarity: Rarity.Epic };
}