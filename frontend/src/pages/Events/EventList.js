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

  const role = localStorage.getItem("role"); // admin or user
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5001/api/event/getevents",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setEvents(res.data);
      } catch (err) {
        setError("Failed to fetch events.");
      }
    };
    fetchEvents();
  }, [token]);

  // Add new event (Admin)
  const addEvent = (event) => {
    setEvents([...events, event]);
    setShowForm(false);
  };

  // Delete event
  const handleDelete = async (eventId) => {
    try {
      await axios.delete(`http://localhost:5001/api/event/delete/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(events.filter((e) => e._id !== eventId));
    } catch {
      alert("Failed to delete event");
    }
  };

  // Edit event (redirect to edit page)
  const handleEdit = (event) => {
    navigate(`/admin/events/edit/${event._id}`);
  };

  // Navigate to event details page (for users)
  const handleViewDetails = (eventId) => {
    navigate(`/event/${eventId}`);
  };


  //RSVP
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
      <h2>{role === "admin" ? "Admin Event List" : "Upcoming Events"}</h2>
      {error && <p className={styles.error}>{error}</p>}

      {/* Admin create event button */}
      {role === "admin" && (
        <div className={styles.createButtonWrapper}>
          <button
            className={styles.createButton}
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cancel" : "Create New Event"}
          </button>
        </div>
      )}

      {/* Show create form if admin clicked */}
      {role === "admin" && showForm && <CreateEventForm addEvent={addEvent} />}

      <div className={styles.eventGrid}>
        {events.length === 0 && !error && <p>No events available.</p>}

        {events.map((event) => (
          <EventCard
            key={event._id}
            event={event}
            role={role}
            onEdit={role === "admin" ? handleEdit : null}
            onDelete={role === "admin" ? handleDelete : null}
            // onViewDetails={handleViewDetails}
            onRsvp={role === "user" ? handleRsvp : null}
          />
        ))}
      </div>
    </div>
  );
};

export default EventList;
