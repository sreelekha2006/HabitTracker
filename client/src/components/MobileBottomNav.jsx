import { Link } from "react-router-dom";

function MobileBottomNav() {
  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-[92%] max-w-md -translate-x-1/2 rounded-[2rem] border border-white bg-white/80 px-4 py-3 shadow-2xl shadow-purple-200/50 backdrop-blur-xl lg:hidden dark:border-slate-700 dark:bg-slate-900/85 dark:shadow-slate-950/50">
      <div className="flex items-center justify-between">
        <Link
          to="/dashboard"
          className="text-center text-xs font-bold text-slate-600 dark:text-slate-300"
        >
          🏠
          <br />
          Home
        </Link>

        <Link
          to="/analytics"
          className="text-center text-xs font-bold text-slate-600 dark:text-slate-300"
        >
          📊
          <br />
          Stats
        </Link>

        <Link
          to="/calendar"
          className="text-center text-xs font-bold text-slate-600 dark:text-slate-300"
        >
          📅
          <br />
          Calendar
        </Link>

        <Link
          to="/achievements"
          className="text-center text-xs font-bold text-slate-600 dark:text-slate-300"
        >
          🏆
          <br />
          Awards
        </Link>

        <Link
          to="/profile"
          className="text-center text-xs font-bold text-slate-600 dark:text-slate-300"
        >
          👤
          <br />
          Profile
        </Link>
      </div>
    </div>
  );
}

export default MobileBottomNav;