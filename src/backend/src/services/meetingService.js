const express = require("express");
const pool = require("../db");

const SeeMeetingsByAdvisorId = async(advisor_id) => {
    const result = await pool.query("SELECT * FROM meeting WHERE meeting_advisor = $1", [advisor_id]);
    return result;
}

const SeeMeetingByGroupId = async(group_id) => {
    const result = await pool.query("SELECT * FROM meeting WHERE meeting_group = $1", [group_id]);
    return result;
}

//Creating a meeting requests it, thats why we dont touch 'meetting_status'
//it gets updated by the system for each refresh
const createAMeeting = async(meeting_data, group_id) => {
    const result = await pool.query("INSERT INTO meeting (meeting_advisor, meeting_group, meeting_scheduled_at_hour, meeting_scheduled_at_date)" +
            "VALUES($1, $2, $3, $4) RETURNING *", [meeting_data.advisor, group_id, meeting_data.hour, meeting_data.date]);
    return result;
}

const editAMeeting = async(meeting_data, advisor_id, meeting_id) => {
    const result = await pool.query("UPDATE meeting SET meetting_status = $1, meeting_group = $2, meeting_scheduled_at_hour = $3" + 
        ", meeting_scheduled_at_date = $4 WHERE meeting_id = $5 AND meeting_advisor = $6 RETURNING *",
        [meeting_data.status, meeting_data.group, meeting_data.hour, meeting_data.date, meeting_id, advisor_id]);
    return result;
}

//this function is just experimantal, i have no intention of deleting
//meetings, rejected meeting requests are just gonna be flagged as 'REJECTED'
const deleteAMeeting = async(meeting_id, advisor_id) => {
    const result = await pool.query("DELETE FROM meeting WHERE meeting_id = $1 AND meeting_advisor = $2 RETURNING *",
        [meeting_id, advisor_id]);
    return result;
}

module.exports = {
    SeeMeetingByGroupId,
    SeeMeetingsByAdvisorId,
    createAMeeting,
    editAMeeting,
    deleteAMeeting
}