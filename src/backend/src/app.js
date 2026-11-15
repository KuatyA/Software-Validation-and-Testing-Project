require("dotenv").config();


const express = require("express");
const app = express();
const pool = require("./db");
const studentRoutes = require("./routes/studentRoutes");
const advisorRoutes = require("./routes/advisorRoutes");

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Backend Running"
    });
});

app.use("/students", studentRoutes);
app.use("/advisors", advisorRoutes);

app.listen(3000, () => {
    console.log("App Running on port 3000");
});
