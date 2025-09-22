import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./EditEvent.module.css";
import { getDetails, updateEvent } from "../../api/api";
import Navbar from "../../components/NavBar";

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");

  // Load event details on page load
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getDetails(id);

        setTitle(data.title || "");
        setDescription(data.description || "");
        setDate(data.date ? data.date.split("T")[0] : "");
        setStartTime(data.startTime || "");
        setEndTime(data.endTime || "");
        setLocation(data.location || "");
      } catch (err) {
        console.error("Error fetching event:", err);
      }
    };

    fetchEvent();
  }, [id, token]);

  // Submit updated fields only
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFields = {};
    if (title) updatedFields.title = title;
    if (description) updatedFields.description = description;
    if (date) updatedFields.date = date;
    if (startTime) updatedFields.startTime = startTime;
    if (endTime) updatedFields.endTime = endTime;
    if (location) updatedFields.location = location;

    try {
      await updateEvent(id, updatedFields);
      alert("Event updated successfully!");
      navigate("/getEvents");
    } catch (err) {
      console.error("Error updating event:", err);
      alert("Failed to update event");
    }
  };

  return (
    <>
      <Navbar />
  
    <form className={styles.editForm} onSubmit={handleSubmit}>
      <h2>Edit Event</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />
      <input
        type="time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <div className={styles.buttonGroup}>
        <button type="submit">Update Event</button>
        <button type="button" onClick={() => navigate("/getEvents")}>
          Cancel
        </button>
      </div>
    </form>
  </>
  );
};

export default EditEvent;
