import React from 'react';
import './App.css';
import Tomato from './pages/Tomato';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Homepage';
import { AuthProvider } from './AuthContext';

/**
 * Main application component for the Tomato Number Game.
 * @function App
 * @returns {JSX.Element} - Rendered component.
 */
function App() {
  /**
   * Renders the main application component with routes and authentication provider.
   * @returns {JSX.Element} - Rendered component.
   */
  return (
    <AuthProvider>
      {/* Wrap your routes in BrowserRouter */}
      <BrowserRouter>
        <div>
          <Routes>
            {/* Set a default route */}
            <Route index element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/tomato" element={<Tomato />} />
            <Route path="/home" element={<HomePage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
