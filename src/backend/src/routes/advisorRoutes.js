const express = require("express");
const router = express.Router();

const { getAdvisors,
        createAdvisor,
        getAdvisorByName,
        getAdvisorById,
        deleteAdvisor,
        editAdvisor 
 } = require("../controllers/advisorController");
const { getAvailableTimeByAdvisor } = require("../controllers/availabilityController");

//GET
router.get("/", getAdvisors);
router.get("/search", getAdvisorByName);
router.get("/:id", getAdvisorById);
router.get("/:id/availabilities", getAvailableTimeByAdvisor);

//POST
router.post("/", createAdvisor);

//PUT
router.put("/:id", editAdvisor);

//DELETE
router.delete("/:id", deleteAdvisor);

module.exports = router;