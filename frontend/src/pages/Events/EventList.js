import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../../components/EventCard";
import CreateEventForm from "../../components/CreateEventForm";
import styles from "./EventList.module.css";
import { useNavigate } from "react-router-dom";

const EventList = () => {
  // state to store events fetched from backend
  const [events, setEvents] = useState([]);

  // state to store any error messages
  const [error, setError] = useState("");

  // State to show/hide the create event form (admin only)
  const [showForm, setShowForm] = useState(false);

  // get role and token from localStorage
  const role = localStorage.getItem("role"); // "admin" or "user"
  const token = localStorage.getItem("token");
  const navigate = useNavigate(); // to navigate programmatically

  // useEffect runs once after component mounts
  // fetch events and rsvp ingo
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Fetch all events from backend
        const eventsRes = await axios.get(
          "http://localhost:5001/api/event/getevents",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        let eventsData = eventsRes.data;

        if (role === "user") {
          // ff logged in as a user, also fetch user's rsvp
          const rsvpsRes = await axios.get(
            "http://localhost:5001/api/rsvp/getrsvp",
            { headers: { Authorization: `Bearer ${token}` } }
          );

          const rsvpsData = rsvpsRes.data;

          // Combine events with user's RSVP status
          eventsData = eventsData.map((event) => {
            const userRsvp = rsvpsData.find(
              (rsvp) => rsvp.eventId._id === event._id
            );
            return { ...event, userStatus: userRsvp ? userRsvp.status : null };
          });
        }

        if (role === "admin") {
          // If admin, fetch RSVP summary for each event
          const summaries = await Promise.all(
            eventsData.map((event) =>
              axios
                .get(`http://localhost:5001/api/rsvp/summary/${event._id}`, {
                  headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => ({ eventId: event._id, summary: res.data.summary }))
            )
          );

          // Merge RSVP summary into events
          eventsData = eventsData.map((event) => {
            const match = summaries.find((s) => s.eventId === event._id);
            return { ...event, summary: match ? match.summary : null };
          });
        }

        // Set events state
        setEvents(eventsData);
      } catch (err) {
        // If fetch fails, show error
        setError("Failed to fetch events or RSVPs.");
      }
    };

    fetchEvents();
  }, [token, role]); // run again if token or role changes

  // Add new event (for admin)
  const addEvent = (event) => {
    setEvents([...events, event]); // append new event to list
    setShowForm(false); // hide form after adding
  };

  // Delete event (admin only)
  const handleDelete = async (eventId) => {
    try {
      await axios.delete(`http://localhost:5001/api/event/delete/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Remove deleted event from UI
      setEvents(events.filter((e) => e._id !== eventId));
    } catch {
      alert("Failed to delete event");
    }
  };

  // Edit event (admin only)
  const handleEdit = (event) => {
    navigate(`/admin/events/edit/${event._id}`); // go to edit page
  };

  // RSVP function for user
  const handleRsvp = async (eventId, status) => {
    try {
      // Send RSVP request to backend
      await axios.post(
        "http://localhost:5001/api/rsvp/create",
        { eventId, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update UI immediately so user sees new status
      setEvents((prevEvents) =>
        prevEvents.map((e) =>
          e._id === eventId ? { ...e, userStatus: status } : e
        )
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
      
      {/* show error if any */}
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

      {/*show create event form if admin clicked */}
      {role === "admin" && showForm && <CreateEventForm addEvent={addEvent} />}

      {/* Show events */}
      <div className={styles.eventGrid}>
        {events.length === 0 && !error && <p>No events available.</p>}

        {events.map((event) => (
          <EventCard
            key={event._id}
            event={event}
            role={role}
            onEdit={role === "admin" ? handleEdit : null}
            onDelete={role === "admin" ? handleDelete : null}
            onRsvp={role === "user" ? handleRsvp : null}
          />
        ))}
      </div>
    </div>
  );
};

export default EventList;