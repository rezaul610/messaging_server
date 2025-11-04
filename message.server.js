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
    const userId = socket.handshake.query.userid;
    console.log('✅ Text Server Connected: ', socket.id, userId);

    socket.on("sendMessage", async (data) => {
        console.log(data);
        const socketId = await pubClient.hget(ONLINE_USERS_KEY, data.id);
        if (socketId) {
            io.to(socketId).emit("receiveMessage", { message });
        }
    });
});

httpServer.listen(3001, () => console.log("Text server running on 3001"));
