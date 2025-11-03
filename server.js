const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { createClient } = require("redis");
const { createAdapter } = require("@socket.io/redis-adapter");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const redis = createClient({ url: "redis://127.0.0.1:6379" });
const pubClient = createClient({ url: "redis://127.0.0.1:6379" });
const subClient = pubClient.duplicate();

async function main() {
    redis.on("error", (err) => {
        console.error("Redis Error:", err);
    });

    await redis.connect();
    await pubClient.connect();
    await subClient.connect();
    console.log("Redis connected!");
}

main();

io.adapter(createAdapter(pubClient, subClient));
io.on("connection", async (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join", async (user) => {
        await redis.hSet("online_users", socket.id, JSON.stringify(user));
        const users = await redis.hVals("online_users");
        io.emit("user_list", users.map((u) => JSON.parse(u)));
    });

    socket.on("discover", async () => {
        const users = await redis.hVals("online_users");
        socket.emit("user_list", users.map((u) => JSON.parse(u)));
    });

    socket.on("disconnect", async () => {
        await redis.hDel("online_users", socket.id);
        const users = await redis.hVals("online_users");
        io.emit("user_list", users.map((u) => JSON.parse(u)));
    });
});

app.get("/users", (req, res) => {
    res.json(Array.from(connectedUsers.values()));
});

server.listen(3000, () => console.log("✅ Connection Server on 3000"));
