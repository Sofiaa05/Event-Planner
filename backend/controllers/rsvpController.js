/* User: RSVP to any RSVP as Going, Maybe, or Decline.
Update RSVP response later if desired.
View a list of RSVPs they have responded to, with their current RSVP status.

- user submits rsvp: if no rsvp before for that RSVP -> update else create new rsvp record
- user updates rsvp (only if RSVP date hasn’t passed)
- user views their rsvp

Admin: view a summary of RSVPs for each RSVP (number of Going/ Maybe/ Declined responses).
    - admin views RSVP summary for a given RSVP, count number of users who (Going/ Maybe/ Decline)
    - return RSVP info + rsvp counts
*/

const RSVP = require("../models/RSVP");

// user: createa new RSVP 
exports.createRsvp = async (req, res) => {
  const { eventId, status }=req.body || {};

  if (!eventId || !status){
    return res.status(400).json({ message: "All fields are required"});
  }

  try{

    let rsvp = await RSVP.findOne({ userId: req.user._id, eventId });

    if (rsvp) {
      // Update existing RSVP
      rsvp.status = status;
      await rsvp.save();
      return res.status(200).json({ message: "RSVP updated", rsvp });
    }

    // Create new RSVP
    rsvp = await RSVP.create({
      userId: req.user._id,
      eventId,
      status,
    });

    res.status(201).json({ message: "RSVP submitted", rsvp });
  } catch (error) {
    res.status(500).json({ message: "Error submitting RSVP", error: error.message });
  }
};

// user: Update RSVP (explicit update by ID)
exports.updateRsvp = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const rsvp = await RSVP.findById(id);

    //check if rsvp exists or not
    if (!rsvp) {
      return res.status(404).json({ message: "RSVP not found" });
    }

    // Only allow owner to update. Must ensure that only the owner (the same user who created it) is allowed to do so.
    if (rsvp.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed to update this RSVP" });
    }

    rsvp.status = status; //update previous status with new status
    await rsvp.save();

    res.status(200).json({ message: "RSVP updated successfully", rsvp });
  } catch (error) {
    res.status(500).json({ message: "Error updating RSVP", error: error.message });
  }
}

// user: Get all RSVPs of logged-in user
exports.getRsvp = async (req, res) => {
  try {
    const rsvps = await RSVP.find({ userId: req.user._id }).populate("eventId", "title date location"); //(populate)since We want details of the event, like its title, date, location not just the event object id.
    res.status(200).json(rsvps);
  } catch (error) {
    res.status(500).json({ message: "Error fetching RSVPs", error: error.message });
  }
};

// Admin: Summary of RSVPs for an event 
exports.getSummary = async (req, res) => {
  const { eventId } = req.params;

  try {
    // Get all RSVPs for the event
    const rsvps = await RSVP.find({ eventId });

    // Initialize counters
    let summary = {
      Going: 0,
      Maybe: 0,
      Decline: 0
    };

    // Count each RSVP status
    for (let rsvp of rsvps) {
      if (summary[rsvp.status] !== undefined) {
        summary[rsvp.status] += 1;
      }
    }

    // Send response
    res.status(200).json({ eventId, summary });
  } catch (error) {
    res.status(500).json({ message: "Error fetching RSVP summary", error: error.message });
  }
};

