const RegisterUserInput = require('src/Application/DTOs/RegisterUserInput');
const LoginUserInput = require('src/Application/DTOs/LoginUserInput');
const jwt = require('jsonwebtoken');

class AuthController {
    constructor(registerUserUseCase, loginUserUseCase, tokenBlacklistRepo) {
        this.registerUserUseCase = registerUserUseCase;
        this.loginUserUseCase = loginUserUseCase;
        this.tokenBlacklistRepo = tokenBlacklistRepo;
    }

    async register(req, res, next) {
        try {
            const { name, email, password } = req.body;

            const input = new RegisterUserInput(name, email, password);

            const output = await this.registerUserUseCase.execute(input);

            if (output.status === 'error') {
                return res.status(400).json(output);
            }

            return res.status(201).json(output);
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;

            const input = new LoginUserInput(email, password);

            const output = await this.loginUserUseCase.execute(input);

            if (output.status === 'error') {
                return res.status(401).json(output);
            }

            return res.status(200).json(output);
        } catch (error) {
            next(error);
        }
    }

    async logout(req, res, next) {
        try {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];

            if (!token) {
                return res.status(400).json({ status: 'error', message: 'No token provided.' });
            }

            let payload;
            try {
                payload = jwt.verify(token, require('src/config').jwt.secret);
            } catch (err) {
                return res.status(400).json({ status: 'error', message: 'Invalid token.' });
            }

            const ttl = payload.exp - Math.floor(Date.now() / 1000);

            if (ttl > 0) {
                await this.tokenBlacklistRepo.add(token, ttl);
            }

            return res.status(200).json({status: "success", message: 'Logout realizado com sucesso.' });
        } catch (error) {
            next(error);
        }
    }

}

module.exports = AuthController;