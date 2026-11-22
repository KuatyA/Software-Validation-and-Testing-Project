const pool = require("../db");

const { getAllGroups,
        getAGroupById,
        getAGroupByName,
        getAdvisorOfAGroup,
        getProjectsOfAGroup,
        getStudentsOfAGroup,
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
const getGroupStudents = async(req, res) => {
    const group = await getStudentsOfAGroup(req.params.id);
    res.json(group);
}
const getGroupProject = async(req, res) => {
    const group = await getProjectsOfAGroup(req.params.id);
    res.json(group);
}
const getGroupAdvisor = async(req, res) => {
    const group = await getAdvisorOfAGroup(req.params.id);
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
    getGroupAdvisor,
    getGroupStudents,
    getGroupProject,
    createGroup,
    editGroup,
    deleteGroup
}