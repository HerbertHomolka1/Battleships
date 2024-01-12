import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import BoardCreation from './pages/BoardCreation'
import useBattleshipLogin from "./fetch/login";
import signUp from "./fetch/signUp";
import AllGamesPage from "./pages/AllGamesPage";
import { GlobalStateProvider, useGlobalState } from "./context/GlobalStateContext";

const App = () => {
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [messageLogin, setMessageLogin] = useState('')
  const [messageSignUp, setMessageSignUp] = useState('')
  const {isLoggedIn, setIsLoggedIn} = useGlobalState()


  const handleLogin = (event) => {

    useBattleshipLogin(username,password).then(
      (message) => {
        setMessageLogin(message ? 'login successful':'wrong credentials')
        setIsLoggedIn(message ? true:false)
      }
    )
    
    
  };

  const handleSignup = (event) => {
   
    signUp(username,password).then(
      (message) => setMessageSignUp(message)
    )

  };

  return (
    <GlobalStateProvider>
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
          <Route path="/" element={<AllGamesPage />} />
          <Route path="/BoardCreation" element={<BoardCreation />} />
        </Routes>
      </Router>
      </GlobalStateProvider>

  );
};

export default App;
 
