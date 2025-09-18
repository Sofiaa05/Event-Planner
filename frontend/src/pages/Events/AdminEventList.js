import React, { useState } from "react";
import EventCard from "../../components/EventCard";
import CreateEventForm from "../../components/CreateEventForm";
import styles from "./AdminEventList.module.css";

const AdminEventList = () => {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Add new event to the list
  const addEvent = (event) => {
    setEvents([...events, event]);
    setShowForm(false);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Event List</h2>

      <div className={styles.createButtonWrapper}>
        <button
          className={styles.createButton}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "Create New Event"}
        </button>
      </div>

      {showForm && (
        <CreateEventForm
          addEvent={addEvent}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className={styles.eventGrid}>
        {events.map((event, index) => (
          <EventCard key={index} event={event} role="Admin" />
        ))}
      </div>
    </div>
  );
};

export default AdminEventList;
