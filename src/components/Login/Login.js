import React, { useState } from 'react';
import './Login.css';


function LoginForm() {
    const [isLoginFormActive, setIsLoginFormActive] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [university, setUniversity] = useState('Select University');
    const [errorMessage, setErrorMessage] = useState('');
    const regex = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        if (regex.test(email)) {
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

    const handleUniversityChange = (event) => {
        setUniversity(event.target.value);
        if (!university.includes('Select')) {

        }
    }

    const handleLogin = (event) => { //Login Button Pressed
        event.preventDefault();
        if (!regex.test(email)) {
            setErrorMessage('Not an Email');
            return;
        }
        if (password.length < 8) {
            setErrorMessage('Password must be at least 8 characters in length');
            return;
        }
        // TODO: AJAX/Fetch login
        // For now just set an error message
        setErrorMessage('Invalid email/password combination');
    };

    const handleSignup = (event) => { //Sign Up Button Pressed
        event.preventDefault();
        if (!regex.test(email)) {
            setErrorMessage('Not an Email');
            return;
        }
        if (password.length < 8) {
            setErrorMessage('Password must be at least 8 characters in length');
            return;
        }
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }
        if (university.includes('Select University')) {
            setErrorMessage('Please choose a University');
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
                            className={`form-input ${errorMessage.includes('Email') ? 'form-input-error' : ''}`}
                            autoFocus
                            placeholder="Email"
                            value={email}
                            onChange={handleEmailChange}
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
                    <p className="form-text">
                        <a href="#" className="form-link" onClick={() => {
                            setIsLoginFormActive(false);
                            setIsGuestFormActive(true);
                        }}
                        >
                            Continue as guest
                        </a>
                    </p>
                </form>
            ) : isGuestFormActive ? (
                <form className="form" id="Guest" onSubmit={handleGuestLogin}>
                    <h1 className="form-title">Guest Login</h1>
                    <div className="form-message form-message-error">{errorMessage}</div>
                    <div className="form-input-group">
                        <input
                            type="text"
                            className={`form-input ${errorMessage.includes('GuestID') ? 'form-input-error' : ''}`}
                            autoFocus
                            placeholder="ID"
                            value={guestID}
                            onChange={handleGuestIDChange}
                        />
                        <div className="form-input-error-message"></div>
                    </div>
                    <button className="form-button" type="submit">Log in</button>
                    <p className="form-text">
                        <a
                            className="form-link"
                            onClick={() => {
                                setIsLoginFormActive(true);
                                setIsGuestFormActive(false);
                        }}
                        >
                            Already have an account? Sign in
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
                            className={`form-input ${errorMessage.includes('Email') ? 'form-input-error' : ''}`}
                            autoFocus
                            placeholder="Email"
                            value={email}
                            onChange={handleEmailChange}
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
                    <div className="form-input-group">
                        <select
                            className={`form-input ${errorMessage.includes('University') ? 'form-input-error' : ''}`}
                            value={university}
                            onChange={handleUniversityChange}
                        >
                            //TODO Interact with data so show universities:
                            <option value="">Select University</option>
                            <option value="university1">University 1</option>
                            <option value="university2">University 2</option>
                            <option value="university3">University 3</option>
                        </select>
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
