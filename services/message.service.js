const { Message } = require("../models/message.model");

const saveMessage = async (data) => {
    const { bpNo, msg, msgType, dateTime, sentStatus } = data;
    try {
        const newMessage = await Message.create({
            bpNo: bpNo,
            message: msg,
            messageType: msgType,
            dateTime: dateTime,
            sentStatus: sentStatus
        });
        return newMessage;
    } catch (error) {
        console.error("Error saving message:", error);
        throw error;
    }
};

const getAllMessages = async () => {
    try {
        const messages = await Message.findAll();
        return messages;
    } catch (error) {
        console.error("Error retrieving messages:", error);
        throw error;
    }
};

const getMessageByBpNo = async (bpNo) => {
    try {
        const message = await Message.findOne({ where: { bpNo } });
        return message;
    } catch (error) {
        console.error("Error retrieving message by ID:", error);
        throw error;
    }
};

const deleteMessage = async (id) => {
    try {
        await Message.destroy({ where: { id: id } });
        console.log(`Message with id ${id} deleted successfully.`);
    } catch (error) {
        console.error("Error deleting message:", error);
        throw error;
    }
};

module.exports = {
    saveMessage,
    getAllMessages,
    getMessageByBpNo,
    deleteMessage,
};