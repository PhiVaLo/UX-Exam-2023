import React, { useContext } from "react";
import "./Navigation.css";

import { WindowWidthContext } from '../WindowWidthContext';
import '../config'

// import logo from "../../images/logo_transparent.png";
import logo from "../../images/logo2.png";

import { useRef } from "react";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";
import {useNavigate, useLocation} from "react-router-dom";

const Navigation3 = () => {
    const navigate = useNavigate();
    const locationRouter = useLocation();
    const navRef = useRef();

    // toggle dropdown
    const showNavBar = () => {
        navRef.current.classList.toggle("responsive-nav");
    };

    const redirectToProfile = (event) => {
        navigate('/profile',{state:{user:locationRouter.state.user,guestUserId:locationRouter.state.user}});
    }

    const redirectToRoomOverview = (event) => {
        navigate('/roomsoverview',{state:{user:locationRouter.state.user,guestUserId:locationRouter.state.user}});
    }

    const windowWidth = useContext(WindowWidthContext);
    const sm = global.config.obj.size.sm;
    


    return (
        <header>
            <img className="logo" src={logo} alt="logo" />
            <nav ref={navRef}>
                <button className="avatar-btn" onClick={redirectToRoomOverview}>Overview</button> 
                <button className="avatar-btn" onClick={redirectToProfile}>
                   {/*windowWidth > sm ? <FaUser /> : "Profile"*/}
                    {<FaUser />}
                </button>
                <button className="nav-btn nav-close-btn" onClick={showNavBar}>
                    <FaTimes />
                </button>
            </nav>

            <button className="nav-btn" onClick={showNavBar}>
                <FaBars />
            </button>
        </header>
    );
};

export default Navigation3;
