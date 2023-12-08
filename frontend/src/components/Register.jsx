import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Register.css';
import { createUser } from '../api/api';

/**
 * Component for the user registration page.
 * @function Register
 * @returns {JSX.Element} - Rendered component.
 */
function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const navigate = useNavigate();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    /**
     * Validates the user registration form.
     * @function validateForm
     */
    const validateForm = () => {
        const isUsernameValid = username.length > 0; // Add your own validation logic
        const isEmailValid = emailRegex.test(email);
        const isPasswordValid = passwordRegex.test(password);
        const isConfirmPasswordValid = password === confirmPassword;

        setIsFormValid(isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid);
    };

    /**
     * Handles the form submission.
     * @function handleSubmit
     * @param {React.FormEvent<HTMLFormElement>} e - The form submit event.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Reset error and success messages
        setUsernameError('');
        setEmailError('');
        setPasswordError('');
        setSuccessMessage('');
        setErrorMessage('');
    
        try {
            const userData = {
                username,
                email,
                password,
            };
    
            console.log('Submitting user data:', userData);
    
            // Call the createUser function to create the user
            const response = await createUser(userData);
            console.log('Registration response:', response);
    
            // Set the success message and navigate to login
            setSuccessMessage('Registration successful! You can now login.');
            setTimeout(() => {
                navigate('/home');
            }, 3000);
    
        } catch (error) {
            // Set the error message based on the response from the server
            console.error('Registration error:', error);
    
            if (error.response) {
                // The server responded with a status code that falls out of the range of 2xx
                setErrorMessage(`Error: ${error.response.data.message}`);
            } else if (error.request) {
                // The request was made but no response was received
                setErrorMessage('No response received from the server.');
            } else {
                // Something happened in setting up the request that triggered an Error
                setErrorMessage('An error occurred while creating the account.');
            }
            setIsFormValid(false);
        }
    }
    

    /**
     * Renders the registration form.
     * @returns {JSX.Element} - Rendered component.
     */
    return (
        <div className="wrapper">
            <form onSubmit={handleSubmit} action="">
                <h1>Register</h1>
                <div className="input-box">
                    <input value={username} onChange={(e) => { setUsername(e.target.value); validateForm(); }} type="text" placeholder="Username" id='username' required />
                    <i className='bx bxs-user'></i>
                    {usernameError && <p className="error-message">{usernameError}</p>}
                </div>
                <div className="input-box">
                    <input value={email} onChange={(e) => { setEmail(e.target.value); validateForm(); }} type="email" placeholder="Email" id='email' required />
                    <i className='bx bxs-user'></i>
                    {emailError && <p className="error-message">{emailError}</p>}
                </div>
                <div className="input-box">
                    <input value={password} onChange={(e) => { setPassword(e.target.value); validateForm(); }} type="password" placeholder="Password" id='password' required />
                    <i className='bx bxs-lock-alt'></i>
                    {passwordError && <p className="error-message">{passwordError}</p>}
                </div>
                <div className="input-box">
                    <input value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value); validateForm(); }} type="password" placeholder="Confirm Password" id='confirmPassword' required />
                    <i className='bx bxs-lock-alt'></i>
                </div>
                <button type="submit" className="btn" disabled={!isFormValid}>Register</button>
                {successMessage && <p className="success-message">{successMessage}</p>}
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <div className="login-link">
                    <p>Do you have an account?
                        <Link to="/login">Login</Link></p>
                </div>
            </form>
        </div>
    )
}

export default Register;
