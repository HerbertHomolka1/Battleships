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
import Auth from "./components/Auth";

/**
 * @function App
 * @description Main application component containing user authentication logic and routing.
 * @returns {JSX.Element} Rendered App component.
 */
const App = () => {
  // JSX structure for the application layout
  return (
    <GlobalStateProvider>
      <Router>

        <Auth/>
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