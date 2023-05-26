import React, { useState, useEffect } from "react";
import "./Profile.css";

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
                <p>
                    <b>Name</b>: John Doe
                </p>
                <p>
                    <b>Role</b>: Student
                </p>
            </div>
            <div style={{ margin: "100px 0" }}></div>{" "}
            {/* delete this line later */}
            <div>
                <p>
                    <b>My Bookings</b>
                </p>
                <div>
                    <div className="booking-container">
                        <button type="button" className="btn my-btn">
                            ROOM NAME
                        </button>
                        <p className="remove-booking">X</p>
                    </div>

                    {/* -------------------------------------------------------- */}
                    {/* The code above should generate the code below with data */}

                    <div className="booking-container">
                        <button
                            type="button"
                            className="btn my-btn"
                            style={{ color: "#ffaa99" }}
                        >
                            auto generated from data
                        </button>
                        <p className="remove-booking">X</p>
                    </div>
                    <div className="booking-container">
                        <button
                            type="button"
                            className="btn my-btn"
                            style={{ color: "#ffaa99" }}
                        >
                            auto generated from data
                        </button>
                        <p className="remove-booking">X</p>
                    </div>
                    {/* to be deleted */}
                </div>
                
            </div>
        </div>
    );
};

export default Profile;
