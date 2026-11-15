const pool = require("../db");

const { getAllAdvisors } = require("../services/advisorService");
const { editAnAdvisor } = require("../services/advisorService");
const { getAnAdvisorById } = require("../services/advisorService");
const { getAnAdvisorByName } = require("../services/advisorService");
const { createAnAdvisor } = require("../services/advisorService");
const { deleteAnAdvisor } = require("../services/advisorService")

const getAdvisors = async(req, res) => {
    const advisors = await getAllAdvisors();
    res.json(advisors);
};
const getAdvisorById = async(req, res) => {
    const Advisor = await getAnAdvisorById(req.params.id);
    res.json(Advisor);
}
const getAdvisorByName = async(req, res) => {
    const name = req.query.name;
    const surname = req.query.surname;
    const Advisor = await getAnAdvisorByName(name, surname);
    res.json(Advisor);
}
const createAdvisor = async(req, res) => {
    //console.log("CALLED");
    //console.log("BODY:", req.body);
    const Advisor = await createAnAdvisor(req.body);
    res.json(Advisor);
    //status(201).
}
const editAdvisor = async(req, res) => {
    const student = await editAnAdvisor(req.body, req.params.id);
    res.json(student);
}
const deleteAdvisor = async(req, res) => {
    const student = await deleteAnAdvisor(req.params.id);
    res.json(student);
}
module.exports = {
    getAdvisors,
    getAdvisorById,
    getAdvisorByName,
    createAdvisor,
    editAdvisor,
    deleteAdvisor
}