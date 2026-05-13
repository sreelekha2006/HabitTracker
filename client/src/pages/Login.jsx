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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f2e9ff] via-[#f8f5ff] to-[#ffeaf7] px-4">
      <div className="w-full max-w-md rounded-[2rem] bg-white/80 backdrop-blur-xl shadow-2xl shadow-purple-200/60 p-8 border border-white">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 h-16 w-16 rounded-3xl bg-gradient-to-br from-violet-500 to-pink-400 flex items-center justify-center text-white text-3xl shadow-lg">
            ✓
          </div>

          <h2 className="text-3xl font-extrabold text-slate-800">
            Welcome Back
          </h2>

          <p className="text-slate-500 mt-2">
            Continue building better habits
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full rounded-2xl border border-purple-100 bg-white px-5 py-4 outline-none focus:ring-4 focus:ring-purple-100"
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            className="w-full rounded-2xl border border-purple-100 bg-white px-5 py-4 outline-none focus:ring-4 focus:ring-purple-100"
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
          />

          <button className="w-full rounded-2xl bg-gradient-to-r from-violet-500 to-pink-400 py-4 font-bold text-white shadow-lg shadow-purple-300 hover:scale-[1.02] transition">
            Login
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center font-semibold text-pink-500">
            {message}
          </p>
        )}

        <p className="text-center mt-6 text-slate-500">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-violet-600 font-bold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;