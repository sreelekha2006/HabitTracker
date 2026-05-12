import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import HabitCard from "../components/HabitCard";

import {
  createHabit,
  getHabits,
  completeHabit,
  deleteHabit,
} from "../services/api";

function Dashboard() {
  const [habits, setHabits] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const fetchHabits = async () => {
    try {
      const res = await getHabits();
      setHabits(res.data);
    } catch (error) {
      setMessage("Failed to fetch habits");
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const handleAddHabit = async (e) => {
    e.preventDefault();

    try {
      await createHabit({
        title,
        description: "",
        frequency: "daily",
      });

      setTitle("");
      setMessage("Habit added successfully");

      fetchHabits();
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to add habit");
    }
  };

  const handleComplete = async (id) => {
    try {
      await completeHabit(id);
      setMessage("Habit completed");

      fetchHabits();
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to complete habit");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteHabit(id);
      setMessage("Habit deleted");

      fetchHabits();
    } catch (error) {
      setMessage("Failed to delete habit");
    }
  };

  return (
    <div className="container">
      <Navbar />

      <h2>Dashboard</h2>

      <form onSubmit={handleAddHabit}>
        <input
          type="text"
          placeholder="Enter habit title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button type="submit">Add Habit</button>
      </form>

      <p>{message}</p>

      <h3>Your Habits</h3>

      {habits.length === 0 ? (
        <p>No habits found</p>
      ) : (
        habits.map((habit) => (
          <HabitCard
            key={habit._id}
            habit={habit}
            onComplete={handleComplete}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
}

export default Dashboard;