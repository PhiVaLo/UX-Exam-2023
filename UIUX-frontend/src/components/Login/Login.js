import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
const apiUrl = "http://localhost:3002";


function LoginForm() {
    const [isLoginFormActive, setIsLoginFormActive] = useState(true);
    const [isGuestFormActive, setIsGuestFormActive] = useState(false);
    const [guestID, setGuestID] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [university, setUniversity] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const regex = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);

    const handleEmailChange = (event) => {
        setUserEmail(event.target.value);
        if (regex.test(userEmail)) {
            setErrorMessage('');
        }
    }

    const handlePasswordChange = (event) => { //When Password Field changes
        setPassword(event.target.value);
        if (event.target.value.length > 7) {
            setErrorMessage('');
        }
    };

    const handleGuestIDChange = (event) => {
        setGuestID(event.target.value);
    }

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    }

    const handleUniversityChange = (event) => {
        setUniversity(event.target.value);
        if (university.length !== 0) {
            setErrorMessage('')
        }
    }

    const getUniversities = () => {//TODO Interact with data so show universities:
        const universities = [];
        let response = axios.get(apiUrl + `/universities`).then(response => {
            if (response.data){
                for (const university of response.data) {
                    universities.push(university);
                }
            }else{
                console.error("Cannot find universities from api")
            }

            const body = (
                <select
                    className={`form-input ${errorMessage.includes('University') ? 'form-input-error' : ''}`}
                    onChange={handleUniversityChange}
                >
                    {universities && universities.map(university => (<option value={university.university_name} >{university.university_name}</option>))}
                </select>
            )

            return body;
        });


    }

    const getOption = (value, label) => {
        return (<option value={value} >{label}</option>);
    }

    const handleLogin = (event) => { //Login Button Pressed
        event.preventDefault();
        /*if (!regex.test(userEmail)) {
            setErrorMessage('Not an Email');
            return;
        }
        if (password.length < 8) {
            setErrorMessage('Password must be at least 8 characters in length');
            return;
        }*/

        axios.get(apiUrl + `/login/${userEmail}&${password}`).then(function (response) {
            if (response.data){
                // TODO implement successful login
                console.log("Successful login!");
            }else{
                // TODO For now just set an error message
                setErrorMessage('Invalid email/password combination');
            }
        });

    };

    const handleSignup = (event) => { //Sign Up Button Pressed
        event.preventDefault();
        if (!regex.test(userEmail)) {
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
        if (university.length === 0) {
            setErrorMessage('Please choose a University');
            return;
        }
        // TODO: AJAX/Fetch signup operation here.
        // For now just set an error message
        setErrorMessage('Signup is currently not implemented');
    };

    const handleGuestLogin = (event) => {
        event.preventDefault();
        //TODO Implement datacheck against ID and University
    }


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
                            value={userEmail}
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
                            value={userEmail}
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
                        {getUniversities()}
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
