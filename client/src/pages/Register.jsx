import { useState } from "react";
import { registerUser } from "../services/api";
import { Link } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
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
      const res = await registerUser(formData);

      setMessage(res.data.message);

      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f2e9ff] via-[#f8f5ff] to-[#ffeaf7] px-4">
      <div className="w-full max-w-md rounded-[2rem] bg-white/80 backdrop-blur-xl shadow-2xl shadow-pink-200/60 p-8 border border-white">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 h-16 w-16 rounded-3xl bg-gradient-to-br from-pink-400 to-violet-500 flex items-center justify-center text-white text-3xl shadow-lg">
            ★
          </div>

          <h2 className="text-3xl font-extrabold text-slate-800">
            Create Account
          </h2>

          <p className="text-slate-500 mt-2">
            Start your productivity journey
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full rounded-2xl border border-purple-100 bg-white px-5 py-4 outline-none focus:ring-4 focus:ring-purple-100"
            type="text"
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
          />

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

          <button className="w-full rounded-2xl bg-gradient-to-r from-pink-400 to-violet-500 py-4 font-bold text-white shadow-lg shadow-pink-200 hover:scale-[1.02] transition">
            Register
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center font-semibold text-pink-500">
            {message}
          </p>
        )}

        <p className="text-center mt-6 text-slate-500">
          Already have an account?{" "}
          <Link to="/" className="text-violet-600 font-bold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;