const User = require('../models/user.model');

const saveUser = async (data) => {
    const { id, groupid, name, bpno, phone } = data;
    try {
        const exist = User.findAll({ where: { groupid: groupid, bpno: bpno } });
        if (!exist) {
            const user = await User.create({
                id: id,
                groupid: groupid,
                name: name,
                bpno: bpno,
                phone: phone,
                sentStatus: 0,
            });
            console.log(`User saved: ${JSON.stringify(user)}`);
            return user;
        } else {
            return exist;
        }
    } catch (error) {
        console.error("Error saving user:", error);
        throw error;
    }
};

const updateUserById = async (data) => {
    const { id, groupid, name, bpno, phone } = data;
    try {
        const user = await User.update({
            groupid: groupid,
            name: name,
            bpno: bpno,
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

const updateUserStatusById = async (data) => {
    const { id, sentStatus } = data;
    try {
        const user = await User.update({
            sentStatus: sentStatus,
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
        const user = await User.findAll({ where: { id: id } });
        return user;
    } catch (error) {
        console.error("Error retrieving user:", error);
        throw error;
    }
};

const getUserListByGroupId = async (groupid) => {
    try {
        const users = await User.findAll({ where: { groupid: groupid } });
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
    updateUserStatusById,
    getUserById,
    getUserListByGroupId,
    deleteUser,
};