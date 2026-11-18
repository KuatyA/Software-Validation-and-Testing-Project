const pool = require("../db");

const { getAllTasks } = require("../services/taskService");
const { getATaskById } = require("../services/taskService");
const { getATaskByName } = require("../services/taskService");
const { createATask } = require("../services/taskService");
const { editATask } = require("../services/taskService");
const { deleteATask } = require("../services/taskService");

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
const deleteTask = async(req, res) => {
    const task = await deleteATask(req.params.id);
    res.json(task);
}
module.exports = {
    getTasks,
    getTaskById,
    getTaskByName,
    createTask,
    editTask,
    deleteTask
};