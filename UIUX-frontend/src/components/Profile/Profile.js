import React, { useState, useEffect } from "react";
import "./Profile.css";

import { FaTimes } from "react-icons/fa";

const Profile = () => {
    return (
        <div className="profile m-4">
            <div>
                <h2>Profile</h2>
                <hr />
            </div>
            <button type="button" className="btn btn-danger logout-btn">
                Logout
            </button>
            <div>
                <p><b>Name</b>: John Doe</p>
                <p><b>Role</b>: Student</p>
            </div>
            <div style={{ margin: "200px 0" }}></div>{" "}
            {/* delete this line later */}

            <div>
                <p>
                    <b>My Bookings</b>
                </p>
                <div className="booking-wrapper">

                    <div className="booking-container">
                        <button type="button" className="btn booking-btn">
                            Room Name
                        </button>
                        <button type="button" className="remove-booking">
                            <FaTimes />
                        </button>
                    </div>


                    {/* -------------------------------------------------------- */}
                    {/* The code above should generate the code below with data */}

                    <div className="booking-container">
                        <button type="button" className="btn booking-btn">
                            Room Name
                        </button>
                        <button type="button" className="remove-booking">
                            <FaTimes />
                        </button>
                    </div>
                    <div className="booking-container">
                        <button type="button" className="btn booking-btn">
                            Room Name
                        </button>
                        <button type="button" className="remove-booking">
                            <FaTimes />
                        </button>
                    </div>
                    <div className="booking-container">
                        <button type="button" className="btn booking-btn">
                            Room Name
                        </button>
                        <button type="button" className="remove-booking">
                            <FaTimes />
                        </button>
                    </div>
                    <div className="booking-container">
                        <button type="button" className="btn booking-btn">
                            Room Name
                        </button>
                        <button type="button" className="remove-booking">
                            <FaTimes />
                        </button>
                    </div>

                    {/* to be deleted */}
                </div>
                
            </div>
        </div>
    );
};

export default Profile;
