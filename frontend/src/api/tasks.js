import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/tasks/";

export const getTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addTask = async (task) => {
  const response = await axios.post(API_URL, task);
  return response.data;
};

export const updateTask = async (taskId, updatedTask) => {
  const response = await axios.put(`${API_URL}${taskId}/`, updatedTask);
  return response.data;
};

export const deleteTask = async (taskId) => {
  if (window.confirm("Are you sure you want to delete this task?")) {
    await axios.delete(`${API_URL}${taskId}/`);
  }
};
