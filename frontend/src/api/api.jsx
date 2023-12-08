import axios from "../axios/axios";

/**
 * Fetches user data for the authenticated user.
 *
 * @async
 * @function getUserData
 * @returns {Promise<Object>} A Promise that resolves to the user data fetched from the server.
 * @throws {Error} If there is an error during the fetch operation.
 */
export const getUserData = async () => {
  try {
    const response = await axios.get('/api/user', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * Fetches all users from the server.
 *
 * @async
 * @function getAllUsers
 * @throws {Error} If there is an error during the fetch operation.
 */
export async function getAllUsers() {
  try {
    const response = await axios.get('/users/');
    console.log(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * Creates a new user.
 *
 * @async
 * @function createUser
 * @param {Object} data - User data to be sent in the request body.
 * @returns {Promise<Object>} A Promise that resolves to the response data from the server.
 * @throws {Error} If there is an error during the request.
 */
export const createUser = (data) => {
  return axios.request({
    url: `/users/`,
    method: 'post',
    data: data,
    headers: { 'Content-Type': 'application/json' }
  }).then((res) => {
    console.log(res);
    return res.data;
  }).catch((error) => {
    console.log(error);
    throw error;
  });
}

/**
 * Logs in a user.
 *
 * @async
 * @function loginUser
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<Object>} A Promise that resolves to the response data from the server.
 * @throws {Error} If there is an error during the login process.
 */
export const loginUser = async (username, password) => {
  try {
    const response = await axios.post('/login', {
      username,
      password,
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
