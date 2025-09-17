const mongoose = require("mongoose");

const rsvpSchema = new mongoose.Schema({
    // each recored uniquely links a user. "Per user per event"
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },   

  eventId: {  //links to event
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Event", 
    required: true 
  },

  status: { 
    type: String, 
    enum: ["Going", "Maybe", "Decline"], //For each event, the user can choose their RSVP status: Going, Maybe, or Decline.
    required: true 
  }
}, { timestamps: true }); 

module.exports = mongoose.model("RSVP", rsvpSchema);
