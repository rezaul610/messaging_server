const Auth = require('../models/auth.model');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const secret = process.env.JWT_SECRET || "secretkey";

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

function generateToken(user) {
    return jwt.sign({ id: user.id, username: user.username }, secret, { expiresIn: "7d" });
}

async function verifyToken(token) {
    return jwt.verify(token, secret);
}

async function hashPassword(password) {
    return bcrypt.hash(password, 10);
}

async function comparePassword(password, hash) {
    return bcrypt.compare(password, hash);
}

module.exports = { generateToken, verifyToken, hashPassword, comparePassword };

module.exports = {
    saveAuth,
    updateAuthByUserId,
    getAuthUserInfoByUserId,
    getAuthUserInfoBySocketId,
    updateAuthBySocketId,
    deleteAuth,
};