// index.js
const ArgParser = require('./src/parsers/ArgParser');
const DiceGame = require('./src/services/DiceGame');

async function main() {
    try {
        const diceConfigs = ArgParser.parse(); // Get dice configurations from CLI

        // Instantiate the game
        const game = new DiceGame(diceConfigs);

        // Display probabilities table as per requirement
        game.displayProbabilities();

        // Run the game
        await game.run();

    } catch (error) {
        console.error(`An unexpected error occurred: ${error.message}`);
        process.exit(1);
    }
}

main();