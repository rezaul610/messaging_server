const admin = require("firebase-admin");
const serviceAccount = require("../config/firebase.serviceAccount.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const messaging = admin.messaging();

const sendNotification = async (token, title, body, data = {}) => {
    if (Object.keys(data).length !== 0) {
        data = { ...data, is_read: data.is_read != null ? `${data.is_read}` : 'N/A', message: data.type !== 'text' ? 'Attachment Received' : `${data.message}`, is_me: `${data.is_me}`, group_id: data.group_id != null ? `${data.group_id}` : 'N/A', role_id: data.role_id != null ? `${data.role_id}` : 'N/A', receive_bp_no: data.receive_bp_no != null ? `${data.receive_bp_no}` : 'N/A', token: data.token != null ? `${data.token}` : 'N/A' };
    } else {
        data = { dal: 'true' };
    }
    const message = {
        token: token,
        notification: {
            title: title,
            body: Object.keys(data).length !== 1 ? (data.type == 'text' ? body : 'Attachment Received') : body,
        },
        data: data,
    };
    try {
        const response = await messaging.send(message);
        console.log("Successfully sent message:", response);
    } catch (error) {
        console.error("Error sending message:", error);
    }
};

async function sendMulticast(tokens, title, body, data = {}) {
    for (let i = 0; i < tokens.length; i++) {
        sendNotification(tokens[i], title, body, data);
    }

    return true;
}


module.exports = {
    sendNotification,
    sendMulticast,
};