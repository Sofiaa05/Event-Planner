import React, { useState } from "react";
import axios from "axios";
import styles from "./CreateEventForm.module.css";

const CreateEventForm = ({ addEvent }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
  });

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5001/api/event/create",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      addEvent(res.data.event);
    } catch (err) {
      alert("Failed to create event");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Event Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
      />
      <input
        type="time"
        name="startTime"
        value={formData.startTime}
        onChange={handleChange}
        required
      />
      <input
        type="time"
        name="endTime"
        value={formData.endTime}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        required
      />
      <button type="submit">Create Event</button>
    </form>
  );
};

export default CreateEventForm;
