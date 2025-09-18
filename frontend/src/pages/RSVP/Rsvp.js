import React, { useState } from "react";
import axios from "axios";
import styles from "./Rsvp.module.css"; // make sure you create this CSS file

const Rsvp = ({ eventId, initialStatus }) => {
  const [rsvpStatus, setRsvpStatus] = useState(initialStatus || "");
  const token = localStorage.getItem("token");

  const handleRsvp = async (status) => {
    try {
      if (!rsvpStatus) {
        // First time RSVP: Create new
        await axios.post(
          "http://localhost:5001/api/rsvp/create",
          { eventId, status },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // Already RSVPd:Update existing
        await axios.put(
          `http://localhost:5001/api/rsvp/update/${eventId}`,
          { status },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      setRsvpStatus(status); // update UI immediately
      alert(`RSVP "${status}" submitted successfully!`);
    } catch (err) {
      console.error(err);
      alert("Failed to submit RSVP");
    }
  };

  return (
    <div className={styles.rsvpContainer}>
      <p>
        Current RSVP:{" "}
        <strong>{rsvpStatus ? rsvpStatus : "Not Responded"}</strong>
      </p>
      <button
        className={rsvpStatus === "Going" ? styles.active : ""}
        onClick={() => handleRsvp("Going")}
      >
        Going
      </button>
      <button
        className={rsvpStatus === "Maybe" ? styles.active : ""}
        onClick={() => handleRsvp("Maybe")}
      >
        Maybe
      </button>
      <button
        className={rsvpStatus === "Decline" ? styles.active : ""}
        onClick={() => handleRsvp("Decline")}
      >
        Decline
      </button>
    </div>
  );
};

export default Rsvp;
