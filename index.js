const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);

const PORT = 3000;

let clients = [];
let onlineUsers = [];

const io = require("socket.io")(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
    const token = socket.id;
    if (token) {
        clients[token] = socket;
        console.log(`✅ Device connected: ${token}`);
    }
    console.log(`Connected clients: ${Object.keys(clients).length}`);

    socket.on('join', (user) => {
        console.log(`User joined: ${JSON.stringify(user)}`);
        onlineUsers.push({ ...user, socketId: socket.id });
        io.emit('discoverUsers', onlineUsers);
    });

    socket.on('joinGroups', (groupIds) => {
        groupIds.forEach(id => socket.join(id));
        console.log(`User joined groups: ${groupIds}`);
    });

    socket.on("sendMessage", (data) => {
        console.log("Send message:", data);
        const targetToken = data.token;
        const message = data.message;
        if (clients[targetToken]) {
            clients[targetToken].emit("receiveMessage", { message });
            console.log(`📨 Sent to ${targetToken}: ${message}`);
        } else {
            console.log(`⚠️ Target device not connected: ${targetToken}`);
        }
    });

    socket.on('sendImage', ({ senderId, receiverId, image }) => {
        console.log('Image received from:', socket.id);
        // socket.broadcast.emit('receiveImage', data);
        io.to(receiverId).emit('receiveImage', {
            senderId,
            image,
        });
    });

    socket.on("sendNotification", (data) => {
        console.log("Send notification:", data);

        const targetToken = data.token;
        const message = data.message;
        if (clients[targetToken]) {
            clients[targetToken].emit("receiveNotification", { message });
            console.log(`📨 Sent to ${targetToken}: ${message}`);
        } else {
            console.log(`⚠️ Target device not connected: ${targetToken}`);
        }
    });

    socket.on('getDiscoverUsers', () => {
        io.emit('discoverUsers', onlineUsers);
    });

    socket.on("disconnect", () => {
        console.log(`❌ Device disconnected: ${token}`);
        delete clients[token];
        if (onlineUsers.length > 0) {
            const index = onlineUsers.findIndex(u => u.id === token);
            onlineUsers.splice(index, 1);
        }
        io.emit('discoverUsers', onlineUsers);
    });
});

server.listen(PORT, () => console.log(`Server running on ${PORT}`));
