import {useLocation, useNavigate} from 'react-router-dom';
import React, { useState, useEffect } from "react";
import "./Profile.css";

import { FaTimes } from "react-icons/fa";
import axios from "axios";
import Navigation from "../Navigation/Navigation";

const apiUrl = "http://localhost:3002/";



const Profile = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const User = location.state.user;
    const getDate = (time) => {
        const date = new Date();
        date.setTime(time);
        return date.toDateString();
    }

    const deleteBooking = (booking) => {
        axios.delete(apiUrl + `bookings/${booking.id}`).then(res => setOneTime(1));
    }

    const LogOut = (event) => {
        window.location.href = "/";
    }

    const [bookingsInfo, setBookingsInfo] = useState([]);
    const [oneTime, setOneTime] = useState(0);

    useEffect(() => {
        (async function () {
            let response = await axios.get(
                apiUrl +
                    `users/${User.user_id}/bookings/${new Date().getTime()}&${
                        new Date().getTime() + 86400000 * 5
                    }`
            );
            const userBookings = response.data;
            const tempBookingsInfo = [];

            if (userBookings === "OK"){
                return;
            }

            for (const userBooking of userBookings) {
                const booking = (
                    await axios.get(
                        apiUrl + `bookings/${userBooking.booking_id}`
                    )
                ).data;
                const bookingMemberCount = response.data.length;
                const room = (
                    await axios.get(apiUrl + `rooms/${userBooking.room_id}`)
                ).data;
                const roomName = room.name;
                tempBookingsInfo.push({
                    roomName: roomName,
                    memberCount: bookingMemberCount,
                    startTime: booking.date_time,
                    duration: booking.duration,
                    id: booking.booking_id,
                });
            }

            setBookingsInfo(tempBookingsInfo);
        })();
    }, [oneTime]);

    return (
        <div>
            <Navigation />
            <div className="container profile mt-4">
                <div>
                    <h2>Profile</h2>
                    <hr />
                </div>
                <button type="button" className="btn btn-danger logout-btn" onClick={LogOut}>
                    Logout
                </button>
                <div>
                    <p>
                        <b>Name</b>: {User.email}
                    </p>
                    <p>
                        <b>Role</b>:{" "}
                        {"Student" /*TODO maybe put logic in here*/}</p>
            </div>
            <div style={{ margin: "200px 0" }}></div>{" "}
            <div>
                <p>
                    <b>My Bookings</b>
                </p>
                <div className="booking-wrapper">
                    {bookingsInfo.map((booking, index) => (
                        <div className="booking-container" key={index}>
                            <button type="button" className="btn booking-btn"
                                >
                                    {`Room: ${
                                        booking.roomName
                                    },    Participants: ${
                                        booking.memberCount
                                    },    Start time: ${getDate(
                                        booking.startTime
                                    )},    Duration: ${booking.duration} hours`}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => deleteBooking(booking)}
                                    className="remove-booking"
                                >
                                    <FaTimes />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
