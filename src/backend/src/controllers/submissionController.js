const pool = require("../db");

const { getASubmissionsByGroup,
        getASubmissionsByTaskId,
        getASubmissionById,
        getAllSubmissions,
        createASubmission,
        editASubmission
} = require("../services/submissionService");

const getSubmissions = async (req, res) => {
    const submission = await getAllSubmissions();
    res.json(submission);
}
const getSubmissionById = async (req, res) => {
    const submission = await getASubmissionById(req.params.submission_id);
    res.json(submission);
}
const getSubmissionByGroupId = async (req, res) => {
    const id = req.query.group_id;
    const submission = await getASubmissionsByGroup(id);
    res.json(submission);
}

const getSubmissionByTaskAndGroupId = async (req, res) => {
    const task_id = req.query.task_id;
    const group_id = req.query.group_id;
    const submission = await getASubmissionsByTaskId(group_id, task_id);
    res.json(submission);
}

const createSubmission = async (req, res) => {
    const filePath = req.file.path;
    const submission = await createASubmission({...req.body, file_path: filePath});
    res.json(submission);
}

const editSubmission = async (req, res) => {
    const submission = await editASubmission(req.body, req.params.submission_id);
    res.json(submission);
}

module.exports = {
    getSubmissions,
    getSubmissionByGroupId,
    getSubmissionById,
    getSubmissionByTaskAndGroupId,
    createSubmission,
    editSubmission
}
