const express = require("express");
const pool = require("../db");

const { getAnAvailabilityById, bookAvailabilty } = require("../services/availabilityService");

const getAllMeetings = async() => {
    const result = await pool.query("SELECT * FROM meeting");
    return result;
}
const getAMeetingById = async(id) => {
    const result = await pool.query("SELECT * FROM meeting WHERE meeting_id = $1", [id]);
    return result;
}

const getMeetingsForAGroup = async(group_id) => {
    const result = await pool.query("SELECT * FROM meeting WHERE meeting_group = $1", [group_id]);
    return result;
}
const getMeetingsForAnAdvisor = async(advisor_id) => {
    const result = await pool.query("SELECT * FROM meeting WHERE meeting_advisor = $1", [advisor_id]);
    return result;
}

//Creating a meeting requests it, thats why we dont touch 'meetting_status'
//it gets updated by the system for each refresh
const createAMeeting = async(meeting_data) => {
    const result = await pool.query("INSERT INTO meeting (meeting_advisor, meeting_group, meeting_scheduled_at_hour, meeting_scheduled_at_date)" +
            "VALUES($1, $2, $3, $4) RETURNING *", [meeting_data.advisor, meeting_data.group, meeting_data.hour, meeting_data.date]);
    return result;
}
const requestAMeeting = async(meeting_data) => {
    const availability = await getAnAvailabilityById(meeting_data.id);
    if(availability.is_booked == true){
        throw new Error("Availability is already booked");
    }
    await bookAvailabilty(meeting_data.id);
    const result = createAMeeting({
        advisor:
            availability.availability_advisor_id,
        group:
            meeting_data.group_id,
        hour:
            availability.start_time,
        date:
            availability.availability_date
    });
    return result.rows[0];
}

const updateAMeetingStatus = async(meeting_status, meeting_id) => {
    const result = await pool.query("UPDATE meeting SET meetting_status = $1 WHERE meeting_id = $2 RETURNING *", [meeting_status, meeting_id]);
    return result;
}
const editAMeeting = async(meeting_data, meeting_id) => {
    const result = await pool.query("UPDATE meeting SET meetting_status = $1, meeting_group = $2, meeting_scheduled_at_hour = $3" + 
        ", meeting_scheduled_at_date = $4 WHERE meeting_id = $5 RETURNING *",
        [meeting_data.status, meeting_data.group, meeting_data.hour, meeting_data.date, meeting_id]);
    return result;
}

//this function is just experimantal, i have no intention of deleting
//meetings, rejected meeting requests are just gonna be flagged as 'REJECTED'
const deleteAMeeting = async(meeting_id) => {
    const result = await pool.query("DELETE FROM meeting WHERE meeting_id = $1 RETURNING *",
        [meeting_id]);
    return result;
}

module.exports = {
    getAllMeetings,
    getAMeetingById,
    getMeetingsForAGroup,
    getMeetingsForAnAdvisor,
    updateAMeetingStatus,
    createAMeeting,
    editAMeeting,
    deleteAMeeting,
    requestAMeeting
}