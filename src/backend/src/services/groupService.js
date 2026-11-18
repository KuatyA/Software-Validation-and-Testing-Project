const express = require("express");
const pool = require("../db");

const getAllGroups = async () => {
    const result = await pool.query("SELECT * FROM project_group");
    return result;
}
const getAGroupById = async (group_id) => {
    const result = await pool.query("SELECT * FROM project_group WHERE group_id = $1", [group_id]);
    return result.rows[0];
}
const getAGroupByName = async (group_name) => {
    const result = await pool.query("SELECT * FROM project_group WHERE group_name = $1", [group_name]);
    return result.rows[0];
}

//for now, no frontend exists so the way to add a group is to use:
/*

-ON LINUX-
    curl -X {method}<-(POST(create) or PUT(edit)) http://(domain name or ip address):3000/groups -H "Content-Type: application/json" -d '{
        "name":"group 1",
        "advisor":{advisor_id}
        "group_project":{project_id}
    }'
*/

/*
-ON WINDOWS-
    Invoke-RestMethod `
        -Method {method} ` method is either POST(create) or PUT(edit)
        -Uri "http://cachyos-pc:3000/groups" `
        -ContentType "application/json" `
        -Body '{
            "name":"group 1",
            "advisor":{advisor_id}
            "group_project":{project_id}
        }'
*/
const createAGroup = async (group_data) => {
    //console.log("SERVICE DATA:", group_data);
    const result = await pool.query("INSERT INTO project_group (group_name, group_advisor, group_project) " + 
                                "VALUES ($1, $2, $3) RETURNING * ", [group_data.name, group_data.advisor, group_data.project]);
    return result.rows[0];
}
const editAGroup = async(group_data, group_id) => {
    const result = await pool.query("UPDATE project_group SET group_name = $1, group_advisor = $2, group_project = $3 WHERE group_id = $4 RETURNING * ",
         [group_data.name, group_data.advisor, group_data.project, group_id]);
    return result.rows[0];
}
//for now, no frontend exists so deleting is as follows:
/*
-ON LINUX-
    curl -X DELETE http://(domain name or ip address)/groups/{id}
*/
/*
-ON WINDOWS-
    Invoke-RestMethod `
        -Method DELETE `
        -Uri "http://(domain name or ip address)/groups/{id}"
*/
const deleteAGroup =  async(group_id) => {
    const result = await pool.query("DELETE FROM project_group WHERE group_id = $1 RETURNING * ", [group_id]);
    return result.rows[0];
}
module.exports = {
    getAllGroups,
    getAGroupById,
    getAGroupByName,
    createAGroup,
    editAGroup,
    deleteAGroup
};