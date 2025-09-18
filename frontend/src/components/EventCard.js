import React from "react";
import styles from "./EventCard.module.css";

const EventCard = ({ event, role, onEdit, onDelete, onRsvp }) => {
  return (
    <div className={styles.card}>
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
      <p><strong>Time:</strong> {event.startTime} - {event.endTime}</p>
      <p><strong>Location:</strong> {event.location}</p>

      {role === "admin" ? (
        <div className={styles.adminButtons}>
          <button onClick={() => onEdit(event)}>Edit</button>
          <button onClick={() => onDelete(event._id)}>Delete</button>
          <button onClick={() => window.location.href = `/admin/events/summary/${event._id}`}>
            RSVP Summary
          </button>
        </div>
      ) : (
        <div className={styles.rsvpButtons}>
          <button onClick={() => onRsvp(event._id, "Going")}>Going</button>
          <button onClick={() => onRsvp(event._id, "Maybe")}>Maybe</button>
          <button onClick={() => onRsvp(event._id, "Decline")}>Decline</button>
        </div>
      )}
    </div>
  );
};

export default EventCard;
