const express = require("express");
const router = express.Router();

const { getAdvisors } = require("../controllers/advisorController");
const { createAdvisor } = require("../controllers/advisorController");
const { getAdvisorByName } = require("../controllers/advisorController");
const { getAdvisorById } = require("../controllers/advisorController");
const { deleteAdvisor } = require("../controllers/advisorController");
const { editAdvisor } = require("../controllers/advisorController");
const { seeAdvisorMeeting, editMeeting } = require("../controllers/meetingController");

router.get("/", getAdvisors);
router.put("/:id", editAdvisor);
router.post("/", createAdvisor);
router.get("/search", getAdvisorByName);
router.get("/:advisor_id/meetings", seeAdvisorMeeting);
router.put("/:advisor_id/meetings/:meeting_id", editMeeting);
router.get("/:id", getAdvisorById);
router.delete("/:id", deleteAdvisor)

module.exports = router;