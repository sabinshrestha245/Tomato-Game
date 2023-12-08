/**
 * Tomato component for the Tomato Number Game Dashboard.
 * @module Tomato
 */

import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import fetchData from "../api/FetchData"; // Import fetchData
import "../styles/Tomato.css";
import { Link } from "react-router-dom";
// Tomato.jsx
import { storeScore } from '../api/ScoreApi';
import Rules from "../components/Rules"; // Import Rules

Modal.setAppElement("#root"); // This line is needed for accessibility reasons

/**
 * Represents the Tomato Number Game Dashboard.
 * @function Tomato
 * @returns {JSX.Element} - Rendered component.
 */
function Tomato() {
  // State variables
  const [data, setData] = useState(null);
  const [number, setNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [round, setRound] = useState(1); // Add round state
  const [maxRounds, setMaxRounds] = useState(5); // Add maxRounds state
  const [timeLeft, setTimeLeft] = useState(30); // Add timer state
  const [modalIsOpen, setModalIsOpen] = useState(false);

  /**
   * Fetches data and starts the timer when the component mounts.
   * @function useEffect
   * @memberof Tomato
   */
  useEffect(() => {
    fetchData().then((json) => setData(json)); // Use fetchData
    startTimer(); // Start the timer when the component mounts
  }, []);

  /**
   * Updates the timer every second and cleans up the interval.
   * @function useEffect
   * @memberof Tomato
   */
  useEffect(() => {
    // Update the timer every second
    const timer = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // Clear the timer when the time is up or the game is over
    if (timeLeft <= 0 || gameOver) {
      clearInterval(timer);
      nextRound();
    }

    // Clean up the interval when the component unmounts
    return () => clearInterval(timer);
  }, [timeLeft, gameOver]);

  /**
   * Handles the change of the input number.
   * @function handleNumberChange
   * @memberof Tomato
   * @param {Object} event - The input change event.
   */
  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  /**
   * Handles the form submission.
   * @function handleSubmit
   * @memberof Tomato
   */
  const handleSubmit = () => {
    if (number == data.solution) {
      setScore(score + 10); // Increase score by 10 points
      nextRound(); // Go to next round
    } else {
      setScore(score - 6);
      nextRound(); 
    }
  };

  /**
   * Handles the game exit.
   * @async
   * @function handleExit
   * @memberof Tomato
   */
  const handleExit = async () => {
    await storeScore(score); // Save the score before exiting
    setGameOver(true); // End game
  };
  
  /**
   * Handles skipping to the next round.
   * @function handleSkip
   * @memberof Tomato
   */
  const handleSkip = () => {
    setScore(score - 3);
    nextRound();
  };

  /**
   * Moves to the next round, fetches new data, and resets the timer.
   * @async
   * @function nextRound
   * @memberof Tomato
   */
  const nextRound = async () => {
    if (round < maxRounds) {
      setRound(round + 1);
      try {
        const json = await fetchData();
        setData(json);
        setTimeLeft(30);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error fetching data
      }
    } else {
      await storeScore(score); // Save the score before ending the game
      setGameOver(true);
    }
  };  

  /**
   * Starts the timer.
   * @function startTimer
   * @memberof Tomato
   */
  const startTimer = () => {
    setTimeLeft(60); // Start the timer at 30 seconds
  };

  /**
   * Handles user logout.
   * @function handleLogout
   * @memberof Tomato
   */
  const handleLogout = () => {
    // Implement your logout logic here
    console.log("User logged out");
  };

  /**
   * Opens the modal.
   * @function openModal
   * @memberof Tomato
   */
  const openModal = () => {
    setModalIsOpen(true);
  };

  /**
   * Closes the modal.
   * @function closeModal
   * @memberof Tomato
   */
  const closeModal = () => {
    setModalIsOpen(false);
  };

  /**
   * Renders the Tomato component.
   * @returns {JSX.Element} - Rendered component.
   */
  return (
    <div className="tomato-game-dashboard">
      <h1>Tomato Number Game Dashboard</h1>
      {!gameOver && data && (
        <div>
          {/* Display current round */}
          <p>
            <h3>Round: {round} out of 10</h3>
          </p>{" "}
          {/* Display current round */}
          <h3>Score: {score}</h3>
          <h3>Time left: {timeLeft} seconds</h3> {/* Display the timer */}
          <img src={data.question} alt="Question" />
          <div className="input-box">
            <label>Solution:</label>
            <input
              type="number"
              min="0"
              max="9"
              value={number}
              onChange={handleNumberChange}
            />
          </div>
          <button className="btn" onClick={handleSubmit}>
            Submit
          </button>
          <button className="btn" onClick={handleSkip}>
            Skip
          </button>
          <button className="btn" onClick={handleExit}>
            Exit Game
          </button>
          {/* Display Rules modal */}
          <button className="btn" onClick={openModal}>
            Show Rules
          </button>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Game Rules"
          >
            <Rules /> {/* Use Rules */}
            <button className="btn" onClick={closeModal}>
              Close
            </button>
          </Modal>
        </div>
      )}
      {gameOver && (
        <div>
          <h1>Game Over !!! </h1>
          <h2> Your final score is: {score}</h2>

          {/* Navigation buttons */}
          <button className="btn">
            <Link to="/home">Back to Home</Link>
          </button>
          <button
            className="btn"
            onClick={async () => {
              await storeScore(score);
              setGameOver(false);
              setScore(0);
              setRound(1);
              startTimer();
              fetchData();
            }}
          >
            Play Again
          </button>
          <button className="btn" onClick={handleLogout}>
            <Link to="/login">Logout</Link>
          </button>{" "}
          {/* Add Logout button */}
        </div>
      )}
    </div>
  );
}

// Export the Tomato component
export default Tomato;
