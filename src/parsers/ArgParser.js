// src/parsers/ArgParser.js
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const InputValidator = require('../validators/InputValidator');

class ArgParser {
    static parse() {
        const argv = yargs(hideBin(process.argv))
            .usage('Usage: $0 [dice configurations...]')
            .demandCommand(1, 'You must provide at least one dice configuration.')
            .strict()
            .help('h')
            .alias('h', 'help')
            .alias('v', 'version')
            .argv;

        const diceConfigs = argv._.map(String); // Convert arguments to strings

        const validationResult = InputValidator.validateDiceConfiguration(diceConfigs);
        if (!validationResult.isValid) {
            console.error(`Error: ${validationResult.message}`);
            process.exit(1);
        }

        return diceConfigs;
    }
}

module.exports = ArgParser;