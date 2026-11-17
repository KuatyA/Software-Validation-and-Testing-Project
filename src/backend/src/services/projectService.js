const express = require("express");
const pool = require("../db");

const getAllProjects = async () => {
    const result = await pool.query("SELECT * FROM project");
    return result;
}
const getAProjectById = async (project_id) => {
    const result = await pool.query("SELECT * FROM project WHERE project_id = $1", [project_id]);
    return result.rows[0];
}
const getAProjectByName = async (project_name) => {
    const result = await pool.query("SELECT * FROM project WHERE project_name = $1", [project_name]);
    return result.rows[0];
}

//for now, no frontend exists so the way to add a project is to use:
/*

-ON LINUX-
    curl -X {method}<-(POST(create) or PUT(edit)) http://(domain name or ip address):3000/projects -H "Content-Type: application/json" -d '{
        "name":"Project 1",
        "description":"New Project"
    }'
*/

/*
-ON WINDOWS-
    Invoke-RestMethod `
        -Method {method} ` method is either POST(create) or PUT(edit)
        -Uri "http://cachyos-pc:3000/projects" `
        -ContentType "application/json" `
        -Body '{
            "name":"Project 1",
            "description":"New Project"
        }'
*/
const createAProject = async (project_data) => {
    //console.log("SERVICE DATA:", project_data);
    const result = await pool.query("INSERT INTO project (project_name, project_description) " + 
                                "VALUES ($1, $2) RETURNING * ", [project_data.name, project_data.description]);
    return result.rows[0];
}
const editAProject = async(project_data, project_id) => {
    const result = await pool.query("UPDATE project SET project_name = $1, project_description = $2 WHERE project_id = $3 RETURNING * ",
         [project_data.name, project_data.description, project_id]);
    return result.rows[0];
}
//for now, no frontend exists so deleting is as follows:
/*
-ON LINUX-
    curl -X DELETE http://(domain name or ip address)/projects/{id}
*/
/*
-ON WINDOWS-
    Invoke-RestMethod `
        -Method DELETE `
        -Uri "http://(domain name or ip address)/projects/{id}"
*/
const deleteAProject =  async(project_id) => {
    const result = await pool.query("DELETE FROM project WHERE project_id = $1 RETURNING * ", [project_id]);
    return result.rows[0];
}
module.exports = {
    getAllProjects,
    getAProjectById,
    getAProjectByName,
    createAProject,
    editAProject,
    deleteAProject
};