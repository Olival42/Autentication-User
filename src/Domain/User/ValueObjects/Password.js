const bcrypt = require('bcryptjs');

class Password {
    constructor(value, isHashed = false) {
        if (!value) {
            throw new Error("Password cannot be empty.");
        }
        if (!isHashed && value.length < 10) {
            throw new Error("Password must be at least 10 characters long.");
        }
        this.hashedPassword = isHashed ? value : this.hash(value); // Chama o método hash
    }

    hash(plainPassword) {
        return bcrypt.hashSync(plainPassword, 10);
    }

    async compare(plainPassword) { // Corrigido
        return await bcrypt.compare(plainPassword, this.hashedPassword);
    }

    equals(otherPassword) {
        return otherPassword instanceof Password && this.hashedPassword === otherPassword.hashedPassword;
    }
}

module.exports = Password;
