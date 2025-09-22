// Import required React tools: createContext (for global context) and useState (for local state)
import React, { createContext, useState } from 'react';

// Create a new Context object for storing and accessing user information globally
export const UserContext = createContext(); 

// Create a Context Provider component that wraps around your whole app
// It provides the user state and control functions (login/logout) to any child component
export const UserProvider = ({ children }) => {
    
    // Declare a user state variable and a function to update it.
    // Initially, no user is logged in, so it’s null.
    const [user, setUser] = useState(null);

    const [loadingUser, setLoadingUser] = useState(true);

    // Function to update user data — used after successful login or registration
    const updateUser = (userData) => {
        setUser(userData); // Set the new user data into the context
    }

    // Function to clear user data — used during logout
    const clearUser = () => {
        setUser(null); // Remove user data from context (log out)
    }

    // Provide the current user data and the two control functions to any component wrapped in this provider
    return (
        <UserContext.Provider 
            value={{ 
                user,         // The current user data (or null if not logged in)
                updateUser,   // Function to log in / update user info
                clearUser     // Function to log out
            }}
        >   
            {children}  {/* Render the wrapped part of the app (like <App />) */}
        </UserContext.Provider>
    );
}

// Export the provider as default so it can be imported and used in main.jsx or App.jsx
export default UserProvider;