import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { loginUser } from '../api/api';

/**
 * Component for the login page.
 * @function Login
 * @returns {JSX.Element} - Rendered component.
 */
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const navigate = useNavigate();

    /**
     * Handles changes in the email input field.
     * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
     */
    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        setIsButtonDisabled(!validateForm(newEmail, password));
    };

    /**
     * Handles changes in the password input field.
     * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
     */
    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setIsButtonDisabled(!validateForm(email, newPassword));
    };

    /**
     * Validates the email and password for form submission.
     * @param {string} newEmail - The new email value.
     * @param {string} newPassword - The new password value.
     * @returns {boolean} - True if the form is valid, false otherwise.
     */
    const validateForm = (newEmail, newPassword) => {
        const isEmailValid = newEmail.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
        const isPasswordValid = newPassword.length > 5;
        return isEmailValid && isPasswordValid;
    };

    /**
     * Handles the form submission.
     * @param {React.FormEvent<HTMLFormElement>} e - The form submit event.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(email, password);
            console.log('Login success:', response);

            const { access_token } = response; // Extract access_token from the response

            // Store the access token in localStorage
            localStorage.setItem('access_token', access_token);

            console.log('Before redirection');
    navigate('/home');
    console.log('After redirection');
        } catch (error) {
            console.error('Login failed:', error);
            // Handle errors, such as displaying a message to the user
        }
    };

    /**
     * Renders the login form.
     * @returns {JSX.Element} - Rendered component.
     */
    return (
        <div className="wrapper">
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <div className="input-box">
                        <input value={email} onChange={handleEmailChange} id="username" name="username" type="email" placeholder="Email" required />
                        <i className='bx bxs-user'></i>
                    </div>
                    <div className="input-box">
                        <input value={password} onChange={handlePasswordChange} id="password" name="password" type="password" placeholder="Password" required />
                        <i className='bx bxs-lock-alt'></i>
                    </div>
                    <button type="submit" className="btn" disabled={isButtonDisabled}>Login</button>
                    <div className="register-link">
                        <p>Don't have an account?
                            <Link to="/register">Register</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
