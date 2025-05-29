// src/validators/InputValidator.js
class InputValidator {
    static validateDiceConfiguration(diceConfigs) {
        if (!Array.isArray(diceConfigs) || diceConfigs.length === 0) {
            return { isValid: false, message: "No dice configurations provided." };
        }

        for (const config of diceConfigs) {
            const faces = config.split(',').map(Number);
            if (faces.some(isNaN) || faces.length < 6 || !faces.every(face => Number.isInteger(face))) {
                return { isValid: false, message: `Invalid dice configuration: '${config}'. Each dice must have at least 6 comma-separated integers.` };
            }
        }
        return { isValid: true, message: "" };
    }
}

module.exports = InputValidator;