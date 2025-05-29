// src/services/DiceGame.js
const Dice = require('../models/Dice');
const FairnessProtocol = require('./FairnessProtocol');
const ProbabilityCalculator = require('./ProbabilityCalculator');
const ConsoleTable = require('../ui/ConsoleTable');
const readline = require('readline-sync');

class DiceGame {
    constructor(diceConfigs) {
        this.diceList = diceConfigs.map(config => new Dice(config.split(',').map(Number)));
        this.userDice = null;
        this.computerDice = null;
    }

    async run() {
        console.log("\nWelcome to the Non-Transitive Dice Game!");

        // Step 1: Determine who makes the first move (fairly)
        console.log("\nLet's determine who makes the first move.");
        const firstMoveSelection = await FairnessProtocol.generateFairNumber(0, 1, "determining who makes the first move"); // 0 for computer, 1 for user

        if (firstMoveSelection === 0) {
            console.log("\nComputer makes the first move.");
            await this.computerSelectsDice();
        } else {
            console.log("\nUser makes the first move.");
            await this.userSelectsDice();
        }

        // Play the game
        await this.playGame();
    }

    async userSelectsDice() {
        this.userDice = await this.promptDiceSelection("Choose your dice:", "user");
        // Computer selects the other dice randomly
        const remainingDice = this.diceList.filter(d => d !== this.userDice);
        this.computerDice = remainingDice[Math.floor(Math.random() * remainingDice.length)];
        console.log(`You chose the ${this.userDice.toString()} dice.`);
        console.log(`Computer chose the ${this.computerDice.toString()} dice.`);
    }

    async computerSelectsDice() {
        this.computerDice = this.diceList[Math.floor(Math.random() * this.diceList.length)];
        // User selects the other dice
        console.log(`Computer chose the ${this.computerDice.toString()} dice.`);
        const remainingDice = this.diceList.filter(d => d !== this.computerDice);
        this.userDice = await this.promptDiceSelection("Choose your dice:", "user", remainingDice);
        console.log(`You chose the ${this.userDice.toString()} dice.`);
    }

    async promptDiceSelection(prompt, playerType, availableDice = this.diceList) {
        console.log(`\n${prompt}`);
        availableDice.forEach((dice, index) => {
            console.log(`${index} - ${dice.toString()}`);
        });
        console.log("X - exit");
        console.log("? - help");

        let selectedDice = null;
        while (selectedDice === null) {
            const input = readline.question("Your selection: ").toLowerCase();

            if (input === 'x') {
                console.log("Exiting game. Goodbye!");
                process.exit(0);
            } else if (input === '?') {
                ConsoleTable.generateHelpTable();
                continue;
            }

            const selectionIndex = parseInt(input);
            if (isNaN(selectionIndex) || selectionIndex < 0 || selectionIndex >= availableDice.length) {
                console.log("Invalid selection. Please choose a valid option.");
            } else {
                selectedDice = availableDice[selectionIndex];
                break;
            }
        }
        return selectedDice;
    }

    async playGame() {
        console.log("\nIt's time for your roll.");

        const userRollResultRaw = await FairnessProtocol.generateFairNumber(0, 5, "user's roll (0-5 range for fairness)");
        const computerRollResultRaw = await FairnessProtocol.generateFairNumber(0, 5, "computer's roll (0-5 range for fairness)");

        const finalUserRoll = this.userDice.faces[userRollResultRaw % this.userDice.faces.length];
        const finalComputerRoll = this.computerDice.faces[computerRollResultRaw % this.computerDice.faces.length];

        console.log(`\nYour roll result is ${finalUserRoll}.`); // Changed from 'Your roll is' to 'Your roll result is' for exact match
        console.log(`Computer's roll result is ${finalComputerRoll}.`); // Added 'result' for exact match

        if (finalUserRoll > finalComputerRoll) {
            console.log(`You win (${finalUserRoll} > ${finalComputerRoll})!`); // Modified for the desired output
        } else if (finalComputerRoll > finalUserRoll) {
            console.log(`Computer wins (${finalComputerRoll} > ${finalUserRoll})!`); // Modified for the desired output
        } else {
            console.log("It's a draw!");
        }

        console.log("\nGame Over!");
    }

    displayProbabilities() {
        const probabilities = ProbabilityCalculator.calculateWinProbabilities(this.diceList);
        ConsoleTable.generateProbabilityTable(this.diceList, probabilities);
    }
}

module.exports = DiceGame;