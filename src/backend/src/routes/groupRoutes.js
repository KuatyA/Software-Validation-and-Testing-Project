const express = require("express");
const router = express.Router();

const {getGroups} = require("../controllers/groupController");
const {getGroupById} = require("../controllers/groupController");
const {getGroupByName} = require("../controllers/groupController");
const { createGroup } = require("../controllers/groupController");
const { deleteGroup } = require("../controllers/groupController");
const { editGroup } = require("../controllers/groupController");
const { getGroupAdvisor, getGroupProject, getGroupStudents
 } = require("../controllers/groupController");

//GET
router.get("/", getGroups);
router.get("/:id", getGroupById);
router.get("/search", getGroupByName);
router.get("/:id/students", getGroupStudents);
router.get("/:id/project", getGroupProject);
router.get("/:id/advisor", getGroupAdvisor);

//POST
router.post("/", createGroup);

//PUT
router.put("/:id", editGroup);

//DELETE
router.delete("/:id", deleteGroup);

module.exports = router;