const express = require("express");
const pool = require("../db");

const getAllSubmissions = async() => {
    const result = await pool.query("SELECT * FROM submission");
    return result;
}

const getASubmissionsByGroup = async(group_id) => {
    const result = await pool.query("SELECT * FROM submission WHERE submission_group_id = $1", [group_id]);
    return result.rows[0];
}

const getASubmissionsByTaskId = async(group_id, task_id) => {
    const result = await pool.query("SELECT * FROM submission WHERE submission_group_id = $1 AND submission_task_id = $2", [group_id, task_id]);
    return result.rows[0];
}

const createASubmission = async(submission_data, group_id, task_id) => {
    const result = await pool.query("INSERT INTO submission (submission_task_id, submission_group_id, file_path, submission_status, uploaded_by, version_no)" + 
        "VALUES($1, $2, $3, $4, $5, $6) RETURNING *", [task_id, group_id, submission_data.file_path, submission_data.status, submission_data.uploaded_by, submission_data.version_no]);
    return result.rows[0];
}

const editASubmission = async(new_submission_data, group_id, task_id) => {
    const old_data = await pool.query("SELECT * FROM submission WHERE submission_group_id = $1 AND submission_task_id = $2 ORDER BY version_no DESC LIMIT 1", [group_id, task_id]);
    const latestSubmission = old_data.rows[0];
    const newVersion = latestSubmission.version_no + 1;
    const result = await pool.query("INSERT INTO submission (submission_task_id, submission_group_id, file_path, submission_status, uploaded_by, version_no)" + 
        "VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
        [latestSubmission.submission_task_id,
         latestSubmission.submission_group_id, 
         new_submission_data.file_path,
         latestSubmission.submission_status,
         latestSubmission.uploaded_by,
         newVersion]);
    return result.rows[0];
}
//submissions can't be deleted as to the requirements that we need to store old submissions

module.exports = {
    getASubmissionsByGroup,
    getASubmissionsByTaskId,
    getAllSubmissions,
    createASubmission,
    editASubmission
}