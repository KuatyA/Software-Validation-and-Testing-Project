const express = require("express");
const pool = require("../db");

const  seeFeedback = async(submission_id) => {
    const result = pool.query("SELECT * FROM feedback WHERE feedback_submission_id = $1", [submission_id])
    return result;
}

const createAFeedback = async(feedback_data, submission_id) => {
    const result = pool.query("INSERT INTO feedback (feedback_submission_id , feedback_advisor_id, feedback_text)" + 
        "VALUES($1, $2, $3) RETURNING *", [submission_id ,feedback_data.advisor_id, feedback_data.text]);
    return result;
}

const editAFeedback = async(feedback_data, submission_id) => {
    const result = pool.query("UPDATE feedback SET feedback_text = $1 WHERE feedback_id = $2 AND feedback_submission_id = $3 RETURNING *",
        [feedback_data.text, feedback_data.id, submission_id]);
}

const deleteAFeedback = async(submission_id) => {
    const result = pool.query("DELETE FROM feedback WHERE feedback_submission_id = $1 RETURNING *", [submission_id]);
    return result;
}

module.exports = {
    seeFeedback,
    createAFeedback,
    editAFeedback,
    deleteAFeedback
}