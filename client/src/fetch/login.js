/**
 * @file login.js
 * @description Module for handling user authentication through the login API.
 */

// Import necessary modules from external libraries
import Cookies from "js-cookie";
import { useState } from "react";

/**
 * @function login
 * @description Performs user authentication by sending a POST request to the login API.
 * @param {string} username - The username of the user attempting to log in.
 * @param {string} password - The password of the user attempting to log in.
 * @returns {Promise<string>} - A Promise resolving to the access token upon successful authentication.
 */
function login(username, password) {

  let URL = "http://127.0.0.1:5000/auth/login";

  
  const payload = { username: username, password: password };

  // A promise. Perform a POST request to the login endpoint using the Fetch API, access token will be returned later
  const accessToken = fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    // Handle the response from the server
    .then((apiRes) => {
      if (apiRes.ok) {
        return apiRes.json();
      } else {
        throw new Error(`fetch failed. ${apiRes.status}`);
      }
    })
    // Process the JSON response
    .then((resJson) => {
      const accessToken = resJson.access_token;
      const refreshToken = resJson.refreshToken;

      // Set the access token in a cookie for future use

      Cookies.set("accessToken", accessToken);

      return accessToken;
    })
    .catch((err) => console.error("Authentication failed:", err));

  // Return Promise which will result in an access token
  return accessToken;
}

export default login;
