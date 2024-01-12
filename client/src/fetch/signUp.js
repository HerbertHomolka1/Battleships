/**
 * @file signUp.js
 * @description Module for handling user registration through the signup API.
 */

/**
 * @function signUp
 * @description Performs user registration by sending a POST request to the signup API.
 * @param {string} username - The desired username for the new user.
 * @param {string} password - The password for the new user.
 * @returns {Promise<string>} - A Promise resolving to the registration message from the server.
 */

function signUp(username, password) {
  let URL = "http://127.0.0.1:5000/auth/signup";
  const payload = { username: username, password: password };
  // A promise. Perform a POST request to the login endpoint using the Fetch API, access token will be returned later
  const message = fetch(URL, {
    method: "Post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    // Handle the response from the server
    .then((apiRes) => apiRes.json())
    // Process the JSON response
    .then((resJson) => resJson.message)
    .catch((err) => console.log(err));
  // Return Promise which will result in an access token
  return message;
}

export default signUp;
