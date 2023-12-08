import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import tomatoImage from '../assets/tomatoImg.jpeg';
import "../styles/Homepage.css";

/**
 * Homepage component for the Tomato Number Game application.
 * @module HomePage
 * @returns {JSX.Element} - Rendered component.
 */
const HomePage = () => {
  // Auth context hook
  const { user, logout, login } = useAuth();

  /**
   * Fetches the current user data from the backend and updates the user state.
   * @function useEffect
   * @memberof HomePage
   */
  useEffect(() => {
    /**
     * Fetches the current user from the backend or authentication service.
     * @function fetchCurrentUser
     * @async
     */
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch('http://localhost:8000/users/get-current-user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
        });

        if (response.ok) {
          try {
            const userData = await response.json();
            console.log('Fetched user data:', userData);
            login(userData); // Corrected: Use login function to set the user state
          } catch (jsonError) {
            console.error('Error parsing JSON:', jsonError.message);
          }
        } else {
          // Handle non-JSON responses (e.g., HTML error page)
          console.error('Failed to fetch user information:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user information:', error.message);
      }
    };

    // Call the function to fetch the current user if the user state is not set
    if (!user) {
      fetchCurrentUser();
    }
  }, [user, login]);

  /**
   * Handles the play game button click event.
   * @function handlePlayGame
   * @memberof HomePage
   */
  const handlePlayGame = () => {
    console.log('Play game clicked');
    // Add your logic to navigate to the game page or perform actions when the play game button is clicked
  };

  /**
   * Renders the HomePage component.
   * @returns {JSX.Element} - Rendered component.
   */
  return (
    <div className='main'>
      <div className='greetings'>
        {user ? (
          <h1 >Welcome {user.username}</h1>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
      
      <img className='dancing-tomato' src={tomatoImage} alt="Dancing Tomato" />
      <button className="btn" onClick={handlePlayGame}>
        <Link to="/tomato">Play Game</Link>
      </button>
      <button className="btn" onClick={logout}>
        <Link to="/login">Logout</Link>
      </button>
    </div>
  );
};

export default HomePage;
