const express = require("express");
const http = require("http");
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const authController = require('./controllers/auth.controller');
const messageController = require("./controllers/message.controller");
const groupC = require('./controllers/group.controller');
const userC = require('./controllers/user.controller');
const notify = require('./middleware/notify');

let clients = [];
let onlineUsers = [];

const io = require("socket.io")(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
    const token = socket.id;
    const query = socket.handshake.query;
    if (token) {
        clients[token] = socket;
        console.log(`✅ Device connected: ${token}`);
    }
    console.log(`Connected clients: ${Object.keys(clients).length}  ${query.pushtoken}`);

    socket.on('join', async (user) => {
        console.log(`User joined: ${JSON.stringify(user)}`);
        onlineUsers.push({ ...user, socketId: socket.id, pushtoken: query.pushtoken });
        const exist = await authController.getAuthUserInfoBySocketId(query.socketid);

        if (exist !== null && exist !== undefined) {
            console.log("Auth exist check:", exist.dataValues);
            authController.updateAuthByUserId({ socketid: query.socketid, userid: query.userid, connect: 1 });
        } else {
            authController.saveAuth({ socketid: query.socketid, userid: query.userid });
        }
        io.emit('discoverUsers', onlineUsers);
        await groupC.broadcastGroupInfo(io, onlineUsers);
        await messageController.sendBroadcastMessage(io, onlineUsers);
        const onlineTokens = onlineUsers.map(u => u.pushtoken && u.pushtoken !== query.pushtoken);
        await notify.sendMulticast(onlineTokens, `Dart Chat`, `${user.userid} has been joined.`);
        console.log(onlineUsers);
    });

    socket.on("sendMessage", async (data) => {
        const message = data.message;
        if (data.group_id != 'N/A' && data.group_id != null) {
            const group = await groupC.getGroupBygId(data.group_id);
            const gUsers = await userC.getUserById(group.gid);
            for (const user of gUsers ?? []) {
                const online = onlineUsers.find(u => u.userid === user.dataValues.bpno || u.userid === user.dataValues.phone);
                if (online !== null && online !== undefined) {
                    const me = online.userid === data.bp_no || online.userid === data.phone;
                    if (!me) {
                        console.log(`📨 Sending to ${online.socketId}: ${data}`);
                        data.receiver_bp_no = user.dataValues.bpno;
                        messageController.saveMessage(data, data.bp_no);
                        clients[online.socketId].emit("receiveMessage", data);
                        await notify.sendNotification(online.pushtoken, `Dart Chat: ${data.bpNo}`, data.message, data);
                        // io.to(online.socketId).emit('receiveNotification', data);
                    }
                } else {
                    const gmessage = await messageController.getMessageByGroupData(data);
                    if (gmessage.length === 0) {
                        messageController.saveMessage(data, user.dataValues.bpno);
                    }
                }
            }
        } else if (data.role_id != null && data.role_id != undefined) {
            const online = onlineUsers.find(u => u.userid === data.receiver_bp_no || u.userid === data.phone);
            if (online !== null && online !== undefined) {
                clients[online.socketId].emit("receiveMessage", data);
                // io.to(online.socketId).emit('receiveNotification', data);
                await notify.sendNotification(online.pushtoken, `Dart Chat: ${data.bpNo}`, data.message, data);
                console.log(`📨 Sent to ${online.socketId}: ${data.message}`);
            } else {
                messageController.saveMessage(data, data.receiver_bp_no);
            }
        } else {
            if (data.token === 'N/A') {
                messageController.saveMessage(data, data.receiver_bp_no);
            } else {
                const online = onlineUsers.find(u => u.socketid === data.token);
                const onTokens = online.map(u => u.pushtoken);
                if (clients[online.socketId]) {
                    clients[online.socketId].emit("receiveMessage", data);
                    await notify.sendMulticast(onTokens, `Dart Chat: ${data.bpNo}`, data.message, data);
                    console.log(`📨 Sent to ${online.socketId}: ${data.message}`);
                } else {
                    console.log(`⚠️ Target device not connected: ${online.socketId}`);
                }
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
            await userC.saveUser(ids);
            let exist = onlineUsers.find(user => user.userid == ids.bpno);
            if (exist !== null && exist !== undefined) {
                io.to(exist.socketId).emit('groupInfo', {
                    groupInfo,
                    userIds,
                });
                await userC.updateUserStatusById({ id: ids.id, sentStatus: 1 });
                await notify.sendNotification(exist.pushtoken, `Dart Chat`, `New group created named ${groupInfo.name}`);
                // io.to(exist.socketId).emit('receiveNotification', { message: 'New group created named ' + groupInfo.name });
            }
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

    socket.on("disconnect", async () => {
        if (onlineUsers.length > 0) {
            const index = onlineUsers.findIndex(u => u.socketId === token);
            const userinfo = onlineUsers[index];
            const onlineTokens = onlineUsers.map(u => u.pushtoken && u.pushtoken !== userinfo.pushtoken);
            await notify.sendMulticast(onlineTokens, `Dart Chat`, `${userinfo.userid} has been left.`);
            onlineUsers.splice(index, 1);
            authController.updateAuthByUserId({ socketid: userinfo.socketid, userid: userinfo.userid, connect: 0 });
        }
        console.log(`❌ Device disconnected: ${token}`);
        delete clients[token];
        io.emit('discoverUsers', onlineUsers);
    });
});

app.get("/users", async (req, res) => {
    res.json(Array.from(onlineUsers));
});

server.listen(process.env.APP_PORT, () => console.log(`Server running on ${process.env.APP_PORT}`));
