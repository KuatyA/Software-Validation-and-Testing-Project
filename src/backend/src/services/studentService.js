const express = require("express");
const pool = require("../db");

const getAllStudents = async () => {
    const result = await pool.query("SELECT * FROM student");
    return result;
}
const getAStudentById = async (student_id) => {
    const result = await pool.query("SELECT * FROM student WHERE student_id = $1", [student_id]);
    return result.rows[0];
}
const getAStudentByName = async (student_name, stundent_surname) => {
    const result = await pool.query("SELECT * FROM student WHERE student_name = $1 AND student_surname = $2", [student_name, stundent_surname]);
    return result.rows[0];
}

//for now, no frontend exists so the way to add a student is to use:
/*

-ON LINUX-
    curl -X {method}<-(POST(create) or PUT(edit)) http://(domain name or ip address):3000/students -H "Content-Type: application/json" -d '{
        "name":"Kutay",
        "surname":"Atlas",
        "mail":"kutayyatlass@gmail.com",
        "password":"kutaypass12345"
    }'
*/

/*
-ON WINDOWS-
    Invoke-RestMethod `
        -Method {method} ` method is either POST(create) or PUT(edit)
        -Uri "http://cachyos-pc:3000/students" `
        -ContentType "application/json" `
        -Body '{
            "name":"Kutay",
            "surname":"Atlas",
            "mail":"kutayyatlass@gmail.com",
            "password":kutaypass12345"
        }'
*/
const createAStudent = async (student_data) => {
    //console.log("SERVICE DATA:", student_data);
    const result = await pool.query("INSERT INTO student (student_name, student_surname, student_mail, student_password) " + 
                                "VALUES ($1, $2, $3, $4) RETURNING * ", [student_data.name, student_data.surname, student_data.mail, student_data.password]);
    return result.rows[0];
}
const editAStudent = async(student_data, student_id) => {
    const result = await pool.query("UPDATE student SET student_name = $1, student_surname = $2, student_mail = $3, student_password = $4 WHERE student_id = $5 RETURNING * ",
         [student_data.name, student_data.surname, student_data.mail, student_data.password, student_id]);
    return result.rows[0];
}
//for now, no frontend exists so deleting is as follows:
/*
-ON LINUX-
    curl -X DELETE http://(domain name or ip address)/students/{id}
*/
/*
-ON WINDOWS-
    Invoke-RestMethod `
        -Method DELETE `
        -Uri "http://(domain name or ip address)/students/{id}"
*/
const deleteAStudent =  async(student_id) => {
    const result = await pool.query("DELETE FROM student WHERE student_id = $1 RETURNING * ", [student_id]);
    return result.rows[0];
}
module.exports = {
    getAllStudents,
    getAStudentById,
    getAStudentByName,
    createAStudent,
    editAStudent,
    deleteAStudent
};