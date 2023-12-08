import axios from 'axios';
import { config } from "../config/config";

// Get the base URL from the configuration
let baseURL = config().rest_url; // dev server

// Set the default base URL and timeout for Axios
axios.defaults.baseURL = baseURL;
axios.defaults.timeout = 15000;

// Export the root URL and the configured Axios instance
export const rootURL = baseURL;
export default axios;
