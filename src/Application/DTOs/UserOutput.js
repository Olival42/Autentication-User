class UserOutput {
    constructor(token, user) {
        if (!user) throw new Error("User is undefined");

        this.token = token;
        this.user = {
            id: user.id,
            name: user.name,
            email: user.email,
        };
    }
}

module.exports = UserOutput;