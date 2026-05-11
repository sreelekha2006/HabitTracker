const Habit = require("../models/Habit");

// Create habit
const createHabit = async (req, res) => {
  try {
    const { title, description, frequency } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Habit title is required",
      });
    }

    const habit = await Habit.create({
      user: req.user._id,
      title,
      description,
      frequency,
    });

    res.status(201).json({
      message: "Habit created successfully",
      habit,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// Get logged-in user's habits
const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json(habits);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  createHabit,
  getHabits,
};