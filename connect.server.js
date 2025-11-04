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
}

main();

io.adapter(createAdapter(pubClient, subClient));

io.on("connection", async (socket) => {
    const userId = socket.handshake.query.userid;
    console.log('✅ User Connected: ', socket.id, userId);

    socket.on("join", async (user) => {
        const useres = await redis.hVals("online_users");
        let userlist = [];
        for (const usr of useres) {
            userlist.push(JSON.parse(usr));
        }
        const exists = userlist.find(userl => userl.userid === user.userid);
        if (exists) {
            await redis.hDel("online_users", exists.id);
        }
        await redis.hSet("online_users", socket.id, JSON.stringify(user));
        const users = await redis.hVals("online_users");
        io.emit("discoverUsers", users.map((u) => JSON.parse(u)));
    });

    socket.on("discover", async () => {
        const users = await redis.hVals("online_users");
        const parsedusers = users.map((u) => JSON.parse(u));
        socket.emit("discoverUsers", parsedusers);
    });

    socket.on("disconnect", async () => {
        const useres = await redis.hVals("online_users");
        let userlist = [];
        for (const usr of useres) {
            userlist.push(JSON.parse(usr));
        }
        const exists = userlist.find(userl => userl.id === socket.id);
        if (exists) {
            await redis.hDel("online_users", exists.id);
        }
        const users = await redis.hVals("online_users");
        io.emit("discoverUsers", users.map((u) => JSON.parse(u)));
        console.log('❌ User Disconnected: ', exists.id);
    });

    socket.on("sendMessage", async (data) => {
        console.log(data);
        const socketId = await pubClient.hGet("online_users", data.id);
        if (socketId) {
            io.to(socketId).emit("receiveMessage", { message });
        }
    });
});

app.get("/remove", async (req, res) => {
    const users = await redis.hKeys("online_users");
    if (users.length > 0) {
        redis.hDel('online_users', users);
        res.send({ message: 'User deleted successfully' });
    }
    res.send({ message: 'User not found' });
});

app.get("/users", async (req, res) => {
    const users = await redis.hVals("online_users");
    res.json(Array.from(users.map((u) => JSON.parse(u))));
});

server.listen(3000, () => console.log("✅ Connection Server on 3000"));
