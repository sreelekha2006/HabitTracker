import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Navbar from "../components/Navbar";
import { getHabits } from "../services/api";
import MobileBottomNav from "../components/MobileBottomNav";

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

  const totalPoints = habits.reduce((sum, habit) => sum + habit.streak * 10, 0);
  const longestStreak = habits.reduce(
    (max, habit) => Math.max(max, habit.longestStreak || 0),
    0
  );
  const totalCompleted = habits.reduce(
    (sum, habit) => sum + (habit.completedDates?.length || 0),
    0
  );

  const achievements = [
    {
      title: "First Step",
      description: "Complete any habit at least once",
      icon: "🌱",
      unlocked: totalCompleted >= 1,
    },
    {
      title: "On Fire",
      description: "Reach a 7-day streak",
      icon: "🔥",
      unlocked: longestStreak >= 7,
    },
    {
      title: "Consistency King",
      description: "Reach a 14-day streak",
      icon: "👑",
      unlocked: longestStreak >= 14,
    },
    {
      title: "Habit Master",
      description: "Reach a 30-day streak",
      icon: "🏆",
      unlocked: longestStreak >= 30,
    },
    {
      title: "100 Points Club",
      description: "Earn 100 total points",
      icon: "💎",
      unlocked: totalPoints >= 100,
    },
    {
      title: "500 Points Legend",
      description: "Earn 500 total points",
      icon: "🚀",
      unlocked: totalPoints >= 500,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f2e9ff] via-[#f8f5ff] to-[#ffeaf7] pb-12">
      <Navbar />

      <main className="mx-auto mt-8 w-[95%] max-w-7xl">
        <section className="rounded-[2rem] border border-white bg-white/75 p-8 shadow-2xl shadow-purple-200/40 backdrop-blur-xl">
          <h1 className="text-4xl font-extrabold text-slate-800">
            Achievements 🏆
          </h1>

          <p className="mt-2 text-slate-500">
            Unlock badges as you build stronger habits.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-gradient-to-br from-violet-500 to-purple-400 p-5 text-white shadow-lg shadow-purple-200">
              <p className="text-sm opacity-80">Total Points</p>
              <h2 className="mt-2 text-3xl font-extrabold">{totalPoints}</h2>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-pink-400 to-rose-400 p-5 text-white shadow-lg shadow-pink-200">
              <p className="text-sm opacity-80">Longest Streak</p>
              <h2 className="mt-2 text-3xl font-extrabold">
                {longestStreak}
              </h2>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-indigo-400 to-sky-400 p-5 text-white shadow-lg shadow-indigo-200">
              <p className="text-sm opacity-80">Completed Days</p>
              <h2 className="mt-2 text-3xl font-extrabold">
                {totalCompleted}
              </h2>
            </div>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className={`rounded-[2rem] border p-6 shadow-xl backdrop-blur-xl ${
                  achievement.unlocked
                    ? "border-white bg-white/85 shadow-purple-200/40"
                    : "border-slate-200 bg-white/45 opacity-60"
                }`}
              >
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-500 to-pink-400 text-3xl shadow-lg shadow-purple-200">
                  {achievement.icon}
                </div>

                <h3 className="text-2xl font-extrabold text-slate-800">
                  {achievement.title}
                </h3>

                <p className="mt-2 text-slate-500">
                  {achievement.description}
                </p>

                <div
                  className={`mt-5 inline-block rounded-2xl px-4 py-2 text-sm font-bold ${
                    achievement.unlocked
                      ? "bg-violet-100 text-violet-700"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {achievement.unlocked ? "Unlocked" : "Locked"}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <MobileBottomNav />
    </div>
  );
}

export default Achievements;