import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./EventDetails.module.css";

const EventDetails = () => {
  const { id } = useParams(); // Get event ID from URL
  const [event, setEvent] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5001/api/event/getdetails/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setEvent(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load event details.");
      }
    };

    fetchEventDetails();
  }, [id, token]);

  if (error) return <p className={styles.error}>{error}</p>;
  if (!event) return <p className={styles.loading}>Loading event details...</p>;

  return (
    <div className={styles.container}>
      {/* Back button */}
      <button onClick={() => navigate(-1)} className={styles.backButton}>
        Back
      </button>

      {/* Event details */}
      <h2 className={styles.title}>{event.title}</h2>
      <p><strong>Description:</strong> {event.description}</p>
      <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
      <p><strong>Time:</strong> {event.startTime} - {event.endTime}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Created By:</strong> {event.createdBy || "Admin"}</p>
    </div>
  );
};

export default EventDetails;
