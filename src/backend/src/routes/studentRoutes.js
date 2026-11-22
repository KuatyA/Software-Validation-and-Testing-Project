const express = require("express");
const router = express.Router();

const {getStudents} = require("../controllers/studentController");
const {getStudentById} = require("../controllers/studentController");
const {getStudentByName} = require("../controllers/studentController");
const { createStudent } = require("../controllers/studentController");
const { deleteStudent } = require("../controllers/studentController");
const { editStudent } = require("../controllers/studentController");

//GET
router.get("/", getStudents);
router.get("/:id", getStudentById);
router.get("/search", getStudentByName);

//POST
router.post("/", createStudent);

//PUT
router.put("/:id", editStudent);

//DELETE
router.delete("/:id", deleteStudent);



module.exports = router;