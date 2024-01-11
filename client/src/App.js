import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import BoardCreation from './pages/BoardCreation'
import login from "./fetch/login";
import signUp from "./fetch/signUp";

const App = () => {
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [messageLogin, setMessageLogin] = useState('')
  const [messageSignUp, setMessageSignUp] = useState('')

  const handleLogin = (event) => {

    login(username,password).then(
      (message) => setMessageLogin(message)
    )
    
  };

  const handleSignup = (event) => {
   
    signUp(username,password).then(
      (message) => setMessageSignUp(message)
    )

  };

  return (
  
      <Router>
        <div>
        <p>{messageLogin}</p>
        <p>{messageSignUp}</p>
        <input type="text" placeholder="Username" name="username" onChange={(event) => setUsername(event.target.value)}/>
        <input type="password" placeholder="Password" name="password" onChange={(event) => setPassword(event.target.value)}/>
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleSignup}>Signup</button>
      </div>
        <Routes>
          <Route path="/" element={<BoardCreation />} />
        </Routes>
      </Router>

  );
};

export default App;
 
