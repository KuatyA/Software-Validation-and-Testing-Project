const express = require("express");
const router = express.Router();

const { getSubmissionByGroupId,
        getSubmissionByTaskAndGroupId,
        getSubmissionById,
        getSubmissions,
        createSubmission,
        editSubmission
} = require("../controllers/submissionController");

const upload = require("../middleware/uploadMiddleware");

const {
    seeSubmissionFeedback,
    createFeedback,
    editFeedback,
    deleteFeedback
} = require("../controllers/feedbackController");

//GET
router.get("/", getSubmissions);
router.get("/:id", getSubmissionById);
router.get("", getSubmissionByTaskAndGroupId);
router.get("/group", getSubmissionByGroupId);
router.get("/:id/feedback", seeSubmissionFeedback);

//POST
router.post("/", upload.single("file"), createSubmission);
router.post("/:id/revisions", editSubmission);
router.post("/:id/feedback", createFeedback);

//PUT
router.put("/:id/feedback", editFeedback);

//DELETE
router.delete("/:id/feedback", deleteFeedback);




module.exports = router;