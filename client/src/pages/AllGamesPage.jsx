// AllGamesPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalState } from '../context/GlobalStateContext';

const AllGamesPage = () => {
  const { isLoggedIn } = useGlobalState();

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <p>Click the button below to create a new game:</p>
          <Link to="/BoardCreation">
            <button>Create New Game</button>
          </Link>
        </div>
      ) : (
        <p>Please log in to create a new game.</p>
      )}
    </div>
  );
};

export default AllGamesPage;
