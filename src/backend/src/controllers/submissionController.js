const pool = require("../db");

const { getASubmissionsByGroup,
        getASubmissionsByTaskId,
        getAllSubmissions,
        createASubmission,
        editASubmission
} = require("../services/submissionService");

const getSubmissions = async (req, res) => {
    const submission = await getAllSubmissions();
    res.json(submission);
}

const getSubmissionByGroupId = async (req, res) => {
    const submission = await getASubmissionsByGroup(req.params.group_id);
    res.json(submission);
}

const getSubmissionByTaskId = async (req, res) => {
    const submission = await getASubmissionsByTaskId(req.params.group_id, req.params.task_id);
    res.json(submission);
}

const createSubmission = async (req, res) => {
    const submission = await createASubmission(req.body, req.params.group_id, req.params.task_id);
    res.json(submission);
}

const editSubmission = async (req, res) => {
    const submission = await editASubmission(req.body, req.params.group_id, req.params.task_id);
    res.json(submission);
}

module.exports = {
    getSubmissions,
    getSubmissionByGroupId,
    getSubmissionByTaskId,
    createSubmission,
    editSubmission
}
