/**
 * Fetches data from the specified API endpoint.
 *
 * @async
 * @function fetchData
 * @returns {Promise<Object>} A Promise that resolves to the parsed JSON data fetched from the API.
 * @throws {Error} If there is an error during the fetch operation.
 */
const fetchData = () => {
  // Fetch data from API
  return fetch('https://marcconrad.com/uob/tomato/api.php')
      .then(response => response.json())
      .catch(error => {
          console.error('Error:', error);
          throw error; // Re-throw the error to propagate it further
      });
};

export default fetchData;
