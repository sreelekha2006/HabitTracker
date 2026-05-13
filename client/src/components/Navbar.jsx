import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="sticky top-4 z-50 mx-auto mt-4 w-[94%] max-w-6xl rounded-[2rem] border border-white/80 bg-white/70 px-5 py-4 shadow-xl shadow-purple-200/40 backdrop-blur-xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-2xl font-extrabold text-transparent">
            HabitFlow
          </h2>
          <p className="text-sm text-slate-500">
            Build habits. Track progress. Stay consistent.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/dashboard"
            className="rounded-2xl bg-violet-100 px-4 py-2 font-semibold text-violet-700 transition hover:bg-violet-200"
          >
            Dashboard
          </Link>

          <Link
            to="/analytics"
            className="rounded-2xl bg-pink-100 px-4 py-2 font-semibold text-pink-700 transition hover:bg-pink-200"
          >
            Analytics
          </Link>

          {user && (
            <span className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm">
              Hi, {user.name}
            </span>
          )}

          <button
            onClick={handleLogout}
            className="rounded-2xl bg-gradient-to-r from-violet-500 to-pink-400 px-5 py-2 font-bold text-white shadow-lg shadow-purple-200 transition hover:scale-105"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;