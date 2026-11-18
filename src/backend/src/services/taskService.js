const express = require("express");
const pool = require("../db");

const getAllTasks = async () => {
    const result = await pool.query("SELECT * FROM task_task");
    return result;
}
const getATaskById = async (task_id) => {
    const result = await pool.query("SELECT * FROM task_task WHERE task_id = $1", [task_id]);
    return result.rows[0];
}
const getATaskByName = async (task_name) => {
    const result = await pool.query("SELECT * FROM task_task WHERE task_name = $1", [task_name]);
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
const createATask = async (task_data, advisor_id) => {
    //console.log("SERVICE DATA:", task_data);
    const result = await pool.query("INSERT INTO task (task_name, task_assigned_group_id, task_assigned_student_id, task_due_date, task_description, task_status, task_project, created_by) " + 
                                "VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING * ", [task_data.name, task_data.group, task_data.student, task_data.due_date, task_data.description, task_data.status, task_data.project, advisor_id]);
    return result.rows[0];
}
const editATask = async(task_data, task_id) => {
    const result = await pool.query("UPDATE task SET task_name = $1, task_assigned_group_id = $2, task_assigned_student_id = $3, task_due_date = $4, task_description = $5, task_status = $6, task_project = $7, created_by = $8 WHERE task_id = $9 RETURNING * ",
         [task_data.name, task_data.advisor, task_data.task, task_id]);
    return result.rows[0];
}
//for now, no frontend exists so deleting is as follows:
/*
-ON LINUX-
    curl -X DELETE http://(domain name or ip address)/tasks/{id}
*/
/*
-ON WINDOWS-
    Invoke-RestMethod `
        -Method DELETE `
        -Uri "http://(domain name or ip address)/tasks/{id}"
*/
const deleteATask =  async(task_id) => {
    const result = await pool.query("DELETE FROM task_task WHERE task_id = $1 RETURNING * ", [task_id]);
    return result.rows[0];
}
module.exports = {
    getAllTasks,
    getATaskById,
    getATaskByName,
    createATask,
    editATask,
    deleteATask
};
