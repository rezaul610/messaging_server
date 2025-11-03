const { createServer } = require("http");
const { Server } = require("socket.io");
const { createClient } = require("redis");
const { createAdapter } = require("@socket.io/redis-adapter");

const httpServer = createServer();
const io = new Server(httpServer, { cors: { origin: "*" } });

const pubClient = createClient({ url: "redis://127.0.0.1:6379" });;
const subClient = pubClient.duplicate();
io.adapter(createAdapter(pubClient, subClient));

const ONLINE_USERS_KEY = "online_users";

io.on("connection", (socket) => {
    console.log("Media Server connected:", socket.id);

    socket.on("send_media", async ({ toUserId, mediaUrl }) => {
        const socketId = await pubClient.hget(ONLINE_USERS_KEY, toUserId);
        if (socketId) {
            io.to(socketId).emit("receive_media", { mediaUrl });
        }
    });
});

httpServer.listen(3002, () => console.log("Media server running on 3002"));
