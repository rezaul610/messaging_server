const express = require("express");
const http = require("http");
const { send } = require("process");
require('dotenv').config();


const app = express();
const server = http.createServer(app);
const sequelize = require('./config/database');

const messageController = require("./controllers/message.controller");

const PORT = 3000;

let clients = [];
let onlineUsers = [];

/* const start = async () => {
    try {
        await sequelize.authenticate()
            .then(() => console.log('✅ PostgreSQL connected!'))
            .catch(err => console.error('❌ Connection error:', err));
        await sequelize.sync({ alter: true }); // sync models to DB
        app.listen(process.env.API_PORT, () => console.log(`🚀 Server running at http://localhost:${process.env.API_PORT}`));
    } catch (err) {
        console.error('❌ Unable to start server:', err);
    }
};

start();*/

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
        messageController.sendBroadcastMessage(io, onlineUsers);
    });

    socket.on('joinGroups', (groupIds) => {
        groupIds.forEach(id => socket.join(id));
        console.log(`User joined groups: ${groupIds}`);
    });

    socket.on("sendMessage", (data) => {
        const targetToken = data.token;
        const message = data.message;
        if (data.token === 'N/A') {
            messageController.saveMessage({
                bpNo: data.bp_no,
                msg: data.message,
                msgType: data.type,
                dateTime: data.date_time,
                sentStatus: 0,
            });
        } else {
            if (clients[targetToken]) {
                clients[targetToken].emit("receiveMessage", data);
                console.log(`📨 Sent to ${targetToken}: ${message}`);
            } else {
                console.log(`⚠️ Target device not connected: ${targetToken}`);
            }
        }
    });

    socket.on('sendImage', ({ senderId, receiverId, image }) => {
        console.log('Image received from:', socket.id);
        io.to(receiverId).emit('receiveImage', {
            senderId,
            image,
        });
    });

    socket.on("sendNotification", (data) => {
        console.log("Send notification:", data);
        const receiverId = data.token;
        io.to(receiverId).emit('receiveNotification', data);
    });

    socket.on('discover', () => {
        socket.emit('discoverUsers', onlineUsers);
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

app.get("/users", async (req, res) => {
    res.json(Array.from(onlineUsers));
});

server.listen(PORT, () => console.log(`Server running on ${PORT}`));
