const express = require("express");

const {
  createHabit,
  getHabits,
  completeHabit,
} = require("../controllers/habitController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createHabit);

router.get("/", protect, getHabits);

// Complete habit
router.put("/:id/complete", protect, completeHabit);

module.exports = router;