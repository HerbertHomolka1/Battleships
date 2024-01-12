/**
 * @file App.js
 * @description Main application component handling user authentication and routing.
 * @version 1.0.0
 */

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import BoardCreation from './pages/BoardCreation';
import login from "./fetch/login";
import signUp from "./fetch/signUp";
import AllGamesPage from "./pages/AllGamesPage";
import { GlobalStateProvider, useGlobalState } from "./context/GlobalStateContext";

/**
 * @function App
 * @description Main application component containing user authentication logic and routing.
 * @returns {JSX.Element} Rendered App component.
 */
const App = () => {
  // State variables for user authentication
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [messageLogin, setMessageLogin] = useState('');
  const [messageSignUp, setMessageSignUp] = useState('');

  // the following is commented out because it causes following error
  // useGlobalState must be used within a GlobalStateProvider
  // I want to use isLoggedIn variable for teriary operator inside AllGamesPage to work properly
  
  // const {isLoggedIn} = useGlobalState() // does not work properly

  
  /**
   * @function handleLogin
   * @description Handles user login by calling the login API and updating state.
   *              login() returns a Promise. 
   *              It fetches from the server (post request) the access token used to authenticate the user later.
   * @param {Object} event - The event object.
   */
  const handleLogin = (event) => {
    login(username, password).then(
      (message) => {
        setMessageLogin(message ? 'Login successful' : 'Wrong credentials');
      }
    );
  };

  /**
   * @function handleSignup
   * @description Handles user signup by calling the signup API and updating state.
   *              signUp() returns a Promise. 
   *              It fetches from the server (post request) the message whether or not signup was successful.
   * @param {Object} event - The event object.
   */
  const handleSignup = (event) => {
    signUp(username, password).then(
      (message) => setMessageSignUp(message)
    );
  };

  // JSX structure for the application layout
  return (
    <GlobalStateProvider>
      <Router>
        <div>
          {/* Display login and signup messages */}
          <p>{messageLogin}</p>
          <p>{messageSignUp}</p>

          {/* Input fields for username and password */}
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(event) => setPassword(event.target.value)}
          />

          {/* Login and Signup buttons */}
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleSignup}>Signup</button>
        </div>

        {/* React Router for handling page navigation */}
        <Routes>
          <Route path="/" element={<AllGamesPage />} />
          <Route path="/BoardCreation" element={<BoardCreation />} />
        </Routes>
      </Router>
    </GlobalStateProvider>
  );
};

export default App;