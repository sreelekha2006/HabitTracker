import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Navbar from "../components/Navbar";
import MobileBottomNav from "../components/MobileBottomNav";

import { getHabits } from "../services/api";

function Achievements() {
  const [habits, setHabits] = useState([]);

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

  const totalPoints = habits.reduce(
    (sum, habit) => sum + habit.streak * 10,
    0
  );

  const longestStreak = habits.reduce(
    (max, habit) => Math.max(max, habit.longestStreak || 0),
    0
  );

  const achievements = [
    {
      title: "First Step 🌱",
      description: "Complete your first habit",
      unlocked: totalPoints >= 10,
    },
    {
      title: "Consistency Starter 🔥",
      description: "Reach 7 day streak",
      unlocked: longestStreak >= 7,
    },
    {
      title: "Focused Warrior ⚡",
      description: "Earn 100 points",
      unlocked: totalPoints >= 100,
    },
    {
      title: "Discipline Master 👑",
      description: "Reach 30 day streak",
      unlocked: longestStreak >= 30,
    },
    {
      title: "Legendary Achiever 🚀",
      description: "Earn 500 points",
      unlocked: totalPoints >= 500,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f2e9ff] via-[#f8f5ff] to-[#ffeaf7] pb-24 dark:from-[#0f172a] dark:via-[#111827] dark:to-[#1e293b]">
      <Navbar />

      <main className="mx-auto mt-8 w-[95%] max-w-6xl">
        <motion.section
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="rounded-[2rem] border border-white bg-white/75 p-8 shadow-2xl shadow-purple-200/40 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/70 dark:shadow-slate-950/40"
        >
          <h1 className="text-4xl font-extrabold text-slate-800 dark:text-white">
            Achievements 🏆
          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-300">
            Unlock milestones and track your productivity journey.
          </p>

          {/* OVERVIEW */}
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-3xl bg-gradient-to-br from-violet-500 to-purple-400 p-6 text-white shadow-xl shadow-purple-200 dark:shadow-violet-950/40">
              <p className="text-sm opacity-80">Total Points</p>

              <h2 className="mt-2 text-4xl font-extrabold">
                {totalPoints}
              </h2>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-pink-400 to-rose-400 p-6 text-white shadow-xl shadow-pink-200 dark:shadow-pink-950/40">
              <p className="text-sm opacity-80">Longest Streak</p>

              <h2 className="mt-2 text-4xl font-extrabold">
                {longestStreak}
              </h2>
            </div>
          </div>

          {/* ACHIEVEMENTS GRID */}
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.04 }}
                className={`rounded-[2rem] border p-6 shadow-xl transition ${
                  achievement.unlocked
                    ? "border-violet-200 bg-gradient-to-br from-violet-500 to-pink-400 text-white shadow-purple-200 dark:shadow-violet-950/40"
                    : "border-slate-200 bg-white text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                <div className="text-5xl">
                  {achievement.unlocked ? "🏆" : "🔒"}
                </div>

                <h2 className="mt-5 text-2xl font-extrabold">
                  {achievement.title}
                </h2>

                <p className="mt-3 leading-relaxed opacity-90">
                  {achievement.description}
                </p>

                <div className="mt-5">
                  {achievement.unlocked ? (
                    <span className="rounded-2xl bg-white/20 px-4 py-2 text-sm font-bold">
                      Unlocked
                    </span>
                  ) : (
                    <span className="rounded-2xl bg-slate-200 px-4 py-2 text-sm font-bold text-slate-600 dark:bg-slate-700 dark:text-slate-200">
                      Locked
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>

      <MobileBottomNav />
    </div>
  );
}

export default Achievements;