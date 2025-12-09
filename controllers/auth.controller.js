const authService = require('../services/auth.service')

const saveAuth = async (data) => {
    return await authService.saveAuth(data);
};

const updateAuthByUserId = async (data) => {
    return await authService.updateAuthByUserId(data);
};

const updateAuthBySocketId = async (data) => {
    return await authService.updateAuthBySocketId(data);
};

const getAuthUserInfoByUserId = async (userid) => {
    return await authService.getAuthUserInfoByUserId(userid);
};

const getAuthUserInfoBySocketId = async (socketid) => {
    return await authService.getAuthUserInfoBySocketId(socketid);
};

const deleteAuth = async (socketid) => {
    return await authService.deleteAuth(socketid);
};

module.exports = {
    saveAuth,
    updateAuthByUserId,
    updateAuthBySocketId,
    getAuthUserInfoByUserId,
    getAuthUserInfoBySocketId,
    deleteAuth,
}