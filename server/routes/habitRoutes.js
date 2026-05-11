const express = require("express");

const { createHabit, getHabits } = require("../controllers/habitController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createHabit);
router.get("/", protect, getHabits);

module.exports = router;