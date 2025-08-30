// AuthMiddleware.js
const jwt = require('jsonwebtoken');
const config = require('src/config');

module.exports = (jwtProvider, tokenBlackListRepository) => {
    return async (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        if (await tokenBlackListRepository.exists(token)) {
            return res.status(403).json({ message: 'Token revoked' });
        }

        try {
            const decoded = jwtProvider.verify(token);
            req.user = decoded;
            next();
        } catch (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
    };
};
