import React, { useState } from 'react';
import './Login.css';


function LoginForm() {
    const [isLoginFormActive, setIsLoginFormActive] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
        if (event.target.value.length > 5) {
            setErrorMessage('');
        }
    }

    const handlePasswordChange = (event) => { //When Password Field changes
        setPassword(event.target.value);
        if (event.target.value.length > 7) {
            setErrorMessage('');
        }
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    }

    const handleLogin = (event) => { //Login Button Pressed
        event.preventDefault();
        if (username.length <= 5) {
            setErrorMessage('Username must be at least 6 characters in length');
            return;
        }
        if (password.length < 8) {
            setErrorMessage('Password must be at least 8 characters in length');
            return;
        }
        // TODO: AJAX/Fetch login
        // For now just set an error message
        setErrorMessage('Invalid username/password combination');
    };

    const handleSignup = (event) => { //Sign Up Button Pressed
        event.preventDefault();
        if (username.length <= 5) {
            setErrorMessage('Username must be at least 6 characters in length');
            return;
        }
        if (password.length < 8) {
            setErrorMessage('Password must be at least 8 characters in length');
            return;
        }
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match')
            return;
        }
        // TODO: AJAX/Fetch signup operation here.
        // For now just set an error message
        setErrorMessage('Signup is currently not implemented');
    };


    return (
        <div className="container">
            {isLoginFormActive ? (
                <form className="form" id="login" onSubmit={handleLogin}>
                    <h1 className="form-title">Login</h1>
                    <div className="form-message form-message-error">{errorMessage}</div>
                    <div className="form-input-group">
                        <input
                            type="text"
                            className={`form-input ${errorMessage.includes('Username') ? 'form-input-error' : ''}`}
                            autoFocus
                            placeholder="Username"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                        <div className="form-input-error-message"></div>
                    </div>
                    <div className="form-input-group">
                        <input
                            type="password"
                            className={`form-input ${errorMessage.includes('Password') ? 'form-input-error' : ''}`}
                            placeholder="Password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <div className="form-input-error-message"></div>
                    </div>
                    <button className="form-button" type="submit">Log in</button>
                    <p className="form-text">
                        <a href="#" className="form-link">Forgot your password?</a>
                    </p>
                    <p className="form-text">
                        <a
                            className="form-link"
                            onClick={() => setIsLoginFormActive(false)}
                        >
                            Don't have an account? Create account
                        </a>
                    </p>
                </form>
            ) : (
                <form className="form" id="SignUp" onSubmit={handleSignup}>
                    <h1 className="form-title">Create Account</h1>
                    <div className="form-message form-message-error">{errorMessage}</div>
                    <div className="form-input-group">
                        <input
                            type="text"
                            className={`form-input ${errorMessage ? 'form-input-error' : ''}`}
                            autoFocus
                            placeholder="Username"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                        <div className="form-input-error-message"></div>
                    </div>
                    <div className="form-input-group">
                        <input
                            type="password"
                            className={`form-input ${errorMessage.includes('Password') ? 'form-input-error' : ''}`}
                            placeholder="Password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <div className="form-input-error-message"></div>
                    </div>
                    <div className="form-input-group">
                        <input
                            type="password"
                            className={`form-input ${password !== confirmPassword ? 'form-input-error' : ''}`}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                        />
                        <div className="form-input-error-message"></div>
                    </div>
                    <button className="form-button" type="submit">Sign up</button>
                    <p className="form-text">
                        <a href="#" className="form-link">Forgot your password?</a>
                    </p>
                    <p className="form-text">
                        <a
                            className="form-link"
                            onClick={() => setIsLoginFormActive(true)}
                        >
                            Already have an account? Sign in
                        </a>
                    </p>
                </form>
            )}
        </div>
    );
}

export default LoginForm;
