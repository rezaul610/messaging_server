const messageService = require("../services/message.service");

const saveMessage = async (data, bpno) => {
    return await messageService.saveMessage(data, bpno);
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
                if (user.userid === msg.bpNo) {
                    io.to(user.socketId).emit("receiveMessage", {
                        message: msg.message,
                        token: user.socketid,
                        bpNo: msg.bpNo,
                        isMe: false,
                        type: msg.messageType,
                        dateTime: msg.dateTime,
                    });
                    io.to(user.socketId).emit('receiveNotification', { 'token': user.socketId, 'bp_no': msg.bpNo, 'message': msg.message });
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