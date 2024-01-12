import { useState } from "react"
import { useEffect } from "react"
import { useGlobalState } from "../context/GlobalStateContext"
import io from 'socket.io-client'
import Cookies from "js-cookie"


function useLobby() {
    const [loggedUsers, setLoggedUsers] = useState([])
    const {isLoggedIn} = useGlobalState

    useEffect(()=>{
        const socket = io('http://127.0.0.1:5000')

        socket.on('connect', ()=> {
            console.log('sockets connected')
            socket.emit('login_request', {access_token:Cookies.get('accessToken')})
        })
        socket.on('update_users', (loggedOnServer) => {
            console.log('logged users:', loggedOnServer)
            setLoggedUsers(loggedOnServer)
        })

        socket.on('disconnect', () => {
            console.log('Disconnected from the server.');
          });
    },[isLoggedIn])

    return loggedUsers
}

export default useLobby