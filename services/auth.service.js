const Auth = require('../models/auth.model');

const saveAuth = async (data) => {
    const { socketid, userid } = data;
    try {
        const auth = await Auth.create({
            socketid: socketid,
            userid: userid,
            connect: 1,
        });
        console.log(`Auth saved: ${JSON.stringify(auth)}`);
        return auth;
    } catch (error) {
        console.error("Error saving message:", error);
        throw error;
    }
};

const updateAuthByUserId = async (data) => {
    const { socketid, userid, connect } = data;
    try {
        const auth = await Auth.update(data, {
            where: { userid: userid },
        });
        console.log(`Auth updated: ${JSON.stringify(auth)}`);
        return auth;
    } catch (error) {
        console.error(`Error updated auth:`, error);
        throw error;
    }
};

const updateAuthBySocketId = async (data) => {
    const { socketid, userid, connect } = data;
    try {
        const auth = await Auth.update(data, {
            where: {
                userid: userid,
                socketid: socketid,
            },
        });
        console.log(`Auth updated: ${JSON.stringify(auth)}`);
        return auth;
    } catch (error) {
        console.error(`Error updated auth:`, error);
        throw error;
    }
};

const getAuthUserInfoByUserId = async (userid) => {
    try {
        const auth = await Auth.findOne({ where: { userid: userid } });
        return auth;
    } catch (error) {
        console.error("Error retrieving auth:", error);
        throw error;
    }
};

const getAuthUserInfoBySocketId = async (socketid) => {
    console.log("Getting auth info for socketid:", socketid);
    try {
        const auth = await Auth.findOne({ where: { socketid: socketid } });
        return auth;
    } catch (error) {
        console.error("Error retrieving auth:", error);
        throw error;
    }
};

const deleteAuth = async (socketid) => {
    try {
        await Auth.destroy({ where: { socketid: socketid } });
        console.log(`Auth with id ${id} deleted successfully.`);
    } catch (error) {
        console.error("Error deleting auth:", error);
        throw error;
    }
};

module.exports = {
    saveAuth,
    updateAuthByUserId,
    getAuthUserInfoByUserId,
    getAuthUserInfoBySocketId,
    updateAuthBySocketId,
    deleteAuth,
};