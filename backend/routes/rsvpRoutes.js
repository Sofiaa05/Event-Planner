const express = require("express");

const {
    createRsvp, 
    updateRsvp,
    getRsvp,
    getSummary
} = require("../controllers/rsvpController.js");

const {protect} = require("../middlewares/authMiddleware.js");
const { authorizeRole } = require("../middlewares/authorizeRole.js");  //authentication middleware to authenticate the role based user making request

const router = express.Router();

router.post('/create', protect, createRsvp); //user submits rsvp
router.put('/update/:id', protect, updateRsvp); //user updates rsvp

router.get('/getrsvp', protect, getRsvp); //user gets events they rsvp to + status
router.get('/summary/:eventId', protect, authorizeRole("admin"), getSummary); //admin gets summary of rsvps for one event

module.exports = router;
