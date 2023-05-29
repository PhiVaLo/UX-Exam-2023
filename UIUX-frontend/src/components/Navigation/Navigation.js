import React, { useContext } from "react";
import "./Navigation.css";

import { WindowWidthContext } from '../WindowWidthContext';
import '../config'

// import logo from "../../images/logo_transparent.png";
import logo from "../../images/logo2.png";

import { useRef } from "react";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";

const Navigation3 = () => {
    const navRef = useRef();

    // toggle dropdown
    const showNavBar = () => {
        navRef.current.classList.toggle("responsive-nav");
    };

    const redirectToProfile = (event) => {
        window.location.href = "/profile";
    }

    const windowWidth = useContext(WindowWidthContext);
    const sm = global.config.obj.size.sm;
    


    return (
        <header>
            <img className="logo" src={logo} alt="logo" />
            <nav ref={navRef}>
                <a href="/#">Booking</a>
                <a href="/#">Overview</a>
                <a href="/#">...</a>
                <a href="/#">...</a>
                <button className="avatar-btn" onClick={redirectToProfile}>
                    {windowWidth > sm ? <FaUser /> : "Profile"}
                    {/* <FaUser /> */}
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
