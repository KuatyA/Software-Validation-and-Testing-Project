const express = require("express");
const router = express.Router();

const {getProjects} = require("../controllers/projectController");
const {getProjectById} = require("../controllers/projectController");
const {getProjectByName} = require("../controllers/projectController");
const { createProject } = require("../controllers/projectController");
const { deleteProject } = require("../controllers/projectController");
const { editProject } = require("../controllers/projectController");

//GET
router.get("/", getProjects);
router.get("/:id", getProjectById);
router.get("/search", getProjectByName);

//POST
router.post("/", createProject);

//PUT
router.put("/:id", editProject);

//DELETE
router.delete("/:id", deleteProject);



module.exports = router;