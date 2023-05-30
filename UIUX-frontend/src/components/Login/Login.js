import {Link, useNavigate} from 'react-router-dom';
import './Login.css'
import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import "../config";
const apiUrl = "http://localhost:3002";

function LoginForm() {
    const navigate = useNavigate();
    const [isLoginFormActive, setIsLoginFormActive] = useState(true);
    const [isGuestFormActive, setIsGuestFormActive] = useState(false);
    const [guestID, setGuestID] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [university, setUniversity] = useState(1);
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

        if (university !== 0) {
            setErrorMessage('')
        }
    }

    const Universities = props => {
        const [universitiesList, setUniversitiesList] = useState([]);
        const unmountedRef = useRef(false);
        //useEffect(()=>()=>(unmountedRef.current = true), []);

        useEffect(() => {

            (async function(){
                let response = await axios.get(apiUrl + `/universities`);

                if(unmountedRef.current) return;

                const tempUniversities = [];
                if (response.data) {
                    for (const university of response.data) {
                        tempUniversities.push(university);
                    }

                    setUniversitiesList(tempUniversities);
                } else {
                    console.error("Cannot find universities from api")
                }

            })();

        }, [university]);


            return (
                <select
                    className={`form-input ${errorMessage.includes('University') ? 'form-input-error' : ''}`}
                    onChange={handleUniversityChange}
                    value={university}
                >
                    {universitiesList && universitiesList.map((university, index) => (<option value={index + 1} key={index + 1} >{university.university_name}</option>))}
                </select>
            )

        };




    const getOption = (value, label) => {
        return (<option value={value} >{label}</option>);
    }

    const handleLogin = (event) => { //Login Button Pressed
        event.preventDefault();

        if (!regex.test(userEmail)) {
            setErrorMessage('Not an Email');
            return;
        }
        if (password.length < 8) {
            setErrorMessage('Password must be at least 8 characters in length');
            return;
        }

        const data = {
            email:userEmail,
            password:password
        }
        axios.post(apiUrl + `/login`, data).then(function (response) {
            if (response.status === 404){
                console.error("Error connecting to the api, make sur backend is running!");
            }
            else if (response.headers.get('Login-status') == 1){
                // TODO redirect to correct url
                axios.get(apiUrl + `/users/email/${userEmail}`).then(response => {
                    navigate('/roomsoverview',{state:{user:response.data,guestUserId:false}});
                });
            }else{
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

        const data = {
            name:"Dummy User name",
            email:userEmail,
            password:password,
            university_id:university,
            role:"Dummy"
        }
        axios.post(apiUrl + '/users', data).then(response => {
            if (response.status === 404){
                console.error("Error connecting to the api\tMake sure it is running!");
            }else if (response.status === 200){
                console.log("Successfully created new user!");
            }
        });

        setIsLoginFormActive(true);
    };

    const handleGuestLogin = (event) => {
        event.preventDefault();
        axios.get(apiUrl + `/bookings/${guestID}`).then(response => {
            if (response.data !== 'OK'){
                navigate('/roomsoverview',{state:{user:false,guestUserId:response.data}});
                //TODO redirect to correct url
            }else{
                setErrorMessage('Not a valid guest ID');
            }
        });
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
                    {/*<p className="form-text">
                        <a href="#" className="form-link">Forgot your password?</a>
                    </p>*/}
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
                            setErrorMessage('');
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
                        {<Universities/>}
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
