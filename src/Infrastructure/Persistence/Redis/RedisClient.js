const { createClient } = require('redis');
const config = require('src/config');

const redisClient = createClient({
    url: config.redis.url,
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

async function connectRedis() {
    if (!redisClient.isReady) {
        await redisClient.connect();
        console.log('Connected to Redis');
    }
}

module.exports = { redisClient, connectRedis };