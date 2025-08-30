class UserAlreadyExistsException extends Error {
    constructor(message = "User already exists with these credentials") {
        super(message);
        this.name = "UserAlreadyExistsException"
        this.statusCode = 400;
    }
}

module.exports = UserAlreadyExistsException;