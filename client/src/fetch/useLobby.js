import { useState, useEffect } from "react";
import { useGlobalState } from "../context/GlobalStateContext";
import io from "socket.io-client";
import Cookies from "js-cookie";

function useLobby() {
  const [loggedUsers, setLoggedUsers] = useState([]);
  const { isLoggedIn } = useGlobalState();

  useEffect(() => {
    if (isLoggedIn) {
      const accessToken = Cookies.get("accessToken");

      const socket = io("http://127.0.0.1:5000/auth", {
        extraHeaders: { Authorization: `Bearer ${accessToken}`,},
      });
    
      console.log("useLobby triggered 1/3");

      console.log("accessToken: ", accessToken);

      socket.on("connect", () => {
        console.log("Connect triggered 2/3");
      });

      socket.on("update users", (data) => {
        console.log(`Update users triggered 3/3 data is ${data}`);
        setLoggedUsers([...data]);
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [isLoggedIn]);

  return loggedUsers;
}

export default useLobby;
