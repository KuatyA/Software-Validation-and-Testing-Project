const pool = require("../db");

const { getAMeetingById,
        getAllMeetings,
        getMeetingsForAGroup,
        getMeetingsForAnAdvisor,
        createAMeeting,
        editAMeeting,
        deleteAMeeting,
        updateAMeetingStatus
} = require("../services/meetingService");

const getMeetings = async(req, res) => {
    const meeting = await getAllMeetings();
    res.json(meeting);
}
const getMeetingById = async(req, res) => {
    const meeting = await getAMeetingById(req.params.id);
}
const getMeetingsForGroup = async(req, res) => {
    const id = req.query.group_id;
    const meeting = await getMeetingsForAGroup(id);
    res.json(meeting);
}

const getMeetingsForAdvisor = async(req, res) => {
    const id = req.query.advisor_id;
    const meeting = await getMeetingsForAnAdvisor(id);
    res.json(meeting);
}

const createMeeting = async(req, res) => {
    const meeting = await createAMeeting(req.body);
    res.json(meeting);
}

const updateMeetingStatus = async(req, res) => {
    const meeting = await updateAMeetingStatus(req.body.status, req.params.meeting_id);
    res.json(meeting);
}

const editMeeting = async(req, res) => {
    const meeting = await editAMeeting(req.body, req.params.meeting_id);
    res.json(meeting);
}

const deleteMeeting = async(req, res) => {
    const meeting = await deleteAMeeting(req.params.meeting_id);
    res.json(meeting);
}

module.exports = {
    getMeetings,
    getMeetingById,
    getMeetingsForGroup,
    getMeetingsForAdvisor,
    createMeeting,
    updateMeetingStatus,
    editMeeting,
    deleteMeeting
}