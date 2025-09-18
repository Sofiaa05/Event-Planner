import React from "react";
import styles from "./EventCard.module.css";

const EventCard = ({ event, role, onEdit, onDelete, onRsvp }) => {
  
  return (
    <div className={styles.card}>
      <h3>{event.title}</h3>

      <p>{event.description}</p>
      <p>
        <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
      </p>

      <p>
        <strong>Time:</strong> {event.startTime} - {event.endTime}
      </p>

      <p>
        <strong>Location:</strong> {event.location}
      </p>

      {/* if the logged in user is an admin, show admin controls */}
      {role === "admin" ? (
        <div className={styles.adminSection}>
          {/* show buttons for admin to edit or delete this event */}
          <div className={styles.adminButtons}>
            <button onClick={() => onEdit(event)}>Edit</button>
            <button onClick={() => onDelete(event._id)}>Delete</button>
          </div>

          {/* show RSVP summary if available
            this lets the admin see how many users are Going, Maybe, or Declined */}
          {event.summary && (
            <div className={styles.rsvpSummary}>
              <p><strong>RSVP Summary:</strong></p>
              <ul>
                <li>Going: {event.summary.Going}</li>
                <li>Maybe: {event.summary.Maybe}</li>
                <li>Decline: {event.summary.Decline}</li>
                <li>
                  <strong>Total:</strong>{" "}
                  {event.summary.Going + event.summary.Maybe + event.summary.Decline}
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        // if the logged-in user is a normal user, show RSVP buttons
        <div className={styles.rsvpButtons}>
          {/* display the current RSVP status of the user for this event */}
          <p>
            <strong>Your RSVP:</strong>{" "}
            {event.userStatus ? event.userStatus : "Not Responded"}
          </p>

          {/* user can select "Going", "Maybe", or "Decline"
          highlight the button if it matches the current status */}
          <button
            className={event.userStatus === "Going" ? styles.active : ""}
            onClick={() => onRsvp(event._id, "Going")}
          >
            Going
          </button>
          <button
            className={event.userStatus === "Maybe" ? styles.active : ""}
            onClick={() => onRsvp(event._id, "Maybe")}
          >
            Maybe
          </button>
          <button
            className={event.userStatus === "Decline" ? styles.active : ""}
            onClick={() => onRsvp(event._id, "Decline")}
          >
            Decline
          </button>
        </div>
      )}
    </div>
  );
};

export default EventCard;