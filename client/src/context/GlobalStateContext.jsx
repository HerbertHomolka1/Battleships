import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const GlobalStateContext = createContext();

const GlobalStateProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    Cookies.get("isLoggedIn") === "true"
  );

  useEffect(() => {
    Cookies.set("isLoggedIn", isLoggedIn.toString(), { expires: 7 });
    if (!isLoggedIn) {
      Cookies.set('accessToken', '')
    }
  }, [isLoggedIn]);
  
  const contextValue = {
    isLoggedIn,
    setIsLoggedIn,
  };

  return (
    <GlobalStateContext.Provider value={contextValue}>
      {children}
    </GlobalStateContext.Provider>
  );
};

const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};

export { GlobalStateProvider, useGlobalState };