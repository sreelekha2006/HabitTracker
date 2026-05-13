import { Link } from "react-router-dom";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="sticky top-4 z-50 mx-auto mt-4 w-[95%] max-w-7xl rounded-[2rem] border border-white bg-white/70 p-5 shadow-2xl shadow-purple-200/30 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/75 dark:shadow-slate-950/40">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-3xl font-extrabold text-transparent">
            HabitFlow
          </h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">
            Build consistency every day
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link to="/dashboard">
            <button className="rounded-2xl bg-white/70 px-6 py-3 font-bold text-slate-700 shadow-md transition hover:scale-105 hover:bg-white dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700">
              Dashboard
            </button>
          </Link>

          <Link to="/analytics">
            <button className="rounded-2xl bg-white/70 px-6 py-3 font-bold text-slate-700 shadow-md transition hover:scale-105 hover:bg-white dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700">
              Analytics
            </button>
          </Link>

          <Link to="/calendar">
            <button className="rounded-2xl bg-white/70 px-6 py-3 font-bold text-slate-700 shadow-md transition hover:scale-105 hover:bg-white dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700">
              Calendar
            </button>
          </Link>

          <Link to="/achievements">
            <button className="rounded-2xl bg-white/70 px-6 py-3 font-bold text-slate-700 shadow-md transition hover:scale-105 hover:bg-white dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700">
              Achievements
            </button>
          </Link>

          <Link to="/profile">
            <button className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-pink-400 text-xl font-extrabold text-white shadow-lg shadow-purple-200 transition hover:scale-110 dark:shadow-violet-900/40">
              {user?.name?.charAt(0)?.toUpperCase()}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;