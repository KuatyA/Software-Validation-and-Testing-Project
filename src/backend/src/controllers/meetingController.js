const pool = require("../db");

const { SeeMeetingByGroupId,
        SeeMeetingsByAdvisorId,
        createAMeeting,
        editAMeeting,
        deleteAMeeting
} = require("../services/meetingService");

const seeGroupMeeting = async(req, res) => {
    const meeting = await SeeMeetingByGroupId(req.params.group_id);
    res.json(meeting);
}

const seeAdvisorMeeting = async(req, res) => {
    const meeting = await SeeMeetingsByAdvisorId(req.params.advisor_id);
    res.json(meeting);
}

const createMeeting = async(req, res) => {
    const meeting = await createAMeeting(req.body, req.params.group_id);
    res.json(meeting);
}

const editMeeting = async(req, res) => {
    const meeting = await editAMeeting(req.body, req.params.advisor_id, req.params.meeting_id);
    res.json(meeting);
}

const deleteMeeting = async(req, res) => {
    const meeting = await deleteAMeeting(req.params.meeting_id, req.params.advisor_id);
    res.json(meeting);
}

module.exports = {
    seeGroupMeeting,
    seeAdvisorMeeting,
    createMeeting,
    editMeeting,
    deleteMeeting
}