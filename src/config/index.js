require("dotenv").config();

module.exports = {
  server: { port: process.env.PORT },
  db: {
    dialect: process.env.DB_DIALECT,
    url: process.env.DATABASE_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  redis: {
    url: process.env.REDIS_URL,
  }
};
