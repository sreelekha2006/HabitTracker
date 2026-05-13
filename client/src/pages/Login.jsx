import { useState } from "react";
import { loginUser } from "../services/api";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f2e9ff] via-[#f8f5ff] to-[#ffeaf7] px-4 dark:from-[#0f172a] dark:via-[#111827] dark:to-[#1e293b]">
      <div className="w-full max-w-md rounded-[2rem] border border-white bg-white/80 p-8 shadow-2xl shadow-purple-200/60 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/75 dark:shadow-slate-950/50">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-500 to-pink-400 text-3xl text-white shadow-lg dark:shadow-violet-950/40">
            ✓
          </div>

          <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white">
            Welcome Back
          </h2>

          <p className="mt-2 text-slate-500 dark:text-slate-300">
            Continue building better habits
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full rounded-2xl border border-purple-100 bg-white px-5 py-4 outline-none focus:ring-4 focus:ring-purple-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400 dark:focus:ring-violet-900"
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            className="w-full rounded-2xl border border-purple-100 bg-white px-5 py-4 outline-none focus:ring-4 focus:ring-purple-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400 dark:focus:ring-violet-900"
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
          />

          <button className="w-full rounded-2xl bg-gradient-to-r from-violet-500 to-pink-400 py-4 font-bold text-white shadow-lg shadow-purple-300 transition hover:scale-[1.02] dark:shadow-violet-950/40">
            Login
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center font-semibold text-pink-500">
            {message}
          </p>
        )}

        <p className="mt-6 text-center text-slate-500 dark:text-slate-300">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="font-bold text-violet-600 dark:text-violet-300">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;