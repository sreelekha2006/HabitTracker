import { useState } from "react";
import { motion } from "framer-motion";

import HabitCalendar from "./HabitCalendar";

function HabitCard({ habit, onComplete, onUndoComplete, onToggleDate, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);

  const [editData, setEditData] = useState({
    title: habit.title,
    description: habit.description,
    frequency: habit.frequency,
  });

  const points = habit.streak * 10;

  let badge = "Beginner 🌱";

  if (habit.streak >= 30) {
    badge = "Habit Master 🏆";
  } else if (habit.streak >= 14) {
    badge = "Consistency King 👑";
  } else if (habit.streak >= 7) {
    badge = "On Fire 🔥";
  }

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    onUpdate(habit._id, editData);
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4 }}
      whileHover={{
        y: -6,
        transition: { duration: 0.2 },
      }}
      className="rounded-[2rem] border border-white bg-white/80 p-6 shadow-2xl shadow-purple-200/40 backdrop-blur-xl"
    >
      {isEditing ? (
        <div className="space-y-4">
          <input
            className="w-full rounded-2xl border border-purple-100 bg-white px-5 py-4 outline-none focus:ring-4 focus:ring-purple-100"
            type="text"
            name="title"
            value={editData.title}
            onChange={handleChange}
          />

          <input
            className="w-full rounded-2xl border border-purple-100 bg-white px-5 py-4 outline-none focus:ring-4 focus:ring-purple-100"
            type="text"
            name="description"
            value={editData.description}
            onChange={handleChange}
          />

          <select
            className="w-full rounded-2xl border border-purple-100 bg-white px-5 py-4 outline-none focus:ring-4 focus:ring-purple-100"
            name="frequency"
            value={editData.frequency}
            onChange={handleChange}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="flex-1 rounded-2xl bg-gradient-to-r from-violet-500 to-pink-400 py-3 font-bold text-white shadow-lg shadow-purple-200 transition hover:scale-105"
            >
              Save
            </button>

            <button
              onClick={() => setIsEditing(false)}
              className="flex-1 rounded-2xl bg-slate-200 py-3 font-bold text-slate-700 transition hover:scale-105"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-5 flex items-start justify-between gap-3">
            <div>
              <h3 className="text-2xl font-extrabold text-slate-800">
                {habit.title}
              </h3>

              <p className="mt-1 text-slate-500">
                {habit.description || "No description added"}
              </p>
            </div>

            <span className="rounded-2xl bg-violet-100 px-4 py-2 text-sm font-bold text-violet-700">
              {habit.frequency}
            </span>
          </div>

          <div className="mb-5 grid grid-cols-2 gap-3">
            <div className="rounded-3xl bg-gradient-to-br from-violet-500 to-purple-400 p-4 text-white shadow-lg shadow-purple-200">
              <p className="text-sm opacity-80">Current Streak</p>
              <h4 className="text-3xl font-extrabold">{habit.streak}</h4>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-pink-400 to-rose-400 p-4 text-white shadow-lg shadow-pink-200">
              <p className="text-sm opacity-80">Longest</p>
              <h4 className="text-3xl font-extrabold">
                {habit.longestStreak}
              </h4>
            </div>
          </div>

          <div className="mb-5 rounded-3xl bg-gradient-to-r from-indigo-50 to-pink-50 p-4">
            <p className="font-bold text-slate-700">🏆 {badge}</p>
            <p className="mt-1 text-sm text-slate-500">
              Points earned: {points}
            </p>
          </div>

          <HabitCalendar 
          completedDates={habit.completedDates} 
          onToggleDate={(date) => onToggleDate(habit._id, date)}
          />

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={() => onComplete(habit._id)}
              className="flex-1 rounded-2xl bg-gradient-to-r from-violet-500 to-pink-400 px-4 py-3 font-bold text-white shadow-lg shadow-purple-200 transition hover:scale-105"
            >
              Complete Today
            </button>

            <button
              onClick={() => onUndoComplete(habit._id)}
              className="rounded-2xl bg-amber-100 px-5 py-3 font-bold text-amber-700 transition hover:bg-amber-200"
            >
              Undo Today
            </button>

            <button
              onClick={() => setIsEditing(true)}
              className="rounded-2xl bg-violet-100 px-5 py-3 font-bold text-violet-700 transition hover:bg-violet-200"
            >
              Edit
            </button>

            <button
              onClick={() => onDelete(habit._id)}
              className="rounded-2xl bg-rose-100 px-5 py-3 font-bold text-rose-600 transition hover:bg-rose-200"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
}

export default HabitCard;