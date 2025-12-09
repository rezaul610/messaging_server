const groupService = require('../services/group.service')

const saveGroup = async (data) => {
    return await groupService.saveGroup(data);
};

const updateGroupById = async (data) => {
    return await groupService.updateGroupById(data);
};

const getGroupById = async (id) => {
    return await groupService.getGroupById(id);
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

module.exports = {
    saveGroup,
    updateGroupById,
    updateGroupByName,
    getGroupById,
    getGroupByName,
    deteteGroup,
}