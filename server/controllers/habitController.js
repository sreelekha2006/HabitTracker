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

// Complete habit
const completeHabit = async (req, res) => {
  try {
    const { id } = req.params;

    const habit = await Habit.findById(id);

    if (!habit) {
      return res.status(404).json({
        message: "Habit not found",
      });
    }

    if (habit.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const alreadyCompleted = habit.completedDates.some((date) => {
      const completedDate = new Date(date);
      completedDate.setHours(0, 0, 0, 0);

      return completedDate.getTime() === today.getTime();
    });

    if (alreadyCompleted) {
      return res.status(400).json({
        message: "Habit already completed today",
      });
    }

    habit.completedDates.push(today);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const completedYesterday = habit.completedDates.some((date) => {
      const completedDate = new Date(date);
      completedDate.setHours(0, 0, 0, 0);

      return completedDate.getTime() === yesterday.getTime();
    });

    if (completedYesterday) {
      habit.streak += 1;
    } else {
      habit.streak = 1;
    }

    if (habit.streak > habit.longestStreak) {
      habit.longestStreak = habit.streak;
    }

    await habit.save();

    res.status(200).json({
      message: "Habit marked as completed",
      habit,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// Update habit
const updateHabit = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, frequency } = req.body;

    const habit = await Habit.findById(id);

    if (!habit) {
      return res.status(404).json({
        message: "Habit not found",
      });
    }

    if (habit.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    if (title !== undefined) habit.title = title;
    if (description !== undefined) habit.description = description;
    if (frequency !== undefined) habit.frequency = frequency;

    const updatedHabit = await habit.save();

    res.status(200).json({
      message: "Habit updated successfully",
      habit: updatedHabit,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// Delete habit
const deleteHabit = async (req, res) => {
  try {
    const { id } = req.params;

    const habit = await Habit.findById(id);

    if (!habit) {
      return res.status(404).json({
        message: "Habit not found",
      });
    }

    if (habit.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await habit.deleteOne();

    res.status(200).json({
      message: "Habit deleted successfully",
    });
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
  completeHabit,
  updateHabit,
  deleteHabit,
};