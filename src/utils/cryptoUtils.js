// src/utils/cryptoUtils.js
const crypto = require('crypto');

class CryptoUtils {
    static generateSecureRandomKey(lengthBytes = 32) { // 256 bits = 32 bytes
        return crypto.randomBytes(lengthBytes).toString('hex');
    }

    static generateRandomNumber(min, max) {
        // Generate a cryptographically strong random number in the range [min, max]
        // This is a simplified approach. For true uniformity with large ranges,
        // you'd typically need to handle modulo bias.
        const range = max - min + 1;
        const numBytes = Math.ceil(Math.log2(range) / 8);
        let randomNumber;
        do {
            const randomBytes = crypto.randomBytes(numBytes);
            randomNumber = parseInt(randomBytes.toString('hex'), 16) % range;
        } while (randomNumber > range - 1); // Simple bias mitigation for small ranges
        return randomNumber + min;
    }

    static calculateHMAC(key, message) {
        const hmac = crypto.createHmac('sha256', key);
        hmac.update(message);
        return hmac.digest('hex');
    }
}

module.exports = CryptoUtils;