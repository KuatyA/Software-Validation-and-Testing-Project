const pool = require("../db");

const { getAllGroups,
        getAGroupById,
        getAGroupByName,
        createAGroup,
        editAGroup,
        deleteAGroup
} = require("../services/groupService");

const getGroups = async(req, res) => {
    const group = await getAllGroups();
    res.json(group);
}
const getGroupById = async(req, res) => {
    const group = await getAGroupById(req.params.id);
    res.json(group);
}
const getGroupByName = async(req, res) => {
    const group  = await getAGroupByName(req.body);
    res.json(group);
}
const createGroup = async(req, res) => {
    const group = await createAGroup(req.body);
    res.json(group);
}
const editGroup = async(req, res) => {
    const group = await editAGroup(req.body, req.params.id);
    res.json(group);
}
const deleteGroup = async(req, res) => {
    const group = await deleteAGroup(req.params.id);
    res.json(group);
}

module.exports = {
    getGroups,
    getGroupById,
    getGroupByName,
    createGroup,
    editGroup,
    deleteGroup
}