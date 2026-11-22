const pool = require("../db");

const { getAllAdvisors } = require("../services/advisorService");
const { editAnAdvisor } = require("../services/advisorService");
const { getAnAdvisorById } = require("../services/advisorService");
const { getAnAdvisorByName } = require("../services/advisorService");
const { createAnAdvisor } = require("../services/advisorService");
const { deleteAnAdvisor } = require("../services/advisorService");
const { getAllAvailableTimeByAdvisorId } = require("../services/availabilityService");

const getAdvisors = async(req, res) => {
    const advisors = await getAllAdvisors();
    res.json(advisors);
};
const getAdvisorById = async(req, res) => {
    const advisor = await getAnAdvisorById(req.params.id);
    res.json(advisor);
}
const getAdvisorByName = async(req, res) => {
    const name = req.query.name;
    const surname = req.query.surname;
    const advisor = await getAnAdvisorByName(name, surname);
    res.json(advisor);
}

const getAvailableTimeByAdvisor = async (req, res) => {
    const availability = await getAllAvailableTimeByAdvisorId(req.params.id);
    res.json(availability);
}
const createAdvisor = async(req, res) => {
    //console.log("CALLED");
    //console.log("BODY:", req.body);
    const advisor = await createAnAdvisor(req.body);
    res.json(advisor);
    //status(201).
}
const editAdvisor = async(req, res) => {
    const advisor = await editAnAdvisor(req.body, req.params.id);
    res.json(advisor);
}
const deleteAdvisor = async(req, res) => {
    const advisor = await deleteAnAdvisor(req.params.id);
    res.json(advisor);
}

module.exports = {
    getAdvisors,
    getAdvisorById,
    getAdvisorByName,
    createAdvisor,
    editAdvisor,
    deleteAdvisor,
    getAvailableTimeByAdvisor
}