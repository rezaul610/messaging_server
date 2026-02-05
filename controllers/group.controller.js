const groupService = require('../services/group.service');
const userService = require('../services/user.service');
const notify = require('../middleware/notify.middleware');

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
    const groupList = await groupService.getUnsentGroupList();
    if (groupList.length > 0 && onlineUsers.length > 0) {
        for (const groupInfo of groupList) {
            const userIds = await userService.getUserListByGroupId(groupInfo.gid);
            for (const user of userIds ?? []) {
                const online = onlineUsers.find(u => u.userid === user.bpno);
                if (online !== null && online !== undefined) {
                    io.to(online.socketId).emit('groupInfo', {
                        groupInfo,
                        userIds
                    });
                    await notify.sendNotification(notify.pushtoken, 'Dart Chat', 'You have a new group added.');
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