const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
require('module-alias/register');
const fs = require('fs');

const errorHandler = require('./Infrastructure/Express/middlewares/errorHandler');
const SequelizeUserRepository = require('./Infrastructure/Persistence/Sequelize/SequelizeUserRepository');
const JWTProvider = require('./Infrastructure/Providers/JWTProvider');
const authRoutes = require('./Infrastructure/Express/routes/auth.routes');
const { connectRedis } = require('./Infrastructure/Persistence/Redis/RedisClient');
const RedisTokenBlackListRepository = require('./Infrastructure/Persistence/Redis/RedisTokenBlackListRepository');

const RegisterUser = require('./Application/UseCases/Auth/RegisterUser');
const LoginUser = require('./Application/UseCases/Auth/LoginUser');

async function createApp() {
    const app = express();

    app.use(express.json());
    app.use(cors());
    app.use(morgan('dev'));

    const userRepository = new SequelizeUserRepository();
    const jwtProvider = new JWTProvider();

    const redisClient = await connectRedis(); // Agora dentro de async
    const redisBlacklistRepo = new RedisTokenBlackListRepository(redisClient);

    const registerUserUseCase = new RegisterUser(userRepository, jwtProvider);
    const loginUserUseCase = new LoginUser(userRepository, jwtProvider);

    app.use('/auth', authRoutes(registerUserUseCase, loginUserUseCase, redisBlacklistRepo, jwtProvider));

    try {
        const swaggerDocument = yaml.load(fs.readFileSync('./docs/swagger.yml', 'utf8'));
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    } catch (error) {
        console.error('Failed to load swagger.yml file:', error);
    }

    app.use(errorHandler);

    return app;
}

module.exports = createApp;