const express = require("express");
const router = express.Router();

const {getStudents} = require("../controllers/studentController");
const {getStudentById} = require("../controllers/studentController");
const {getStudentByName} = require("../controllers/studentController");
const { createStudent } = require("../controllers/studentController");
const { deleteStudent } = require("../controllers/studentController");
const { editStudent } = require("../controllers/studentController");

router.get("/", getStudents);
router.post("/", createStudent);
router.put("/:id", editStudent);
router.get("/search", getStudentByName);
router.get("/:id", getStudentById);
router.delete("/:id", deleteStudent);



module.exports = router;