import React, { useState, useEffect } from "react";
import "./Navigation.css";

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

    // window width
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const small = 768;

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    });

    return (
        <header>
            <img className="logo" src={logo} alt="logo" />
            <nav ref={navRef}>
                <a href="/#">Booking</a>
                <a href="/#">Overview</a>
                <a href="/#">...</a>
                <a href="/#">...</a>
                <button className="avatar-btn">
                    {windowWidth > small ? <FaUser /> : "Profile"}
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
