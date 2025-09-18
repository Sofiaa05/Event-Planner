const express = require("express");
const app = express();
const cors = require("cors");

//middleware
app.use(express.json()); // Middleware to parse JSON body
app.use(cors());

const dotenv = require("dotenv");
dotenv.config();

const db = require('./db/db'); //import db connection file

//testing route
app.get('/', (req, res) => {
  res.send('API is running fine.');
});

const authRoutes = require("./routes/authRoutes.js");
app.use('/api/auth', authRoutes);

const eventRoutes = require("./routes/eventRoutes.js");
app.use('/api/event', eventRoutes);

const rsvpRoutes = require('./routes/rsvpRoutes.js');
app.use('/api/rsvp', rsvpRoutes);

const port = process.env.PORT || 5001; //defining port

//start server
const server = () => {
    db(); //mongodb connection
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

server();
