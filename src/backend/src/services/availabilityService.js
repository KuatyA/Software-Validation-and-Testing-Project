const express = require("express");
const pool = require("../db");

const getAllAvailableMeetingTimes = async () => {
    const result = await pool.query("SELECT * FROM advisor_availability");
    return result;
}
const getAnAvailabilityById = async(availability_id) => {
    const result = await pool.query("SELECT * FROM advisor_availability WHERE availability_id = $1", [availability_id]);
    return result;
}
const getAllAvailableTimeByAdvisorId = async (advisor_id) => {
    const result = await pool.query("SELECT * FROM advisor_availability WHERE availability_advisor_id = $1", [advisor_id]);
    return result.rows[0];
}

//for now, no frontend exists so the way to add a task is to use:
/*

-ON LINUX-
    curl -X {method}<-(POST(create) or PUT(edit)) http://(domain name or ip address):3000/tasks -H "Content-Type: application/json" -d '{
        "name":"task 1",
        "advisor":{advisor_id}
        "task_task":{task_id}
    }'
*/

/*
-ON WINDOWS-
    Invoke-RestMethod `
        -Method {method} ` method is either POST(create) or PUT(edit)
        -Uri "http://cachyos-pc:3000/tasks" `
        -ContentType "application/json" `
        -Body '{
            "name":"task 1",
            "advisor":{advisor_id}
            "task_task":{task_id}
        }'
*/
const createAnAvailability = async (availability_data, advisor_id) => {
    //console.log("SERVICE DATA:", task_data);
    const result = await pool.query("INSERT INTO advisor_availability (availability_advisor_id, start_time, end_time, availability_date, is_booked) " + 
                                "VALUES ($1, $2, $3, $4, $5) RETURNING * ", [advisor_id, availability_data.start_time, availability_data.end_time, availability_data.date, availability_data.is_booked]);
    return result.rows[0];
}
const editAnAvailability = async(availability_data, availability_id, advisor_id) => {
    const result = await pool.query("UPDATE advisor_availability SET availability_advisor_id = $1, start_time = $2, end_time = $3, availability_date = $4, is_booked = $5 WHERE availability_id = $6 RETURNING * ",
         [advisor_id, availability_data.start_time, availability_data.end_time, availability_data.date, availability_data.is_booked, availability_id]);
    return result.rows[0];
}

const deleteAnAvailability =  async(availability_id) => {
    const result = await pool.query("DELETE FROM advisor_availability WHERE availability_id = $1 RETURNING * ", [availability_id]);
    return result.rows[0];
}
const bookAvailabilty = async(availability_id) => {
    const result = await pool.query("UPDATE advisor_availability SET is_booked = true");
    return result;
}
module.exports = {
    getAllAvailableMeetingTimes,
    getAllAvailableTimeByAdvisorId,
    createAnAvailability,
    editAnAvailability,
    deleteAnAvailability,
    getAnAvailabilityById,
    bookAvailabilty
};
