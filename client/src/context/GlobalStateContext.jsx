/**
 * @file GlobalStateContext.js
 * @description Module for managing global state related to user authentication.
 */

import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const GlobalStateContext = createContext();

/**
 * @function GlobalStateProvider
 * @description A provider component for managing the global state and handling user authentication.
 * @param {Object} props 
 * @param {React.ReactNode} props.children
 * @returns {JSX.Element} Rendered GlobalStateProvider component.
 */
const GlobalStateProvider = ({ children }) => {
  // State variable to track user authentication status
  const [isLoggedIn, setIsLoggedIn] = useState(
    Cookies.get("isLoggedIn") === "true"
  );

  // useEffect to update cookies based on changes in isLoggedIn state
  // whenever the user loggs out and isLoggedIn -> false then accessToken cookie turns into empty string
  useEffect(() => {
    Cookies.set("isLoggedIn", isLoggedIn.toString(), { expires: 7 });
    if (!isLoggedIn) {
      Cookies.set("accessToken", "");
    }
  }, [isLoggedIn]);

  // Context value 
  const contextValue = {
    isLoggedIn,
    setIsLoggedIn,
  };

  // Render the provider with the provided child components
  return (
    <GlobalStateContext.Provider value={contextValue}>
      {children}
    </GlobalStateContext.Provider>
  );
};

/**
 * @function useGlobalState
 * @description A custom hook to access the global state context values.
 * @returns {Object} - An object containing isLoggedIn state and setIsLoggedIn function.
 * @throws {Error} - Throws an error if used outside the GlobalStateProvider.
 */
const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};

// Export GlobalStateProvider and useGlobalState for use in other components
export { GlobalStateProvider, useGlobalState };
