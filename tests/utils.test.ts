import { Rarity, randomRarity, randomInt } from "../utils";

describe('Utility Functions', () => {
    test('Correct dispersement of random rarities', () => {
        const iterations = 10000;
        let dispersement: Record<number, number> = {};
        Object.values(Rarity)
            .filter(val => typeof val === 'number')
            .forEach(val => {
                dispersement[val as Rarity] = 0;
            });

        for(let i = 0; i < iterations; i++) {
            const rarity = randomRarity();
            dispersement[rarity] += 1;
        }

        const sortedDistribution = Object.entries(dispersement)
            .map(([rarity, count]) => ({ rarity: parseInt(rarity), count}))
            .sort((a, b) => b.count - a.count)
            .map(({ rarity }) => rarity);
        
        expect(sortedDistribution).toEqual([
            Rarity.Common,
            Rarity.Uncommon,
            Rarity.Rare,
            Rarity.Epic,
            Rarity.Legendary,
        ]);
    });

    describe('randomInt', () => {
        test('randomInt never goes above max', () => {
            for(let i = 0; i <= 1000; i++) {
                const max = 3;
                const random = randomInt(max);
                expect(random).not.toBeGreaterThan(max);
                expect(random).not.toBeLessThan(0);
            }
        });

        test('randomInt never goes out of array scope', () => {
            const testArr = [0, 1, 2, 3];
            for(let i = 0; i <= 1000; i++) {
                const max = testArr.length - 1;
                const random = randomInt(max);
                expect(random).not.toBeGreaterThan(max);
                expect(random).not.toBeLessThan(0);
                expect(testArr[random]).toBeDefined();
            }
        })
    })
})