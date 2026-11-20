const express = require("express");
const router = express.Router();

const { getSubmissionByGroupId,
        getSubmissionByTaskId,
        getSubmissions,
        createSubmission,
        editSubmission
} = require("../controllers/submissionController");

router.get("/", getSubmissions);
router.get("/groups/:group_id", getSubmissionByGroupId);
router.get("/tasks/:task_id", getSubmissionByTaskId);
router.post("/groups/:group_id/tasks/:task_id/submission", createSubmission);
router.put("/groups/:group_id/tasks/:task_id/submission", editSubmission);

module.exports = router;