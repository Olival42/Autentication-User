class InvalidCredentialsException extends Error {
    constructor(message = "Invalid credentials") {
        super(message);
        this.name = "InvalidCredentialsException"
        this.statusCode = 401;
    }
}

module.exports = InvalidCredentialsException;