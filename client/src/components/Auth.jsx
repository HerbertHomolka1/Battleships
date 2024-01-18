import { useState } from "react";
import login from "../fetch/login";
import signUp from "../fetch/signUp";
import { useGlobalState } from "../context/GlobalStateContext";
import useLobby from "../fetch/useLobby";

function Auth() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const {isLoggedIn,setIsLoggedIn} = useGlobalState() 
  const loggedUsers = useLobby()
  /**
   * @function handleLogin
   * @description Handles user login by calling the login API and updating state.
   *              login() returns a Promise.
   *              It fetches from the server (post request) the access token used to authenticate the user later.
   * @param {Object} event - The event object.
   */
  const handleLogin = (event) => {
    login(username, password).then((message) => {
      setMessage(message ? "Login successful" : "Wrong credentials");
      setIsLoggedIn(message ? true : false)

    });
  };

  const handleLogout = (event) => {
    login(username, password).then((message) => {
      setMessage("Successfully logged out");
      setIsLoggedIn(false)
    });
  };

  /**
   * @function handleSignup
   * @description Handles user signup by calling the signup API and updating state.
   *              signUp() returns a Promise.
   *              It fetches from the server (post request) the message whether or not signup was successful.
   * @param {Object} event - The event object.
   */
  const handleSignup = (event) => {
    signUp(username, password).then((message) => setMessage(message));
  };

  return (
    <div>
      {/* Display login, logout and signup messages */}
      <p>{message}</p>
      loggged users <ul> {loggedUsers.map((loggedUser)=>(<li>{loggedUser}</li>))} </ul>

      

      {isLoggedIn ? (
        <div>
          <button onClick={handleLogout}>Log out</button>
        </div>
      ) : (
        <div>
          {/* Input fields for username and password */}
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(event) => setUsername(event.target.value)}
          />

          {/* Login and Signup buttons */}
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleSignup}>Signup</button>
        </div>
      )}
    </div>
  );
}


export default Auth;
