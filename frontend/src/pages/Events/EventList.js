import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../../components/EventCard";
import CreateEventForm from "../../components/CreateEventForm";
import styles from "./EventList.module.css";
import { useNavigate } from "react-router-dom";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [rsvpSummary, setRsvpSummary] = useState({}); // store RSVP summaries

  const role = localStorage.getItem("role"); // "Admin" or "User"
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/event/getevents",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setEvents(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch events.");
      }
    };
    fetchEvents();
  }, [token]);

  // ---- ADMIN LOGIC ----

  // Add event
  const addEvent = (event) => {
    setEvents([...events, event]);
    setShowForm(false);
  };

  // Delete event
  const handleDelete = async (eventId) => {
    try {
      await axios.delete(`http://localhost:5001/api/event/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(events.filter((e) => e._id !== eventId));
    } catch (err) {
      console.error(err);
      alert("Failed to delete event");
    }
  };

  // Edit event
  const handleEdit = (event) => {
    navigate(`/admin/events/edit/${event._id}`);
  };

  // Fetch RSVP summary for an event
  const handleViewSummary = async (eventId) => {
    try {
      const res = await axios.get(
        `http://localhost:5001/api/rsvp/summary/${eventId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRsvpSummary((prev) => ({ ...prev, [eventId]: res.data.summary }));
    } catch (err) {
      console.error("Error fetching RSVP summary:", err);
      alert("Failed to fetch RSVP summary");
    }
  };

  // ---- USER LOGIC ----

  const handleRsvp = async (eventId, status) => {
    try {
      await axios.post(
        "http://localhost:5001/api/rsvp/create",
        { eventId, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`RSVP "${status}" submitted successfully!`);
    } catch (err) {
      console.error(err);
      alert("Failed to submit RSVP");
    }
  };

  return (
    <div className={styles.container}>
      <h2>{role === "Admin" ? "Admin Event List" : "Upcoming Events"}</h2>
      {error && <p className={styles.error}>{error}</p>}

      {/* Admin can create new event */}
      {role === "Admin" && (
        <div className={styles.createButtonWrapper}>
          <button
            className={styles.createButton}
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cancel" : "Create New Event"}
          </button>
        </div>
      )}

      {role === "Admin" && showForm && (
        <CreateEventForm addEvent={addEvent} onCancel={() => setShowForm(false)} />
      )}

      <div className={styles.eventGrid}>
        {events.length === 0 && !error && <p>No events available.</p>}
        {events.map((event) => (
          <div key={event._id} className={styles.eventWrapper}>
            <EventCard
              key={event._id}
              event={event}
              role={role}
              onEdit={role === "Admin" ? handleEdit : null}
              onDelete={role === "Admin" ? handleDelete : null}
              onViewSummary={role === "Admin" ? handleViewSummary : null}
              onRsvp={role === "User" ? handleRsvp : null}
            />

            {/* Show RSVP summary button only for Admin */}
            {role === "Admin" && (
              <div className={styles.summarySection}>
                <button
                  className={styles.summaryButton}
                  onClick={() => handleViewSummary(event._id)}
                >
                  View RSVP Summary
                </button>

                {rsvpSummary[event._id] && (
                  <div className={styles.summaryBox}>
                    <p>Going: {rsvpSummary[event._id].Going || 0}</p>
                    <p>Maybe: {rsvpSummary[event._id].Maybe || 0}</p>
                    <p>Declined: {rsvpSummary[event._id].Decline || 0}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
