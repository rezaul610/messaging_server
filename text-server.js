const { createServer } = require("http");
const { Server } = require("socket.io");
const { createClient } = require("redis");
const { createAdapter } = require("@socket.io/redis-adapter");

const httpServer = createServer();
const io = new Server(httpServer, { cors: { origin: "*" } });

const pubClient = createClient({ url: "redis://127.0.0.1:6379" });
const subClient = pubClient.duplicate();
io.adapter(createAdapter(pubClient, subClient));

const ONLINE_USERS_KEY = "online_users";

io.on("connection", (socket) => {
    console.log("Text Server connected:", socket.id);

    socket.on("send_text", async ({ toUserId, message }) => {
        const socketId = await pubClient.hget(ONLINE_USERS_KEY, toUserId);
        if (socketId) {
            io.to(socketId).emit("receive_text", { message });
        }
    });
});

httpServer.listen(3001, () => console.log("Text server running on 3001"));
