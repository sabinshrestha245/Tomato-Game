/**
 * Sends a request to the server to store the user's score.
 *
 * @async
 * @function storeScore
 * @param {number} scoreValue - The score value to be stored.
 * @returns {Promise<boolean>} A Promise that resolves to true if the score is stored successfully, otherwise false.
 */
export const storeScore = async (scoreValue) => {
  try {
      const response = await fetch('/score', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
          body: JSON.stringify({ score: scoreValue }),
      });

      if (response.ok) {
          console.log('Score stored successfully!');
          return true; // Indicate success
      } else {
          console.error('Failed to store the score:', response.statusText);
          return false; // Indicate failure
      }
  } catch (error) {
      console.error('Error storing the score:', error.message);
      return false; // Indicate failure
  }
};
