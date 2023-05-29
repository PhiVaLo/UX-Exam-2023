import React, { useState, useEffect } from "react";
import "./Profile.css";

import { FaTimes } from "react-icons/fa";
import axios from "axios";
import Container from "react-bootstrap/Container";
const apiUrl = "http://localhost:3002";

const Profile = () => {
    const RoomList = (props) => {
        const lists = [];

        const [list, setList] = useState([]);

        const userId = {}; //TODO get current user_id
        const bookingsTemp = [];

        useEffect(() => {
            (async function () {
                const response = await axios.get(apiUrl + `/${userId}/bookings/`);
                if (response.data) {
                    for (const userBookings of response.data) {
                        bookingsTemp.push(userBookings);
                    }
                } else {
                    console.error("Cannot find bookings from api")
                }
            })();
        });

        // needs to be sorted by time

        const bookingList = [];

        for (const bookings of bookingsTemp) {
            bookingList.push(
                <div className="booking-container">
                    <button type="button" className="btn booking-btn">
                        {/*bookings.name*/}
                        test test

                    </button>
                    <button type="button" className="remove-booking">
                        <FaTimes/>
                    </button>
                </div>
            );
        }

        return (
            <div className='booking-wrapper'>
                {bookingList}
            </div>
        )
    }

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
            </div>

            {RoomList}

            <div/>
        </div>
    );
}

export default Profile;
