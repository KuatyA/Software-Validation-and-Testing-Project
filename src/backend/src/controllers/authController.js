const pool = require("../db");
const { loginUser } = require("../services/authService");

const login = async(req, res) => {
    const token = await loginUser(req.body);
    console.log(token);
    res.json({token});
}

module.exports = {
    login
}