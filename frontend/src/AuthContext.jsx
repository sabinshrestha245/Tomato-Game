import React, { createContext, useContext, useState } from 'react';

/**
 * Context to manage authentication state.
 * @constant {React.Context} AuthContext
 * @default
 */
const AuthContext = createContext();

/**
 * Provider component to manage authentication state.
 * @function AuthProvider
 * @param {Object} props - React component props.
 * @param {React.ReactNode} props.children - Child components to be wrapped by the AuthProvider.
 * @returns {JSX.Element} - Rendered component.
 */
export const AuthProvider = ({ children }) => {
  // State to store the current user
  const [user, setUser] = useState(null);

  /**
   * Sets the user data upon successful login.
   * @function login
   * @param {Object} userData - User data to be set.
   */
  const login = (userData) => {
    setUser(userData);
  };

  /**
   * Clears the user data upon logout.
   * @function logout
   */
  const logout = () => {
    setUser(null);
  };

  /**
   * Renders the AuthProvider component with the provided context value.
   * @returns {JSX.Element} - Rendered component.
   */
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to access the authentication context.
 * @function useAuth
 * @returns {Object} - Authentication context values (user, login, logout).
 * @throws Will throw an error if used outside of an AuthProvider.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  // Check if the hook is used within an AuthProvider
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
