import React, { useEffect, useState } from "react";
import {
  getEvents,
  deleteEvent,
  getUserRsvps,
  getRsvpSummary,
  createRsvp,
} from "../../api/api";

import EventCard from "../../components/EventCard";
import CreateEventForm from "../../components/CreateEventForm";
import styles from "./EventList.module.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/NavBar";

const EventList = () => {
  // State for events
  const [events, setEvents] = useState([]);

  // State for error handling
  const [error, setError] = useState("");

  // Loading state so UI doesn’t flicker “No events” before data arrives
  const [loading, setLoading] = useState(false);

  // State to toggle event form (admin only)
  const [showForm, setShowForm] = useState(false);

  // Get role from localStorage
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  // Fetch events + RSVPs when component mounts
  useEffect(() => {
    const fetchData = async () => {
     
          if(loading) return;
            setLoading(true);
        // 1. Get all events
      try {
        let eventsData = await getEvents();

        // 2. If user, attach their RSVP status to each event
        if (role === "user") {
          const rsvpsData = await getUserRsvps();

          eventsData = eventsData.map((event) => {
            const userRsvp = rsvpsData.find(
              (rsvp) => rsvp.eventId._id === event._id
            );
            return { ...event, userStatus: userRsvp ? userRsvp.status : null };
          });
        }

        const summaries = await Promise.all(
          eventsData.map((event) => getRsvpSummary(event._id).catch(() => null))
        );  
          eventsData = eventsData.map((event, i) => ({
            ...event,
            summary: summaries[i]?.summary || null,
          }));

        // 4. Save events to state
        setEvents(eventsData);
      } catch (err) {
        setError("Failed to fetch events or RSVPs.");
      } finally {
        setLoading(false); // always stop loading
      }
    };

    fetchData();
  }, [role]);

  // Add new event (admin only)
  const addEvent = (event) => {
    // functional update to avoid stale state
    setEvents((prev) => [...prev, event]);
    setShowForm(false);
  };

  // Delete event (admin only)
  const handleDelete = async (eventId) => {
    try {
      await deleteEvent(eventId);
      // Remove event from state
      setEvents((prev) => prev.filter((e) => e._id !== eventId));
    } catch {
      alert("Failed to delete event");
    }
  };

  // Edit event (admin only)
  const handleEdit = (event) => {
    navigate(`/admin/events/edit/${event._id}`);
  };

  // RSVP for user
  const handleRsvp = async (eventId, status) => {
    try {
      await createRsvp(eventId, status);

      // Update status in UI immediately
      setEvents((prev) =>
        prev.map((e) =>
          e._id === eventId ? { ...e, userStatus: status } : e
        )
      );

      alert(`RSVP "${status}" submitted successfully!`);
    } catch {
      alert("Failed to submit RSVP");
    }
  };

  return (
    <>
    <Navbar />
      <div className={styles.container}>
        <h2>{role === "admin" ? "Admin Event List" : "Upcoming Events"}</h2>

        {error && <p className={styles.error}>{error}</p>}

        {loading && <p>Loading events...</p>}

        {/* Admin: Create new event button */}
        {role === "admin" && (
          <div className={styles.createButtonWrapper}>
            <button
              className={styles.createButton}
              onClick={() => setShowForm((prev) => !prev)}
            >
              {showForm ? "Cancel" : "Create New Event"}
            </button>
          </div>
        )}

        {/* Show create event form if admin clicks button */}
        {role === "admin" && showForm && <CreateEventForm addEvent={addEvent} />}

        {/* Show events */}
        <div className={styles.eventGrid}>
          {!loading && events.length === 0 && !error && (
            <p>No events available.</p>
          )}

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
    </>
  );
};

export default EventList;
