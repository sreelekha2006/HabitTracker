import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export const registerUser = (userData) => {
  return API.post("/auth/register", userData);
};

export const loginUser = (userData) => {
  return API.post("/auth/login", userData);
};

export const createHabit = (habitData) => {
  return API.post("/habits", habitData);
};

export const getHabits = () => {
  return API.get("/habits");
};

export const completeHabit = (id) => {
  return API.put(`/habits/${id}/complete`);
};

export const deleteHabit = (id) => {
  return API.delete(`/habits/${id}`);
};

export const updateHabit = (id, habitData) => {
  return API.put(`/habits/${id}`, habitData);
};

export const undoCompleteHabit = (id) => {
  return API.put(`/habits/${id}/undo-complete`);
};