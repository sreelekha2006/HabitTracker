import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import MobileBottomNav from "../components/MobileBottomNav";

import { getHabits } from "../services/api";

function Profile() {
  const [habits, setHabits] = useState([]);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const res = await getHabits();
      setHabits(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  const totalHabits = habits.length;

  const totalPoints = habits.reduce(
    (sum, habit) => sum + habit.streak * 10,
    0
  );

  const longestStreak = habits.reduce(
    (max, habit) =>
      Math.max(max, habit.longestStreak || 0),
    0
  );

  const completedDays = habits.reduce(
    (sum, habit) =>
      sum + (habit.completedDates?.length || 0),
    0
  );

  const level =
    totalPoints >= 500
      ? "Legend 🚀"
      : totalPoints >= 200
      ? "Pro 🔥"
      : totalPoints >= 100
      ? "Advanced ⭐"
      : "Beginner 🌱";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f2e9ff] via-[#f8f5ff] to-[#ffeaf7] pb-24">
      <Navbar />

      <main className="mx-auto mt-8 w-[95%] max-w-6xl">
        {/* PROFILE CARD */}
        <motion.section
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="rounded-[2rem] border border-white bg-white/75 p-8 shadow-2xl shadow-purple-200/40 backdrop-blur-xl"
        >
          <div className="flex flex-col items-center text-center">
            {/* AVATAR */}
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-pink-400 text-5xl font-extrabold text-white shadow-2xl shadow-purple-300">
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>

            <h1 className="mt-6 text-4xl font-extrabold text-slate-800">
              {user?.name}
            </h1>

            <p className="mt-2 text-lg text-slate-500">
              Productivity Enthusiast ✨
            </p>

            <div className="mt-5 rounded-2xl bg-gradient-to-r from-violet-500 to-pink-400 px-6 py-3 font-bold text-white shadow-lg shadow-purple-200">
              {level}
            </div>
          </div>

          {/* STATS */}
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl bg-gradient-to-br from-violet-500 to-purple-400 p-6 text-white shadow-xl shadow-purple-200">
              <p className="text-sm opacity-80">Total Habits</p>

              <h2 className="mt-2 text-4xl font-extrabold">
                {totalHabits}
              </h2>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-pink-400 to-rose-400 p-6 text-white shadow-xl shadow-pink-200">
              <p className="text-sm opacity-80">Total Points</p>

              <h2 className="mt-2 text-4xl font-extrabold">
                {totalPoints}
              </h2>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-indigo-400 to-sky-400 p-6 text-white shadow-xl shadow-indigo-200">
              <p className="text-sm opacity-80">Longest Streak</p>

              <h2 className="mt-2 text-4xl font-extrabold">
                {longestStreak}
              </h2>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-emerald-400 to-teal-400 p-6 text-white shadow-xl shadow-emerald-200">
              <p className="text-sm opacity-80">Completed Days</p>

              <h2 className="mt-2 text-4xl font-extrabold">
                {completedDays}
              </h2>
            </div>
          </div>

          {/* SUMMARY */}
          <div className="mt-10 rounded-[2rem] bg-gradient-to-r from-indigo-50 to-pink-50 p-8">
            <h2 className="text-3xl font-extrabold text-slate-800">
              Your Progress Summary 📈
            </h2>

            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              You have completed{" "}
              <span className="font-bold text-violet-600">
                {completedDays}
              </span>{" "}
              habit days and earned{" "}
              <span className="font-bold text-pink-500">
                {totalPoints}
              </span>{" "}
              points. Your highest streak is{" "}
              <span className="font-bold text-indigo-500">
                {longestStreak}
              </span>{" "}
              days.
            </p>

            <p className="mt-4 text-slate-500">
              Keep going consistently to unlock more achievements
              and improve your productivity journey.
            </p>
          </div>

          {/* LOGOUT BUTTON */}
          <div className="mt-10 flex justify-center">
            <button
              onClick={handleLogout}
              className="rounded-2xl bg-gradient-to-r from-rose-400 to-pink-500 px-8 py-4 font-bold text-white shadow-xl shadow-pink-200 transition hover:scale-105"
            >
              Logout
            </button>
          </div>
        </motion.section>
      </main>

      <MobileBottomNav />
    </div>
  );
}

export default Profile;