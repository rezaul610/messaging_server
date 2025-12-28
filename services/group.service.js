const Group = require('../models/group.model');

const saveGroup = async (data) => {
    const { id, g_id, name } = data;
    try {
        const group = await Group.create({
            id: id,
            gid: g_id,
            name: name,
        });
        console.log(`Group saved: ${JSON.stringify(group)}`);
        return group;
    } catch (error) {
        console.error("Error saving group:", error);
        throw error;
    }
};

const updateGroupById = async (data) => {
    const { id, name } = data;
    try {
        const group = await Group.update({
            id: id,
            name: name,
        }, {
            where: { id: id },
        });
        console.log(`Group updated: ${JSON.stringify(group)}`);
        return group;
    } catch (error) {
        console.error(`Error updated message:`, error);
        throw error;
    }
};

const getGroupById = async (id) => {
    try {
        const group = await Group.findOne({ where: { id: id } });
        return group;
    } catch (error) {
        console.error("Error retrieving group:", error);
        throw error;
    }
};

const getGroupBygId = async (gid) => {
    try {
        const group = await Group.findOne({ where: { gid: gid } });
        return group;
    } catch (error) {
        console.error("Error retrieving group:", error);
        throw error;
    }
};

const updateGroupByName = async (data) => {
    const { id, gid, name } = data;
    try {
        const group = await Group.update({
            id: id,
            gid: gid,
            name: name,
        }, {
            where: { name: name, gid: gid },
        });
        console.log(`Group updated: ${JSON.stringify(group)}`);
        return group;
    } catch (error) {
        console.error(`Error updated message:`, error);
        throw error;
    }
};

const getGroupByName = async (name) => {
    try {
        const group = await Group.findOne({ where: { name: name } });
        return group;
    } catch (error) {
        console.error("Error retrieving group:", error);
        throw error;
    }
};

const getUnsentGroupList = async () => {
    try {
        const groups = await Group.findAll();
        return groups;
    } catch (error) {
        console.error("Error retrieving unsent groups:", error);
        throw error;
    }
};

const deleteGroup = async (id) => {
    try {
        await Group.destroy({ where: { id: id } });
        console.log(`Group with id ${id} deleted successfully.`);
    } catch (error) {
        console.error("Error deleting group:", error);
        throw error;
    }
};

module.exports = {
    saveGroup,
    updateGroupById,
    updateGroupByName,
    getGroupById,
    getGroupBygId,
    getGroupByName,
    getUnsentGroupList,
    deleteGroup,
};