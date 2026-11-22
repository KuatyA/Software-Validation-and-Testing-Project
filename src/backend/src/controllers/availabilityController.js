const pool = require("../db");

const { getAllAvailableMeetingTimes,
        getAllAvailableTimeByAdvisorId,
        createAnAvailability,
        editAnAvailability,
        deleteAnAvailability,
        getAnAvailabilityById
} = require("../services/availabilityService");

const getAvailableTimes = async(req, res) => {
    const availability = await getAllAvailableMeetingTimes();
    res.json(availability);
}
const getAvailibilityById = async(req, res) => {
    const availability = await getAnAvailabilityById(req.params.availability_id);
    res.json(availability);
}
const getAvailableTimeByAdvisor = async (req, res) => {
    const availability = await getAllAvailableTimeByAdvisorId(req.params.id);
    res.json(availability);
}
const createAvailability = async (req, res) => {
    const availability = createAnAvailability(req.body, req.params.advisor_id);
    res.json(availability);
}
const editAvailability = async (req, res) => {
    const availability = editAnAvailability(req.body, req.params.id, req.params.advisor_id);
    res.json(availability);
}
const deleteAvailability = async (req, res) => {
    const availability = deleteAnAvailability(req.params.id);
    res.json(availability);
}

module.exports = {
    getAvailableTimes,
    getAvailableTimeByAdvisor,
    createAvailability,
    editAvailability,
    deleteAvailability,
    getAvailibilityById
}