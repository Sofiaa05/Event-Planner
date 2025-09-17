const express = require("express");
const app = express();
const cors = require("cors");

//middleware
app.use(express.json()); // Middleware to parse JSON body
app.use(cors());

require("dotenv").config();

const db = require('./db/db'); //import db connection file

//testing route
app.get('/', (req, res) => {
  res.send('API is running fine.');
});

const port = process.env.PORT || 5001; //defining port

//start server
const server = () => {
    db(); //mongodb connection
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

server();
