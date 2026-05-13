import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import { getHabits } from "../services/api";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function Analytics() {
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

  const totalHabits = habits.length;

  const totalPoints = habits.reduce(
    (sum, habit) => sum + habit.streak * 10,
    0
  );

  const chartData = habits.map((habit) => ({
    name: habit.title,
    streak: habit.streak,
    longest: habit.longestStreak,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f2e9ff] via-[#f8f5ff] to-[#ffeaf7] pb-12">
      <Navbar />

      <main className="mx-auto mt-8 w-[94%] max-w-6xl">
        <section className="rounded-[2rem] bg-white/70 p-8 shadow-2xl shadow-purple-200/40 backdrop-blur-xl border border-white">
          <h1 className="text-4xl font-extrabold text-slate-800">
            Analytics Dashboard 📊
          </h1>

          <p className="mt-2 text-slate-500">
            Track your consistency and productivity growth.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-gradient-to-br from-violet-500 to-purple-400 p-5 text-white shadow-lg shadow-purple-200">
              <p className="text-sm opacity-80">Total Habits</p>
              <h2 className="mt-2 text-3xl font-extrabold">
                {totalHabits}
              </h2>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-pink-400 to-rose-400 p-5 text-white shadow-lg shadow-pink-200">
              <p className="text-sm opacity-80">Total Points</p>
              <h2 className="mt-2 text-3xl font-extrabold">
                {totalPoints}
              </h2>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-indigo-400 to-sky-400 p-5 text-white shadow-lg shadow-indigo-200">
              <p className="text-sm opacity-80">Active Habits</p>
              <h2 className="mt-2 text-3xl font-extrabold">
                {habits.length}
              </h2>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] bg-white/75 p-8 shadow-2xl shadow-purple-200/30 backdrop-blur-xl border border-white">
          <div className="mb-6">
            <h2 className="text-3xl font-extrabold text-slate-800">
              Habit Progress
            </h2>

            <p className="mt-2 text-slate-500">
              Compare streak performance across all habits.
            </p>
          </div>

          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#ece7ff"
                />

                <XAxis
                  dataKey="name"
                  tick={{ fill: "#64748b" }}
                />

                <YAxis tick={{ fill: "#64748b" }} />

                <Tooltip
                  contentStyle={{
                    borderRadius: "16px",
                    border: "none",
                    backgroundColor: "#ffffff",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  }}
                />

                <Bar
                  dataKey="streak"
                  radius={[12, 12, 0, 0]}
                  fill="#8b5cf6"
                />

                <Bar
                  dataKey="longest"
                  radius={[12, 12, 0, 0]}
                  fill="#ec4899"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Analytics;