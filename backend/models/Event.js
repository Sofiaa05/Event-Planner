const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
  },  

  description: { 
    type: String 
  },

  date: { 
    type: Date, 
    required: true 
  },

  startTime: { 
    type: String,
    required: true
  },

  endTime: { 
    type: String,
    required: true 
  },

  location: { 
    type: String,
    required: true
  },

  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" // References the admin who created the event
  }
}, { timestamps: true }); 

module.exports = mongoose.model("Event", eventSchema);
