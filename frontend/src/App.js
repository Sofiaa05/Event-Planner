import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import EventList from './pages/Events/EventList';
import { UserProvider } from './context/UserContext';
import EditEvent from './pages/Events/EditEvent';
import NotFound from './pages/NotFound';
const App = () => {
  return (
    <UserProvider>
    <div>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/getEvents" element={<EventList />} />              {/* List all events */}
            <Route path="/admin/events/edit/:id" element={<EditEvent />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>   
      </UserProvider>
  );
}

export default App;
