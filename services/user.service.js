const User = require('../models/user.model');

const saveUser = async (data) => {
    const { groupid, name, bpNo, phone } = data;
    try {
        const user = await User.create({
            name: name,
            groupid: groupid,
            bpNo: bpNo,
            phone: phone,
        });
        console.log(`User saved: ${JSON.stringify(user)}`);
        return user;
    } catch (error) {
        console.error("Error saving user:", error);
        throw error;
    }
};

const updateUserById = async (data) => {
    const { id, groupid, name, bpNo, phone } = data;
    try {
        const user = await User.create({
            name: name,
            groupid: groupid,
            bpNo: bpNo,
            phone: phone,
        }, {
            id: id
        });
        console.log(`User updated: ${JSON.stringify(user)}`);
        return user;
    } catch (error) {
        console.error(`Error updated user:`, error);
        throw error;
    }
};

const getUserById = async (id) => {
    try {
        const user = await User.findOne({ where: { id } });
        return user;
    } catch (error) {
        console.error("Error retrieving user:", error);
        throw error;
    }
};

const getUserListByGroupId = async (groupid) => {
    try {
        const users = await User.findOne({ where: { groupid } });
        return users;
    } catch (error) {
        console.error("Error retrieving user:", error);
        throw error;
    }
};

const deleteUser = async (id) => {
    try {
        await User.destroy({ where: { id: id } });
        console.log(`User with id ${id} deleted successfully.`);
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};

module.exports = {
    saveUser,
    updateUserById,
    getUserById,
    getUserListByGroupId,
    deleteUser,
};