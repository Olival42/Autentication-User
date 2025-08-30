require('dotenv').config();

module.exports = {
    server: { port: process.env.PORT || 3000 },
    db: {
        dialect: process.env.DB_DIALECT || 'postgres',
        url: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/auth-user'
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'supersecretkey',
        expiresIn: process.env.JWT_EXPIRES_IN || '1h'
    },
    redis: {
        url: process.env.REDIS_URL || 'redis://localhost:6379'
    }
};
