const express = require("express");
const router = express.Router();

const { getSubmissionByGroupId,
        getSubmissionByTaskId,
        getSubmissions,
        createSubmission,
        editSubmission
} = require("../controllers/submissionController");

const {
    seeSubmissionFeedback,
    createFeedback,
    editFeedback,
    deleteFeedback
} = require("../controllers/feedbackController");

router.get("/", getSubmissions);
router.get("/groups/:group_id/tasks/:task_id/submission/:submission_id/feedback", seeSubmissionFeedback);
router.post("/:submission_id/feedback", createFeedback);
router.put("/:submission_id/feedback", editFeedback);
router.delete("/:submission_id/feedback", deleteFeedback);
router.get("/groups/:group_id/tasks/:task_id", getSubmissionByTaskId);
router.get("/groups/:group_id", getSubmissionByGroupId);
router.post("/groups/:group_id/tasks/:task_id/submission", createSubmission);
router.put("/groups/:group_id/tasks/:task_id/submission", editSubmission);

module.exports = router;