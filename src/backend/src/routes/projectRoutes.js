const express = require("express");
const router = express.Router();

const {getProjects} = require("../controllers/projectController");
const {getProjectById} = require("../controllers/projectController");
const {getProjectByName} = require("../controllers/projectController");
const { createProject } = require("../controllers/projectController");
const { deleteProject } = require("../controllers/projectController");
const { editProject } = require("../controllers/projectController");

router.get("/", getProjects);
router.post("/", createProject);
router.put("/:id", editProject);
router.get("/search", getProjectByName);
router.get("/:id", getProjectById);
router.delete("/:id", deleteProject);



module.exports = router;