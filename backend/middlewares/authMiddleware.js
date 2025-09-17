const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to protect routes
exports.protect = async(req, res, next) => {
    //Check for token in the request
    let token = req.headers.authorization?.split(" ")[1];

    // Handle no token
    if(!token) {
        return res.status(401).json({message: "Not authorized, no token"});
    }
    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find user by ID from the token. Attach the user to req
        req.user = await User.findById(decoded.id).select("-password");

        next(); // Proceed to the next middleware or route handler. If you don’t call next(), the request will hang forever
    }catch (error) {
        console.error("Error in authMiddleware:", error);
        res.status(401).json({message: "Not authorized, token failed"});
    } 
};