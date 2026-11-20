const pool = require("../db");

const {
    seeFeedback,
    createAFeedback,
    editAFeedback,
    deleteAFeedback
} = require("../services/feedbackService");

const seeSubmissionFeedback = async(req, res) => {
    const feedback = await seeFeedback(req.params.group_id,
        req.params.task_id, req.params.submission_id);
    res.json(feedback);
}

const createFeedback = async(req, res) => {
    const feedback = await createAFeedback(req.body, req.params.submission_id);
    res.json(feedback);
}

const editFeedback = async(req, res) => {
    const feedback = await editAFeedback(req.body, req.params.submission_id);
    res.json(feedback);
}

const deleteFeedback = async(req, res) => {
    const feedback = await deleteAFeedback(req.params.submission_id);
    res.json(feedback);
}

module.exports = {
    seeSubmissionFeedback,
    createFeedback,
    editFeedback,
    deleteFeedback
}