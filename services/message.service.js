const Message = require("../models/message.model");

const saveMessage = async (data, bpno, filePath) => {
    try {
        const newMessage = await Message.create({
            bpno: data.bp_no,
            receiverbpno: bpno,
            message: filePath,
            groupid: data.group_id,
            messagetype: data.type,
            datetime: data.date_time,
            sentstatus: 0,
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

const getMessageByBpNo = async (bpno) => {
    try {
        const message = await Message.findAll({ where: { bpno: bpno } });
        return message;
    } catch (error) {
        console.error("Error retrieving message by ID:", error);
        throw error;
    }
};

const getMessageByGroupData = async (gdata) => {
    try {
        const message = await Message.findAll({ where: { groupid: gdata.group_id, bpno: gdata.bp_no, message: gdata.message } });
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
    getMessageByGroupData,
    deleteMessage,
};