const express = require("express");
const router = express.Router();

const {getGroups} = require("../controllers/groupController");
const {getGroupById} = require("../controllers/groupController");
const {getGroupByName} = require("../controllers/groupController");
const { createGroup } = require("../controllers/groupController");
const { deleteGroup } = require("../controllers/groupController");
const { editGroup } = require("../controllers/groupController");
const { seeGroupMeeting,
        createMeeting
 } = require("../controllers/meetingController");

router.get("/", getGroups);
router.post("/", createGroup);
router.put("/:id", editGroup);
router.get("/search", getGroupByName);
router.get("/:group_id/meetings", seeGroupMeeting);
router.post("/:group_id/meetings", createMeeting);
router.get("/:id", getGroupById);
router.delete("/:id", deleteGroup);



module.exports = router;