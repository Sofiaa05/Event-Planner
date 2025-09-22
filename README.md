# Event-Planner
Event planner web application using MERN stack.



# Project Setup and Installation
1. Clone the repository
```bash
git clone https://github.com/Sofiaa05/Event-Planner
cd Event-Planner
```
2. Setup Backend
```bash
cd backend
npm i
```
Create a .env file in the backend folder and create required env variables.
```
MONGO_URI="db string"
JWT_SECRET="your secret key"
```

Start the backend server:
```bash
npm run dev
```

3. Setup Frontend
```bash
cd ../frontend
npm i
npm start
```
4. Access app
```bash
http://localhost:3000
```

# Technologies used and why?
I built this app using the MERN stack — MongoDB for storing data because it’s flexible and easy to work with, Express.js and Node.js for the backend to handle requests and manage the server, and React.js for the frontend to create a fast, interactive user interface. I used Mongoose to define data models and make database operations easier, and JWT for secure authentication. For styling, I used CSS to make the app look clean and responsive.

---

# API Endpoints and HTTP methods

### **Authentication Routes**

| Endpoint             | HTTP Method | Description            | Access Level |
| -------------------- | ----------- | ---------------------- | ------------ |
| `/api/auth/register` | POST        | Register a new user    | Public       |
| `/api/auth/login`    | POST        | Login an existing user | Public       |

### **Event Routes**

| Endpoint                     | HTTP Method | Description                           | Access Level        |
| ---------------------------- | ----------- | ------------------------------------- | ------------------- |
| `/api/events/create`         | POST        | Create a new event                    | Admin only          |
| `/api/events/update/:id`     | PUT         | Update an existing event by ID        | Admin only          |
| `/api/events/delete/:id`     | DELETE      | Delete an existing event by ID        | Admin only          |
| `/api/events/getevents`      | GET         | Get a list of all events              | Authenticated users |
| `/api/events/getdetails/:id` | GET         | Get details of a specific event by ID | Authenticated users |

### **RSVP Routes**

| Endpoint                     | HTTP Method | Description                                   | Access Level        |
| ---------------------------- | ----------- | --------------------------------------------- | ------------------- |
| `/api/rsvp/create`           | POST        | Submit an RSVP for an event                   | Authenticated users |
| `/api/rsvp/update/:id`       | PUT         | Update an existing RSVP                       | Authenticated users |
| `/api/rsvp/getrsvp`          | GET         | Get all RSVPs submitted by the logged-in user | Authenticated users |
| `/api/rsvp/summary/:eventId` | GET         | Get RSVP summary for a specific event         | Admin only          |

---



# ER Diagram
<img width="845" height="734" alt="image" src="https://github.com/user-attachments/assets/2e76d2c5-9ad4-48b9-a734-827081dc9bcf" />

