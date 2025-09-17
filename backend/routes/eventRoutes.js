const express = require("express");

const {
    createEvent,
    updateEvent,
    deleteEvent,
    getEvents,
    getEventDetails
} = require("../controllers/eventController.js");

const {protect} = require("../middlewares/authMiddleware.js"); //authentication middleware to authenticate the role based user making request
const { authorizeRole } = require("../middlewares/authorizeRole.js");

const router = express.Router();

router.post('/create', protect, authorizeRole("admin"), createEvent);
router.put('/update/:id', protect, authorizeRole("admin"), updateEvent);
router.delete('/delete/:id', protect, authorizeRole("admin"), deleteEvent);

router.get('/getevents', protect, getEvents);
router.get('/getdetails/:id', protect, getEventDetails);

module.exports = router;
