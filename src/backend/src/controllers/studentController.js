const pool = require("../db");

const { getAllStudents } = require("../services/studentService");
const { getAStudentById } = require("../services/studentService");
const { getAStudentByName } = require("../services/studentService");
const { createAStudent } = require("../services/studentService");
const { editAStudent } = require("../services/studentService");
const { deleteAStudent } = require("../services/studentService");

const getStudents = async(req, res) => {
    const students = await getAllStudents();
    res.json(students);
};
const getStudentById = async(req, res) => {
    const student = await getAStudentById(req.params.id);
    res.json(student);
}
const getStudentByName = async(req, res) => {
    const name = req.query.name;
    const surname = req.query.surname;
    const student = await getAStudentByName(name, surname);
    res.json(student);
}
const createStudent = async(req, res) => {
    //console.log("CALLED");
    //console.log("BODY:", req.body);
    const student = await createAStudent(req.body);
    res.json(student);
    //status(201).
}
const editStudent = async(req, res) => {

    console.log("ID:", req.params.id);
    console.log("BODY:", req.body);

    const student = await editAStudent(req.body, req.params.id);
    res.json(student);
}
const deleteStudent = async(req, res) => {
    const student = await deleteAStudent(req.params.id);
    res.json(student);
}
module.exports = {
    getStudents,
    getStudentById,
    getStudentByName,
    createStudent,
    editStudent,
    deleteStudent
};