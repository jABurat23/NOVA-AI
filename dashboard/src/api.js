import axios from "axios";

const API_BASE = "http://localhost:3000/api";

export async function getStats() {
  const res = await axios.get(`${API_BASE}/stats`);
  return res.data;
}

export async function getCommands() {
  const res = await axios.get(`${API_BASE}/commands`);
  return res.data;
}

export async function getSettings() {
  const res = await axios.get(`${API_BASE}/settings`);
  return res.data;
}
