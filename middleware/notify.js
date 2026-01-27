const admin = require("firebase-admin");
const serviceAccount = require("../config/firebase.serviceAccount.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const messaging = admin.messaging();

const sendNotification = async (token, title, body, data = {}) => {
    const message = {
        notification: {
            title: title,
            body: body,
        },
        data: data,
        token: token,
    };
    try {
        const response = await messaging.send(message);
        console.log("Successfully sent message:", response);
    } catch (error) {
        console.error("Error sending message:", error);
    }
};

async function sendMulticast(tokens, title, body, data = {}) {
    const message = {
        tokens,
        notification: {
            title: title,
            body: body,
        },
        data: data,
    };

    return messaging.sendEachForMulticast(message);
}


module.exports = {
    sendNotification,
    sendMulticast,
};