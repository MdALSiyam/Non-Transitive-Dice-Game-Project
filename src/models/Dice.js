// src/models/Dice.js
class Dice {
    constructor(faces) {
        if (!Array.isArray(faces) || faces.length < 6 || !faces.every(face => typeof face === 'number' && Number.isInteger(face))) {
            throw new Error("Dice must have at least 6 integer faces.");
        }
        this.faces = faces;
    }

    roll() {
        const randomIndex = Math.floor(Math.random() * this.faces.length);
        return this.faces[randomIndex];
    }

    toString() {
        return `[${this.faces.join(',')}]`;
    }
}

module.exports = Dice;