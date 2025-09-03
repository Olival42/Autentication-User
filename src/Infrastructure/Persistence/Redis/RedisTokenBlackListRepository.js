const jwt = require("jsonwebtoken");

class RedisTokenBlacklistRepository {
  constructor(redisClient) {
    this.redisClient = redisClient;
  }

  async add(token) {
    try {
      const payload = jwt.decode(token);
      if (!payload || !payload.exp) return;

      const ttl = payload.exp - Math.floor(Date.now() / 1000);
      if (ttl > 0) {
        await this.redisClient.setEx(token, ttl, "revoked");
      }
    } catch (err) {
      console.error("Failed to add token to blacklist", err);
    }
  }

  async exists(token) {
    const exists = await this.redisClient.exists(token);
    return exists === 1;
  }
}

module.exports = RedisTokenBlacklistRepository;
