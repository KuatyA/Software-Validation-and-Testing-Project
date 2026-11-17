const pool = require("../db");

const { getAllProjects,
        getAProjectById,
        getAProjectByName,
        createAProject,
        editAProject,
        deleteAProject
} = require("../services/projectService");

const getProjects = async(req, res) => {
    const project = await getAllProjects();
    res.json(project);
}
const getProjectById = async(req, res) => {
    const project = await getAProjectById(req.params.id);
    res.json(project);
}
const getProjectByName = async(req, res) => {
    const project  = await getAProjectByName(req.body);
    res.json(project);
}
const createProject = async(req, res) => {
    const project = await createAProject(req.body);
    res.json(project);
}
const editProject = async(req, res) => {
    const project = await editAProject(req.body, req.params.id);
    res.json(project);
}
const deleteProject = async(req, res) => {
    const project = await deleteAProject(req.params.id);
    res.json(project);
}

module.exports = {
    getProjects,
    getProjectById,
    getProjectByName,
    createProject,
    editProject,
    deleteProject
}