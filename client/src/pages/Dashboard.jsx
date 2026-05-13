import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Navbar from "../components/Navbar";
import HabitCard from "../components/HabitCard";
import MobileBottomNav from "../components/MobileBottomNav";

import {
  createHabit,
  getHabits,
  completeHabit,
  undoCompleteHabit,
  toggleHabitDate,
  deleteHabit,
  updateHabit,
} from "../services/api";

function Dashboard() {
  const [habits, setHabits] = useState([]);
  const [title, setTitle] = useState("");
  const [reminderTime, setReminderTime] = useState("");
  const [message, setMessage] = useState("");

  const fetchHabits = async () => {
    try {
      const res = await getHabits();
      setHabits(res.data);
    } catch (error) {
      setMessage("Failed to fetch habits");
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const handleAddHabit = async (e) => {
    e.preventDefault();

    try {
      await createHabit({
        title,
        description: "",
        frequency: "daily",
        reminderTime,
      });

      setTitle("");
      setReminderTime("");
      setMessage("Habit added successfully");
      fetchHabits();
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to add habit");
    }
  };

  const handleComplete = async (id) => {
    try {
      await completeHabit(id);
      setMessage("Habit completed");
      fetchHabits();
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to complete habit");
    }
  };

  const handleUndoComplete = async (id) => {
    try {
      await undoCompleteHabit(id);
      setMessage("Today's completion removed");
      fetchHabits();
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to undo completion");
    }
  };

  const handleToggleDate = async (id, date) => {
    try {
      await toggleHabitDate(id, date);
      setMessage("Selected date updated");
      fetchHabits();
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to update date");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteHabit(id);
      setMessage("Habit deleted");
      fetchHabits();
    } catch (error) {
      setMessage("Failed to delete habit");
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      await updateHabit(id, updatedData);
      setMessage("Habit updated successfully");
      fetchHabits();
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to update habit");
    }
  };

  const totalHabits = habits.length;

  const completedToday = habits.filter((habit) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return habit.completedDates?.some((date) => {
      const completedDate = new Date(date);
      completedDate.setHours(0, 0, 0, 0);
      return completedDate.getTime() === today.getTime();
    });
  }).length;

  const totalPoints = habits.reduce((sum, habit) => sum + habit.streak * 10, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f2e9ff] via-[#f8f5ff] to-[#ffeaf7] pb-24">
      <Navbar />

      <main className="mx-auto mt-8 w-[94%] max-w-6xl">
        <motion.section
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 rounded-[2rem] bg-white/70 p-8 shadow-2xl shadow-purple-200/40 backdrop-blur-xl border border-white"
        >
          <h1 className="text-4xl font-extrabold text-slate-800">
            Your Habit Dashboard ✨
          </h1>

          <p className="mt-2 text-slate-500">
            Track routines, build streaks, and stay consistent every day.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-gradient-to-br from-violet-500 to-purple-400 p-5 text-white shadow-lg shadow-purple-200">
              <p className="text-sm opacity-80">Total Habits</p>
              <h2 className="mt-2 text-3xl font-extrabold">{totalHabits}</h2>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-pink-400 to-rose-400 p-5 text-white shadow-lg shadow-pink-200">
              <p className="text-sm opacity-80">Completed Today</p>
              <h2 className="mt-2 text-3xl font-extrabold">
                {completedToday}
              </h2>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-indigo-400 to-sky-400 p-5 text-white shadow-lg shadow-indigo-200">
              <p className="text-sm opacity-80">Total Points</p>
              <h2 className="mt-2 text-3xl font-extrabold">{totalPoints}</h2>
            </div>
          </div>
        </motion.section>

        <section className="mb-8 rounded-[2rem] bg-white/75 p-6 shadow-xl shadow-purple-200/30 backdrop-blur-xl border border-white">
          <h2 className="mb-4 text-2xl font-extrabold text-slate-800">
            Add New Habit
          </h2>

          <form
            onSubmit={handleAddHabit}
            className="flex flex-col gap-4 md:flex-row"
          >
            <input
              className="flex-1 rounded-2xl border border-purple-100 bg-white px-5 py-4 outline-none focus:ring-4 focus:ring-purple-100"
              type="text"
              placeholder="Example: Drink water, Study DSA..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              className="rounded-2xl border border-purple-100 bg-white px-5 py-4 outline-none focus:ring-4 focus:ring-purple-100"
              type="time"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
            />

            <button className="rounded-2xl bg-gradient-to-r from-violet-500 to-pink-400 px-8 py-4 font-bold text-white shadow-lg shadow-purple-200 transition hover:scale-105">
              Add Habit
            </button>
          </form>

          {message && (
            <p className="mt-4 font-semibold text-violet-600">{message}</p>
          )}
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-extrabold text-slate-800">
            Your Habits
          </h2>

          {habits.length === 0 ? (
            <div className="rounded-[2rem] bg-white/75 p-8 text-center shadow-xl shadow-purple-200/30 backdrop-blur-xl border border-white">
              <p className="text-slate-500">
                No habits yet. Add your first habit above.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {habits.map((habit) => (
                <HabitCard
                  key={habit._id}
                  habit={habit}
                  onComplete={handleComplete}
                  onUndoComplete={handleUndoComplete}
                  onToggleDate={handleToggleDate}
                  onDelete={handleDelete}
                  onUpdate={handleUpdate}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <MobileBottomNav />
    </div>
  );
}

export default Dashboard;