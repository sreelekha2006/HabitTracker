const express = require("express");

const {
  createHabit,
  getHabits,
  completeHabit,
  updateHabit,
  deleteHabit,
} = require("../controllers/habitController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createHabit);
router.get("/", protect, getHabits);
router.put("/:id/complete", protect, completeHabit);
router.put("/:id", protect, updateHabit);
router.delete("/:id", protect, deleteHabit);

module.exports = router;