// src/ui/ConsoleTable.js
const Table = require('cli-table3');

class ConsoleTable {
    static generateProbabilityTable(diceList, probabilities) {
        const header = ['User dice \\', ...diceList.map(d => d.toString())];
        const table = new Table({
            head: header,
            colWidths: Array(header.length).fill(null).map((_, i) => i === 0 ? 15 : 10), // Adjust column widths
            wordWrap: true
        });

        for (let i = 0; i < diceList.length; i++) {
            const row = [diceList[i].toString()];
            for (let j = 0; j < diceList.length; j++) {
                if (i === j) {
                    row.push('---'); // Dice cannot play against itself
                } else {
                    const prob = probabilities[i][j]; // Prob of dice[i] winning against dice[j]
                    row.push(`${prob.toFixed(4)}`);
                }
            }
            table.push(row);
        }

        console.log("\nProbability of the win for the user:");
        console.log(table.toString());
        console.log("\nThe diagonals are formatted differently because the dice cannot play against itself.");
    }

    static generateHelpTable() {
        const table = new Table({
            head: ['#', 'Computer', 'User'],
            colWidths: [5, 30, 30],
            wordWrap: true
        });

        table.push(
            ['1', 'Generates a random number $x \\in [0,1,2,3,4,5]$', ''],
            ['2', 'Generates a secret key', ''],
            ['3', 'Calculates and displays $HMAC(key).calculate(x)$', ''],
            ['4', '', 'Selects a number $y \\in [0,1,2,3,4,5]$'],
            ['5', 'Calculates the result $(x + y) \\% 6$', ''],
            ['6', 'Shows both the result and the key', '']
        );

        console.log("\nHow 'Fair Random Generation' works:");
        console.log(table.toString());
    }
}

module.exports = ConsoleTable;