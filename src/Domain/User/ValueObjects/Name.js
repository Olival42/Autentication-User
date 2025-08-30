class Name {
    constructor(value) {
        if (!value || typeof value !== "string") {
            throw new Error("Name must be a non-empty string");
        }
        this.value = value.trim();
    }
}

module.exports = Name;