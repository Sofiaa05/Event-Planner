import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Home from './pages/Home';
import EventList from './pages/Events/EventList';
import { UserProvider } from './context/UserContext';
import EditEvent from './pages/Events/EditEvent';
import EventDetails from './pages/Events/EventDetails';
const App = () => {
  return (
    <UserProvider>
    <div>
        <Router>
          <Routes>
            {/* Public */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

           {/* User */}
            <Route path="/getEvents" element={<EventList />} />              {/* List all events */}
            <Route path="/admin/events/edit/:id" element={<EditEvent />} />
            <Route path="/events/:id" element={<EventDetails />} />
          </Routes>
        </Router>
      </div>   
      </UserProvider>
  );
}

export default App;
