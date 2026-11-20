const express = require("express");
const pool = require("../db");

const  seeFeedback = async(group_id, task_id, submission_id) => {
    const feedback_related_info = pool.query("SELECT * FROM submission WHERE submission_group_id = $1 AND submission_task_id = $2", [group_id, task_id]);
    if(feedback_related_info.submission_id != submission_id){
        throw new Error(
            "Provided submission ID: ${submission_id} does not match any of the submission ID " + 
            "of group:${group_id} and task:${task_id}!");
    }
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