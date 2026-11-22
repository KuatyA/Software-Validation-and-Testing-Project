require("dotenv").config();


const express = require("express");
const app = express();
const pool = require("./db");
const studentRoutes = require("./routes/studentRoutes");
const advisorRoutes = require("./routes/advisorRoutes");
const groupRoutes = require("./routes/groupRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");
const availabilityRoutes = require("./routes/availabilityRoutes");
const submissionRoutes = require("./routes/submissionRoutes");
const meetingRoutes = require("./routes/meetingRoutes");

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Backend Running"
    });
});

app.use("/students", studentRoutes);
app.use("/advisors", advisorRoutes);
app.use("/groups", groupRoutes);
app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);
app.use("/availabilities", availabilityRoutes);
app.use("/submissions", submissionRoutes);
app.use("/meetings", meetingRoutes);


app.listen(3000, () => {
    console.log("App Running on port 3000");
});
