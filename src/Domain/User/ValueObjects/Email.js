class Email {
    constructor(value) {
        if (!this.isValid(value)) {
            throw new Error("Inavlid email format");
        }
        this.value = value;
    }

    isValid(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    equals(otherEmail) {
        return otherEmail instanceof Email && this.value === otherEmail.value;
    }
}

module.exports = Email;