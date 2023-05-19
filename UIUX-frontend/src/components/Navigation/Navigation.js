import React, { useState, useEffect } from "react";
import "./Navigation.css";
import logo from "../../images/logo_transparent.png";
import userAvatar from "../../images/icons8-user-64.png";

const Navigation = () => {
    return (
        <div className="navigation">
            <div className="nav-background"></div>
            <div>
                <img className="logo" src={logo} alt="logo" />
                <span>Title</span>
            </div>
            <div className="menu-right">
                <span className="md">Booking</span>
                <span>Overview</span>
                <span>Menu3</span>
                <span>...</span>
                <span><img className="avatar" src={userAvatar} alt="User Avatar" /></span>
            </div>
        </div>
    );
};

export default Navigation;
