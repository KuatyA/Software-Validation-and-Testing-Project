const express = require("express");
const pool = require("../db");
const jwt = require("jsonwebtoken");

class UserNotFoundError extends Error{
    constructor(message = "User doesnt exist") {
        super(message);
        this.name = 'UserNotFoundError';
        this.statusCode = 404;
    }
}

const loginUser = async(login_data) => {
    const pending_mail = login_data.mail;
    const pending_password = login_data.password;
    

    try{
        const student = await pool.query("SELECT * FROM student WHERE student_mail = $1 AND student_password = $2",
         [pending_mail, pending_password]);
            console.log("MAIL: ", pending_mail);
            console.log("PASS: ", pending_password);
            console.log(student.rows);
        if(student.rows.length > 0){
            const token = jwt.sign(
                {
                    id: student.rows[0].student_id,
                    role:'STUDENT'
                },
                process.env.JWT_SECRET,
                {expiresIn: "24h"}
            );
            return token;
        }
        const advisor = await pool.query("SELECT * FROM advisor WHERE " + 
                "advisor_mail = $1 AND advisor_password = $2", [pending_mail, pending_password]);
        console.log(advisor.rows);
        if(advisor.rows.length > 0){
             const token = jwt.sign(
                {
                    id: advisor.rows[0].advisor_id,
                    role: 'ADVISOR'
                },
                process.env.JWT_SECRET,
                {expiresIn: "24h"}
             )
        }

        throw new UserNotFoundError("User doesnt exist");
        }catch (err){
            //if (err instanceof UserNotFoundError) {
                console.error(err);
                throw err;
            //}
        }
    
}

module.exports = {
    loginUser
}
