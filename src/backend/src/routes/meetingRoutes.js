const express = require("express");
const router = express.Router();

const { getMeetings,
        getMeetingById,
        getMeetingsForAdvisor,
        getMeetingsForGroup,
        createMeeting,
        editMeeting,
        updateMeetingStatus,
        deleteMeeting
} = require("../controllers/meetingController");
//GET
router.get("/", getMeetings);
router.get("/:id", getMeetingById);
router.get("/group", getMeetingsForGroup);
router.get("/advisor", getMeetingsForAdvisor);

//POST
router.post("/", createMeeting);

//PUT
router.put("/:meeting_id", editMeeting);

//PATCH
router.patch("/:meeting_id/status", updateMeetingStatus);

//DELETE
router.delete("/:meeting_id", deleteMeeting);

module.exports = router;