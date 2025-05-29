// src/services/FairnessProtocol.js
const CryptoUtils = require('../utils/cryptoUtils');
const readline = require('readline-sync'); // For user input

class FairnessProtocol {
    static async generateFairNumber(min, max, purpose) {
        console.log(`\n--- Provably Fair Number Generation for ${purpose} ---`);

        // Step 1: Computer generates a random number (server seed)
        const computerNumber = CryptoUtils.generateRandomNumber(min, max);

        // Step 2: Computer generates a secret key (client seed)
        const secretKey = CryptoUtils.generateSecureRandomKey();

        // Step 3: Computer calculates and displays HMAC(key, computerNumber)
        const hmacValue = CryptoUtils.calculateHMAC(secretKey, String(computerNumber));
        console.log(`I generated a random value in the range ${min}..${max}.`);
        console.log(`(HMAC=${hmacValue.toUpperCase()}).`);
        console.log("Try to guess my selection (or provide your input for the roll).");

        // Step 4: User selects a number
        let userNumber;
        while (true) {
            try {
                userNumber = parseInt(readline.question(`Your selection: `));
                if (isNaN(userNumber) || userNumber < min || userNumber > max) {
                    throw new Error(`Please enter a number between ${min} and ${max}.`);
                }
                break;
            } catch (e) {
                console.error(e.message);
            }
        }

        // Step 5: Calculate the result (computerNumber + userNumber) % (max - min + 1)
        const modulus = max - min + 1;
        const fairResult = (computerNumber + userNumber) % modulus;

        // Step 6: Show both the computer's number, the secret key, and the fair result
        console.log(`My number is ${computerNumber} (KEY=${secretKey.toUpperCase()}).`);
        console.log(`The fair number generation result is ${computerNumber} + ${userNumber} = ${fairResult} (mod ${modulus}).`);

        // User can now calculate HMAC(secretKey, String(computerNumber)) to verify
        // This part is for user's manual verification, no explicit code for it.

        return fairResult;
    }
}

module.exports = FairnessProtocol;