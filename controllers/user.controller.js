const userService = require('../services/user.service');

const saveUser = async (data) => {
    return await userService.saveUser(data);
};

const updateUserById = async (data) => {
    return await userService.updateUserById(data);
};

const updateUserStatusById = async (data) => {
    return await userService.updateUserStatusById(data);
}

const getUserById = async (id) => {
    return await userService.getUserById(id);
};

const getUserListByGroupId = async (groupid) => {
    return await userService.getUserListByGroupId(groupid);
};

const deleteUser = async (id) => {
    return await userService.deleteUser(id);
};

module.exports = {
    saveUser,
    updateUserById,
    getUserById,
    getUserListByGroupId,
    updateUserStatusById,
    deleteUser,
}