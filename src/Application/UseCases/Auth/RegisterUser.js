const UserOutput = require('../../DTOs/UserOutput');
const Password = require('src/Domain/User/ValueObjects/Password');

class RegisterUser {
    constructor(userRepository, jwtProvider) {
        this.userRepository = userRepository;
        this.jwtProvider = jwtProvider;
    }

    async execute({ name, email, password }) {
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            return { status: 'error', message: 'User already exists' };
        }

        const passwordObj = new Password(password);
        const hashedPassword = passwordObj.hashedPassword;

        const userForDB = {
            name: name,
            email: email,
            password: hashedPassword
        };

        const savedUser = await this.userRepository.save({
            toObject: () => userForDB
        });

        return new UserOutput(savedUser);
    }
}

module.exports = RegisterUser;
