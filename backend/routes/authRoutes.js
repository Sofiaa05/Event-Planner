const express = require("express");
const router = express.Router();

//importing the actual logic defined in controller folder. separated for better readibility
const {
    registerUser,
    loginUser,
} = require("../controllers/authController");

// Register user route
router.post("/register", registerUser);

// Login user route
router.post("/login", loginUser);

module.exports = router;