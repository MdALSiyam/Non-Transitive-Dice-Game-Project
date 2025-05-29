// src/services/ProbabilityCalculator.js
class ProbabilityCalculator {
    static calculateWinProbabilities(diceList) {
        const numDice = diceList.length;
        const probabilities = Array(numDice).fill(0).map(() => Array(numDice).fill(0));

        for (let i = 0; i < numDice; i++) {
            for (let j = 0; j < numDice; j++) {
                if (i === j) {
                    probabilities[i][j] = NaN; // Or some indicator for "self"
                    continue;
                }

                const dice1 = diceList[i];
                const dice2 = diceList[j];

                let wins1 = 0;
                let wins2 = 0;
                let draws = 0;
                let totalRolls = dice1.faces.length * dice2.faces.length;

                for (const face1 of dice1.faces) {
                    for (const face2 of dice2.faces) {
                        if (face1 > face2) {
                            wins1++;
                        } else if (face2 > face1) {
                            wins2++;
                        } else {
                            draws++;
                        }
                    }
                }
                probabilities[i][j] = wins1 / totalRolls; // Probability of dice[i] winning against dice[j]
            }
        }
        return probabilities;
    }
}

module.exports = ProbabilityCalculator;