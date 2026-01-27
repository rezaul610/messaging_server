const messageService = require("../services/message.service");
const uploads = require('../middleware/uploads');
const notify = require('../middleware/notify');

const saveMessage = async (data, bpno) => {
    if (data.type !== 'text') {
        const fileData = uploads.saveBase64Image(data.message);
        return await messageService.saveMessage(data, bpno, fileData.path);
    }
    return await messageService.saveMessage(data, bpno, '');
};

const getAllMessages = async () => {
    return await messageService.getAllMessages();
};

const getMessageByGroupData = async (data) => {
    return await messageService.getMessageByGroupData(data);
};

const deleteMessage = async (id) => {
    return await messageService.deleteMessage(id);
};

const sendBroadcastMessage = async (io, onlines) => {
    const messages = await messageService.getAllMessages();
    if (messages.length > 0 && onlines.length > 0) {
        for (const msg of messages) {
            for (const user of onlines) {
                if (user.userid === msg.receiverbpno) {
                    let message = msg.message;
                    if (msg.messageType !== 'text') {
                        message = uploads.getImageAsBase64(msg.message);
                    }
                    io.to(user.socketId).emit("receiveMessage", {
                        message: message,
                        token: user.socketid,
                        bpNo: msg.bpNo,
                        receiverbpno: msg.receiverbpno,
                        groupid: msg.groupid,
                        isMe: false,
                        type: msg.messageType,
                        dateTime: msg.dateTime,
                    });
                    await notify.sendNotification(notify.pushtoken, `Dart Chat: ${msg.bpNo}`, msg.message);
                    // io.to(user.socketId).emit('receiveNotification', { 'token': user.socketId, 'bp_no': msg.bpNo, 'message': msg.message });
                    await messageService.deleteMessage(msg.id);
                }
            }
        }
    }
}

module.exports = {
    saveMessage,
    getAllMessages,
    getMessageByGroupData,
    sendBroadcastMessage,
    deleteMessage,
};