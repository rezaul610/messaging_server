const express = require("express");
const http = require("http");
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const authController = require('./controllers/auth.controller');
const messageController = require("./controllers/message.controller");
const groupC = require('./controllers/group.controller');
const userC = require('./controllers/user.controller');

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
        const query = socket.handshake.query;
        onlineUsers.push({ ...user, socketId: socket.id });
        const exist = authController.getAuthUserInfoBySocketId(query.socketid);
        if (exist) {
            authController.updateAuthByUserId({ socketid: query.socketid, userid: query.userid, connect: 1 });
        } else {
            authController.saveAuth({ socketid: query.socketid, userid: query.userid });
        }
        io.emit('discoverUsers', onlineUsers);
        messageController.sendBroadcastMessage(io, onlineUsers);
        console.log({ ...user, socketId: socket.id });
    });

    socket.on("sendMessage", async (data) => {
        const message = data.message;
        if (data.gid != '') {
            const group = await groupC.getGroupBygId(data.group_id);
            const gUsers = await userC.getUserById(group.id);
            for (const user of gUsers ?? []) {
                const online = onlineUsers.find(u => u.userid === user.receiverbpno);
                if (online) {
                    const me = online.userid === user.bpno;
                    if (!me) {
                        clients[online.socketId].emit("receiveMessage", data);
                        io.to(online.socketId).emit('receiveNotification', data);
                    }
                } else {
                    const gmessage = await messageController.getMessageByGroupData(data);
                    if (gmessage.length === 0) {
                        messageController.saveMessage(data, user.dataValues.bpno);
                    }
                }
            }
        } else if (data.token === 'N/A') {
            messageController.saveMessage(data, data.receiverbpno);
        } else {
            const online = onlineUsers.find(u => u.socketid === token);
            if (clients[online.socketId]) {
                clients[online.socketId].emit("receiveMessage", data);
                io.to(online.socketId).emit('receiveNotification', data);
                console.log(`📨 Sent to ${online.socketId}: ${message}`);
            } else {
                console.log(`⚠️ Target device not connected: ${online.socketId}`);
            }
        }
    });

    socket.on('sendImage', ({ senderId, receiverId, image }) => {
        console.log('Image received from:', socket.id);
        io.to(receiverId).emit('receiveImage', {
            senderId,
            image,
        });
        io.to(receiverId).emit('receiveNotification', image);
    });

    socket.on('sendGroupInfo', async ({ groupInfo, userIds }) => {
        let group = await groupC.getGroupByName(groupInfo.name);
        if (group) {
            await groupC.updateGroupByName(groupInfo);
        } else {
            await groupC.saveGroup(groupInfo);
            group = await groupC.getGroupByName(groupInfo.name);
        }
        for (const ids of userIds) {
            let exist = onlineUsers.find(user => user.userid == ids.id);
            if (exist) {
                io.to(exist.socketId).emit('groupInfo', {
                    groupInfo,
                    userIds,
                });
                io.to(exist.socketId).emit('receiveNotification', { message: 'New group created named ' + groupInfo.name });
            }
            await userC.saveUser(ids);
        }
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
            const index = onlineUsers.findIndex(u => u.socketId === token);
            const userinfo = onlineUsers[index];
            onlineUsers.splice(index, 1);
            authController.updateAuthByUserId({ socketid: userinfo.socketid, userid: userinfo.userid, connect: 0 });
        }
        io.emit('discoverUsers', onlineUsers);
    });
});

app.get("/users", async (req, res) => {
    res.json(Array.from(onlineUsers));
});

server.listen(PORT, () => console.log(`Server running on ${PORT}`));
