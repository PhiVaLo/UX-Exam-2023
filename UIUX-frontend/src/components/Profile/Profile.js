import React, { useState, useEffect } from "react";
import "./Profile.css";

import { FaTimes } from "react-icons/fa";
import axios from "axios";
//import {User} from "../Login/Login";

const apiUrl = "http://localhost:3002/";

const Profile = () => {
    const User = {
        user_id: 1
    };
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        (async function () {
            const response = await axios.get(apiUrl + `/${User.user_id}/bookings/${new Date().getTime()}&${new Date().getTime() + 86400000 * 2}`);
            console.log(response);
            console.log(5);
            const userBookings = response.data;
            setBookings(userBookings);
            console.log(bookings);
            console.log(10);
        })();
    });

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
                    {bookings.map((booking, index) => (
                        <div className="booking-container" key={index}>
                            <button type="button" className="btn booking-btn">
                                {booking.room_name}
                            </button>
                            <button type="button" className="remove-booking">
                                <FaTimes />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Profile;
