const { createClient } = require("redis");
const { createAdapter } = require("@socket.io/redis-adapter");

const pubClient = createClient({ url: process.env.REDIS_URL || "redis://127.0.0.1:6379" });
const subClient = pubClient.duplicate();

async function connectRedis(io) {
    await pubClient.connect();
    await subClient.connect();
    io.adapter(createAdapter(pubClient, subClient));
    console.log("Redis connected and adapter attached");
}

module.exports = { pubClient, connectRedis };
