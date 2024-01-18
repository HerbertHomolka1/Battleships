import { useState, useEffect } from "react";
import { useGlobalState } from "../context/GlobalStateContext";
import io from 'socket.io-client';

function useLobby() {
    const [loggedUsers, setLoggedUsers] = useState([1]);
    const { isLoggedIn } = useGlobalState();

    useEffect(() => {
        const socket = io('http://127.0.0.1:5000/auth');
        console.log('useLobby triggered 1/3');
    
        socket.on('connect', () => {
            console.log('Connect triggered 2/3');
        });
    
        socket.on('update users', (data) => {
            console.log(`Update users triggered 3/3 data is ${data}`);
            // Handle the data received from the server
        });
    }, []);

    return loggedUsers
    
}

export default useLobby;
