const { Router } = require('express');
const AuthController = require('../controllers/AuthController');
const validate = require('../middlewares/validationMiddleware');
const { registerSchema, loginSchema } = require('../validationSchemas/AuthSchema');
const authMiddleware = require('../middlewares/AuthMiddleware');

module.exports = (registerUserUseCase, loginUserUseCase, redisBlacklistRepo, jwtProvider) => {
    const router = Router();
    const authController = new AuthController(registerUserUseCase, loginUserUseCase, redisBlacklistRepo);

    router.post('/register', validate(registerSchema), authController.register.bind(authController));
    router.post('/login', validate(loginSchema), authController.login.bind(authController));
    router.post('/logout', authMiddleware(jwtProvider, redisBlacklistRepo), authController.logout.bind(authController));

    return router;
};
