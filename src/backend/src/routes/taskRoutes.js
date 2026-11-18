const express = require("express");
const router = express.Router();

const {getTasks} = require("../controllers/taskController");
const {getTaskById} = require("../controllers/taskController");
const {getTaskByName} = require("../controllers/taskController");
const { createTask } = require("../controllers/taskController");
const { deleteTask } = require("../controllers/taskController");
const { editTask } = require("../controllers/taskController");

router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", editTask);
router.get("/search", getTaskByName);
router.get("/:id", getTaskById);
router.delete("/:id", deleteTask);



module.exports = router;