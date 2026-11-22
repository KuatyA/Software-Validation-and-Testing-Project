const express = require("express");
const router = express.Router();

const {getTasks} = require("../controllers/taskController");
const {getTaskById} = require("../controllers/taskController");
const {getTaskByName} = require("../controllers/taskController");
const { createTask } = require("../controllers/taskController");
const { deleteTask } = require("../controllers/taskController");
const { editTask } = require("../controllers/taskController");
const { getTaskByGroup, getTaskByProject, getTaskByStudent,
     updateTaskStatus} = require("../controllers/taskController");

//GET
router.get("/", getTasks);
router.get("/:id", getTaskById);
router.get("/search", getTaskByName);
router.get("/", getTaskByGroup);
router.get("/", getTaskByStudent);
router.get("/", getTaskByProject);

//POST
router.post("/", createTask);

//PUT
router.put("/:id", editTask);
router.patch("/:id/status", updateTaskStatus);

//DELETE
router.delete("/:id", deleteTask);



module.exports = router;