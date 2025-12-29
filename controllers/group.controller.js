const groupService = require('../services/group.service');
const userService = require('../services/user.service');

const saveGroup = async (data) => {
    return await groupService.saveGroup(data);
};

const updateGroupById = async (data) => {
    return await groupService.updateGroupById(data);
};

const getGroupById = async (id) => {
    return await groupService.getGroupById(id);
};

const getGroupBygId = async (gid) => {
    return await groupService.getGroupBygId(gid);
};

const updateGroupByName = async (data) => {
    return await groupService.updateGroupByName(data);
};

const getGroupByName = async (name) => {
    return await groupService.getGroupByName(name);
};

const deteteGroup = async (id) => {
    return await groupService.deleteGroup(id);
};

const broadcastGroupInfo = async (io, onlineUsers) => {
    const groups = await groupService.getUnsentGroupList();
    if (groups.length > 0 && onlineUsers.length > 0) {
        for (const group of groups) {
            const users = await userService.getUserListByGroupId(group.gid);
            for (const user of users ?? []) {
                const online = onlineUsers.find(u => u.userid === user.receiverbpno);
                if (online) {
                    io.to(online.socketId).emit('groupInfo', {
                        group,
                        users
                    });
                    userService.updateUserStatusById({ id: user.id, sentStatus: 1 });
                }
            }
        }
    }
};

module.exports = {
    saveGroup,
    updateGroupById,
    updateGroupByName,
    getGroupById,
    getGroupBygId,
    getGroupByName,
    broadcastGroupInfo,
    deteteGroup,
}