import axios from "axios";

const BASE_URL = "http://localhost:5001/api"; //where backend is running

// add interceptor to include token automatically
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Event APIs
export const getEvents = async () => {
  const res = await axiosInstance.get("/event/getevents");
  return res.data;
};

export const deleteEvent = async (eventId) => {
  await axiosInstance.delete(`/event/delete/${eventId}`);
};

export const createEvent = async (eventData) => {
  await axiosInstance.post("/event/create", eventData);
};

export const getDetails = async (eventId) => {
  const res = await axiosInstance.get(`/event/getdetails/${eventId}`);
  return res.data;
}

export const updateEvent = async (eventId, updatedFields) => {
  return await axiosInstance.put(`/event/update/${eventId}`, updatedFields);
}

// RSVP APIs
export const getUserRsvps = async () => {
  const res = await axiosInstance.get("/rsvp/getrsvp");
  return res.data;
};

export const getRsvpSummary = async (eventId) => {
  const res = await axiosInstance.get(`/rsvp/summary/${eventId}`);
  return res.data;
};

export const createRsvp = async (eventId, status) => {
  const res = await axiosInstance.post("/rsvp/create", { eventId, status });
  return res.data;
};