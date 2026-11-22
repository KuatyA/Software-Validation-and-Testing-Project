const pool = require("../db");

const { getAllTasks } = require("../services/taskService");
const { getATaskById } = require("../services/taskService");
const { getATaskByName } = require("../services/taskService");
const { createATask } = require("../services/taskService");
const { editATask } = require("../services/taskService");
const { deleteATask } = require("../services/taskService");
const { getStudentOfATask, getGroupOfATask, getProjectsOfATask,
    updateATaskStatus
} = require("../services/taskService");

const getTasks = async(req, res) => {
    const tasks = await getAllTasks();
    res.json(tasks);
};
const getTaskById = async(req, res) => {
    const task = await getATaskById(req.params.id);
    res.json(task);
}
const getTaskByName = async(req, res) => {
    const name = req.query.name;
    const surname = req.query.surname;
    const task = await getATaskByName(name, surname);
    res.json(task);
}
const getTaskByStudent = async(req, res) => {
    const id = req.query.student_id;
    const task = await getStudentOfATask(id);
    res.json(task);
}
const getTaskByGroup = async(req, res) => {
    const id = req.query.group_id;
    const task = await getGroupOfATask(id);
    res.json(task);
}
const getTaskByProject = async(req, res) => {
    const id = req.query.project_id;
    const task = await getProjectsOfATask(id);
    res.json(task);
}
const createTask = async(req, res) => {
    //console.log("CALLED");
    //console.log("BODY:", req.body);
    const task = await createATask(req.body);
    res.json(task);
    //status(201).
}
const editTask = async(req, res) => {

    console.log("ID:", req.params.id);
    console.log("BODY:", req.body);

    const task = await editATask(req.body, req.params.id);
    res.json(task);
}
const updateTaskStatus = async(req, res) => {
    const task = await updateATaskStatus(req.body.status, req.params.task_id);
    res.json(task);
}
const deleteTask = async(req, res) => {
    const task = await deleteATask(req.params.id);
    res.json(task);
}
module.exports = {
    getTasks,
    getTaskById,
    getTaskByName,
    getTaskByGroup,
    getTaskByStudent,
    getTaskByProject,
    updateTaskStatus,
    createTask,
    editTask,
    deleteTask
};