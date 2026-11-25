const pool = require("../db");
const express = require("express");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        next();
    }  catch(err) {

        return res.status(401).json({
            error: "Invalid token"
        });

    }
}
module.exports = authMiddleware;