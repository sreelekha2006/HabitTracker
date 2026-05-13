import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import MobileBottomNav from "../components/MobileBottomNav";

import { getHabits } from "../services/api";

function Calendar() {
  const [habits, setHabits] = useState([]);
  const [view, setView] = useState(null);

  const currentDate = new Date();

  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

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

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const years = [];
  for (let y = 2023; y <= 2035; y++) years.push(y);

  const getCurrentWeekDates = () => {
    const today = new Date();
    const currentDay = today.getDay();
    const sunday = new Date(today);
    sunday.setDate(today.getDate() - currentDay);

    const week = [];

    for (let i = 0; i < 7; i++) {
      const day = new Date(sunday);
      day.setDate(sunday.getDate() + i);
      week.push(day);
    }

    return week;
  };

  const weeklyDates = getCurrentWeekDates();

  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();

  const monthDates = [];

  for (let i = 1; i <= daysInMonth; i++) {
    monthDates.push(new Date(selectedYear, selectedMonth, i));
  }

  const isCompleted = (habit, date) => {
    return habit.completedDates?.some((completedDate) => {
      const d1 = new Date(completedDate);
      d1.setHours(0, 0, 0, 0);

      const d2 = new Date(date);
      d2.setHours(0, 0, 0, 0);

      return d1.getTime() === d2.getTime();
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f2e9ff] via-[#f8f5ff] to-[#ffeaf7] pb-24 dark:from-[#0f172a] dark:via-[#111827] dark:to-[#1e293b]">
      <Navbar />

      <main className="mx-auto mt-8 w-[95%] max-w-7xl">
        <div className="rounded-[2rem] border border-white bg-white/75 p-8 shadow-2xl shadow-purple-200/40 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/70 dark:shadow-slate-950/40">
          <h1 className="text-4xl font-extrabold text-slate-800 dark:text-white">
            Habit Calendar 📅
          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-300">
            Track your weekly and monthly habit progress.
          </p>

          {view === null && (
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              <div
                onClick={() => setView("weekly")}
                className="cursor-pointer rounded-[2rem] bg-gradient-to-br from-violet-500 to-purple-400 p-12 text-white shadow-2xl shadow-purple-200 transition duration-300 hover:scale-105 hover:shadow-purple-300 dark:shadow-violet-950/40"
              >
                <h2 className="text-4xl font-extrabold">Weekly Progress</h2>

                <p className="mt-4 text-lg text-white/80">
                  View your current week's habit completion.
                </p>
              </div>

              <div
                onClick={() => setView("monthly")}
                className="cursor-pointer rounded-[2rem] bg-gradient-to-br from-pink-400 to-rose-400 p-12 text-white shadow-2xl shadow-pink-200 transition duration-300 hover:scale-105 hover:shadow-pink-300 dark:shadow-pink-950/40"
              >
                <h2 className="text-4xl font-extrabold">Monthly Progress</h2>

                <p className="mt-4 text-lg text-white/80">
                  View your complete monthly habit calendar.
                </p>
              </div>
            </div>
          )}

          {view === "weekly" && (
            <div className="mt-10">
              <button
                onClick={() => setView(null)}
                className="mb-8 rounded-2xl bg-violet-100 px-5 py-3 font-bold text-violet-700 transition hover:bg-violet-200 dark:bg-violet-950/60 dark:text-violet-300 dark:hover:bg-violet-900"
              >
                ← Back
              </button>

              <h2 className="mb-6 text-3xl font-extrabold text-slate-800 dark:text-white">
                Weekly Progress
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full border-separate border-spacing-3">
                  <thead>
                    <tr>
                      <th className="text-left text-slate-700 dark:text-slate-200">
                        Habit
                      </th>

                      {weeklyDates.map((date, index) => (
                        <th
                          key={index}
                          className="text-center text-sm text-slate-500 dark:text-slate-400"
                        >
                          {date.toLocaleDateString("en-US", {
                            weekday: "short",
                          })}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {habits.map((habit) => (
                      <tr key={habit._id}>
                        <td className="min-w-[180px] py-3 font-bold text-slate-700 dark:text-slate-200">
                          {habit.title}
                        </td>

                        {weeklyDates.map((date, index) => (
                          <td key={index}>
                            <div
                              className={`mx-auto h-10 w-10 rounded-2xl border-2 ${
                                isCompleted(habit, date)
                                  ? "border-violet-500 bg-gradient-to-br from-violet-500 to-pink-400 shadow-lg shadow-purple-200 dark:shadow-violet-950/40"
                                  : "border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800"
                              }`}
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {view === "monthly" && (
            <div className="mt-10">
              <button
                onClick={() => setView(null)}
                className="mb-8 rounded-2xl bg-pink-100 px-5 py-3 font-bold text-pink-700 transition hover:bg-pink-200 dark:bg-pink-950/60 dark:text-pink-300 dark:hover:bg-pink-900"
              >
                ← Back
              </button>

              <h2 className="mb-6 text-3xl font-extrabold text-slate-800 dark:text-white">
                Monthly Progress
              </h2>

              <div className="mb-8 flex flex-wrap gap-4">
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(Number(e.target.value))}
                  className="rounded-2xl border border-purple-100 bg-white px-5 py-3 font-semibold text-slate-700 outline-none focus:ring-4 focus:ring-purple-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-violet-900"
                >
                  {months.map((month, index) => (
                    <option key={index} value={index}>
                      {month}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="rounded-2xl border border-purple-100 bg-white px-5 py-3 font-semibold text-slate-700 outline-none focus:ring-4 focus:ring-purple-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-violet-900"
                >
                  {years.map((year) => (
                    <option key={year}>{year}</option>
                  ))}
                </select>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-separate border-spacing-2">
                  <thead>
                    <tr>
                      <th className="text-left text-slate-700 dark:text-slate-200">
                        Habit
                      </th>

                      {monthDates.map((date, index) => (
                        <th
                          key={index}
                          className="text-center text-xs text-slate-500 dark:text-slate-400"
                        >
                          {date.getDate()}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {habits.map((habit) => (
                      <tr key={habit._id}>
                        <td className="min-w-[180px] py-3 font-bold text-slate-700 dark:text-slate-200">
                          {habit.title}
                        </td>

                        {monthDates.map((date, index) => (
                          <td key={index}>
                            <div
                              className={`mx-auto h-6 w-6 rounded-full border-2 ${
                                isCompleted(habit, date)
                                  ? "border-violet-500 bg-gradient-to-br from-violet-500 to-pink-400 shadow-md shadow-purple-200 dark:shadow-violet-950/40"
                                  : "border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800"
                              }`}
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      <MobileBottomNav />
    </div>
  );
}

export default Calendar;