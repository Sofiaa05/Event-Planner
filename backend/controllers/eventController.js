/* Admin functionality: create events by entering details like event name, date, time, location, and description. 
update or delete events if needed 

User Functionality: View a list of upcoming events sorted by date, View event details on a separate page or modal. */

const Event = require("../models/Event");
const RSVP = require("../models/RSVP");

// createa new event (Admin only functionality)
exports.createEvent = async (req, res) => {
  const { title, description, date, startTime, endTime, location }=req.body || {};

  if (!title || !description || !date || !startTime || !endTime || !location){
    return res.status(400).json({ message: "All fields are required"});
  }

  try {
    // Check if event title already exists
    const existingEvent = await Event.findOne({ title });
    if (existingEvent) {
      return res.status(400).json({ message: "Event title already exists" });
    }

    const event = await Event.create({
      title,
      description,
      date,
      startTime,
      endTime,
      location,
    });

    res.status(201).json({ message: "Event created successfully",event });
  } catch (error) {
    res.status(500).json({ message: "Error creating event", error: error.message });
  }
};

//  update an existing event (Admin only)
exports.updateEvent = async (req, res) => {
  const {id} = req.params;
  const {title, description, date, startTime, endTime, location} = req.body;

  try {
    const event = await Event.findById(id);
    if (!event){
    return res.status(404).json({message: "Event not found"});
    }

  if (title){
      event.title = title;
  }

  if (description){
      event.description = description;
  }

  if (date){
      event.date = date;
  }

  if (startTime){
      event.startTime = startTime;
  }

  if (endTime){
      event.endTime = endTime;
  }

  if (location){
      event.location = location;
  }

    await event.save();

    res.status(200).json({message: "Event updated successfully", event});
  }catch (error) {
    res.status(500).json({message: "Error updating event", error: error.message});
  }
};

// Delete an event (Admin only)
exports.deleteEvent = async (req, res) => {
  const {id} = req.params; //object destructuring

  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    //delete event
    await event.deleteOne();

    //delete related RSVPs
    await RSVP.deleteMany({ eventId: event._id });

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting event", error: error.message });
  }
};

// Get all upcoming events (both user and admin)
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 }); // sorted by date
    res.status(200).json(events);
  } catch (error) {
      res.status(500).json({ message: "Error fetching events", error: error.message});
  }
};

// GET single event details (both user and admin)
exports.getEventDetails = async (req, res) => {
  const { id } = req.params;

  try{
    const event = await Event.findById(id);
    if (!event){
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(event);
  }catch (error){
  res.status(500).json({message: "Error fetching event details", error: error.message});
  }
};


