const express = require("express");
const pool = require("../db");

const getAllAdvisors = async () => {
    const result = await pool.query("SELECT * FROM advisor");
    return result;
}

const getAnAdvisorById = async (advisor_id) => {
    const result = await pool.query("SELECT * FROM advisor WHERE advisor_id = $1", [advisor_id]);
    return result.rows[0];
}
const getAnAdvisorByName = async (advisor_name, advisor_surname) => {
    const result = await pool.query("SELECT * FROM advisor WHERE advisor_name = $1 AND advisor_surname = $2", [advisor_name, advisor_surname]);
    return result.rows[0];
}

//check studentServices.js for how to add to a table with an http request

const createAnAdvisor = async (advisor_data) => {
    //console.log("SERVICE DATA:", advisor_data);
    const result = await pool.query("INSERT INTO advisor (advisor_name, advisor_surname, advisor_mail, advisor_password) " + 
                                "VALUES ($1, $2, $3, $4) RETURNING * ", [advisor_data.name, advisor_data.surname, advisor_data.mail, advisor_data.password]);
    return result.rows[0];
}
const editAnAdvisor = async(advisor_data, advisor_id) => {
    const result = await pool.query("UPDATE advisor SET advisor_name = $1, advisor_surname = $2, advisor_mail = $3, advisor_password = $4 WHERE advisor_id = $5 RETURNING * ",
         [advisor_data.name, advisor_data.surname, advisor_data.mail, advisor_data.password, advisor_id]);
    return result.rows[0];
}
//check studentServices.js for how to delete with an http request
const deleteAnAdvisor = async(advisor_id) => {
    const result = await pool.query("DELETE FROM advisor WHERE advisor_id = $1 RETURNING * ", [advisor_id]);
    return result.rows[0];
}
module.exports = {
    getAllAdvisors,
    getAnAdvisorById,
    getAnAdvisorByName,
    createAnAdvisor,
    deleteAnAdvisor,
    editAnAdvisor,
}