const express = require("express");
const router = express.Router();

const { getAvailableTimes,
        createAvailability,
        editAvailability,
        deleteAvailability,
        getAvailibilityById
} = require("../controllers/availabilityController");

//GET
router.get("/", getAvailableTimes);
router.get("/:id", getAvailibilityById);
//POST
router.post("/:id", createAvailability);

//PUT
router.put("/:id", editAvailability);

//DELETE
router.delete("/:id", deleteAvailability);

module.exports = router;
