const Habit = require("../models/Habit");

// Helper: normalize date to start of day
const normalizeDate = (date) => {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);
  return normalized;
};

// Helper: check same day
const isSameDay = (date1, date2) => {
  return normalizeDate(date1).getTime() === normalizeDate(date2).getTime();
};

// Helper: recalculate streaks from completedDates
const recalculateStreaks = (completedDates) => {
  if (!completedDates || completedDates.length === 0) {
    return {
      streak: 0,
      longestStreak: 0,
    };
  }

  const uniqueDates = [
    ...new Set(
      completedDates.map((date) => normalizeDate(date).getTime())
    ),
  ].sort((a, b) => a - b);

  let longestStreak = 1;
  let tempStreak = 1;

  for (let i = 1; i < uniqueDates.length; i++) {
    const diffInDays =
      (uniqueDates[i] - uniqueDates[i - 1]) / (1000 * 60 * 60 * 24);

    if (diffInDays === 1) {
      tempStreak += 1;
    } else {
      tempStreak = 1;
    }

    longestStreak = Math.max(longestStreak, tempStreak);
  }

  const today = normalizeDate(new Date()).getTime();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayTime = yesterday.getTime();

  let streak = 0;
  let checkDate = uniqueDates[uniqueDates.length - 1];

  if (checkDate === today || checkDate === yesterdayTime) {
    streak = 1;

    for (let i = uniqueDates.length - 2; i >= 0; i--) {
      const diffInDays =
        (checkDate - uniqueDates[i]) / (1000 * 60 * 60 * 24);

      if (diffInDays === 1) {
        streak += 1;
        checkDate = uniqueDates[i];
      } else {
        break;
      }
    }
  }

  return {
    streak,
    longestStreak,
  };
};

// Create habit
const createHabit = async (req, res) => {
  try {
    const {
  title,
  description,
  frequency,
  reminderTime,
} = req.body;

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
      reminderTime,
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

// Complete habit for today
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

    const today = normalizeDate(new Date());

    const alreadyCompleted = habit.completedDates.some((date) =>
      isSameDay(date, today)
    );

    if (alreadyCompleted) {
      return res.status(400).json({
        message: "Habit already completed today",
      });
    }

    habit.completedDates.push(today);

    const streakData = recalculateStreaks(habit.completedDates);
    habit.streak = streakData.streak;
    habit.longestStreak = streakData.longestStreak;

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

// Undo today's completion
const undoCompleteHabit = async (req, res) => {
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

    const today = normalizeDate(new Date());

    const todayCompleted = habit.completedDates.some((date) =>
      isSameDay(date, today)
    );

    if (!todayCompleted) {
      return res.status(400).json({
        message: "Habit is not completed today",
      });
    }

    habit.completedDates = habit.completedDates.filter(
      (date) => !isSameDay(date, today)
    );

    const streakData = recalculateStreaks(habit.completedDates);
    habit.streak = streakData.streak;
    habit.longestStreak = streakData.longestStreak;

    await habit.save();

    res.status(200).json({
      message: "Today's completion removed",
      habit,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// Toggle completion for selected date
const toggleHabitDate = async (req, res) => {
  try {
    const { id } = req.params;
    const { date } = req.body;

    if (!date) {
      return res.status(400).json({
        message: "Date is required",
      });
    }

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

    const selectedDate = normalizeDate(date);
    const today = normalizeDate(new Date());

    if (selectedDate > today) {
      return res.status(400).json({
        message: "You cannot mark future dates",
      });
    }

    const alreadyCompleted = habit.completedDates.some((completedDate) =>
      isSameDay(completedDate, selectedDate)
    );

    if (alreadyCompleted) {
      habit.completedDates = habit.completedDates.filter(
        (completedDate) => !isSameDay(completedDate, selectedDate)
      );
    } else {
      habit.completedDates.push(selectedDate);
    }

    const streakData = recalculateStreaks(habit.completedDates);
    habit.streak = streakData.streak;
    habit.longestStreak = streakData.longestStreak;

    await habit.save();

    res.status(200).json({
      message: alreadyCompleted
        ? "Selected date marked as incomplete"
        : "Selected date marked as complete",
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
    const {
  title,
  description,
  frequency,
  reminderTime,
} = req.body;

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
    if (reminderTime !== undefined) habit.reminderTime = reminderTime;

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
  undoCompleteHabit,
  toggleHabitDate,
  updateHabit,
  deleteHabit,
};