const express = require("express");
const router = express.Router();

const { getAvailableTimes,
        getAvailableTimeByAdvisor,
        createAvailability,
        editAvailability,
        deleteAvailability
} = require("../controllers/availabilityController");

router.get("/", getAvailableTimes);
router.put("/:advisor_id/:id", editAvailability);
router.post("/:advisor_id/", createAvailability);
router.get("/:advisor_id", getAvailableTimeByAdvisor);
router.delete("/:id", deleteAvailability);

module.exports = router;
