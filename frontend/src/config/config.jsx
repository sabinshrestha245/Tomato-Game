/**
 * Environment configuration object.
 * @type {Object}
 */
let env = {
  'local': {
    'rest_url': 'http://localhost:8000',
    'redirect_url': 'http://localhost:3000',
    'title': 'local'
  },
};

/**
 * Retrieves the configuration for the specified environment.
 * @function config
 * @param {string} environment - The environment for which to retrieve the configuration.
 * @returns {Object} - The configuration object for the specified environment.
 */
export const config = () => {
  // Return the configuration for the specified environment
  return env['local'];
};
