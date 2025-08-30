const jwt = require('jsonwebtoken');
const config = require('src/config');

class JWTProvider {
    generateToken(payload) {
        return jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.expiresIn });
    }

    verify(token) {
        try {
            return jwt.verify(token, config.jwt.secret);
        } catch (error) {
            return null;
        }
    }
}

module.exports = JWTProvider;