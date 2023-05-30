import React, { useState, useEffect, useContext } from "react";
import "./ChooseRoom.css";

import { WindowWidthContext } from "../WindowWidthContext";
import "../config";
import Navigation from "../Navigation/Navigation";

import {Day} from "../RoomsOverview/RoomsOverview";
import axios from "axios";

const apiUrl = "http://localhost:3002";

const ChooseRoom = () => {
    const User = global.config.obj.User;
    const Room = global.config.obj.Room;

    const [day, setDay] = useState(0);
    const [onetime, setOnetime] = useState(0);
    const rightArrow = (event) => {
        event.preventDefault();
        setDay(increaseDay => increaseDay + 1);
    }

    const leftArrow = (event) => {
        event.preventDefault();
        setDay(decreaseDay => decreaseDay - 1);
    }
    const windowWidth = useContext(WindowWidthContext);
    const sm = global.config.obj.size.sm;
    const md = global.config.obj.size.md;
    const lg = global.config.obj.size.lg;

    // const startHour = 10; // 10:00
    // const duration = 4; // booked for 4 hours

    const [selectedOptionDate, setSelectedOptionDate] = useState("");
    const [selectedOptionTimeStart, setSelectedOptionTimeStart] = useState("");
    const [selectedOptionTimeEnd, setSelectedOptionTimeEnd] = useState("");

    const handleOptionDateChange = (event) => {
        setSelectedOptionDate(event.target.value);
    };

    const handleOptionTimeStartChange = (event) => {
        setSelectedOptionTimeStart(event.target.value);
    };

    const handleOptionTimeEndChange = (event) => {
        setSelectedOptionTimeEnd(event.target.value);
    };

    const checkOverlap = () => {

    }

    const bookTime = (event) => {
        if (selectedOptionDate === ""){
            return;
        }
        if (selectedOptionTimeStart === ""){
            return;
        }
        if (selectedOptionTimeEnd === ""){
            return;
        }
        if (parseInt(selectedOptionTimeEnd) - parseInt(selectedOptionTimeStart) <= 0){
            return;
        }
        if (checkOverlap()){
            // If there is an overlap
        }

        const dateStart = new Date();
        dateStart.setHours( parseInt(selectedOptionTimeStart));
        dateStart.setDate(dateStart.getDate() + parseInt(selectedOptionDate));
        dateStart.setHours(dateStart.getHours());

        const data = {
            owner_id:User.user_id,
            room_id:Room.room_id,
            university_id: User.university_id,
            date_time: dateStart.getTime(),
            description: 'None',
            duration: (parseInt(selectedOptionTimeEnd) - parseInt(selectedOptionTimeStart))
        };

        axios.post(apiUrl + "/bookings", data).then(res => setOnetime(1));
    }

    const BookingsByDate = (props) => {
        const [bookings, setBookings] = useState([]);
        const date = props.date;
        const dayDate = new Date();
        dayDate.setTime(date);

        useEffect(() => {
            (async function(){
                const tempBookings = [];
                let response = await axios.get(apiUrl + `/rooms/${Room.room_id}/bookings/${date + (86400000 * 8/24)}&${date + (86400000 * (18 / 24))}`);

                if (response.data === "OK"){
                    // No bookings found
                    return;
                }

                for (const booking of response.data) {
                    const bookingDate = new Date();
                    bookingDate.setTime(booking.date_time);
                    const startHour = Math.round(bookingDate.getHours());
                    const duration = booking.duration;

                    let response = await axios.get(apiUrl + `/users/${booking.owner_id}`);
                    const username = response.data.email;
                    const role = response.data.role;
                    tempBookings.push(booked(startHour, duration, username, role));
                }

                setBookings(tempBookings);
            })();
        }, [onetime, day]);

        return <div className="date">
            <div>{`${dayDate.getDate()}/${dayDate.getMonth() + 1}`}</div>
            {bookings}
        </div>;
    }

    const getDate = (offset) => {
        const date = new Date();
        date.setDate(date.getDate() + offset);
        return `${date.getDate()}/${date.getMonth() + 1}`;
    }

    const booked = (startHour, duration, username, role) => {
        const height = 40;
        return (
            <div
                className="booked-box"
                style={{
                    top: height * (startHour - 8 + 1),
                    height: duration * height,
                    backgroundColor:
                        role == "student" ? "#beff88bf" : "#e75a76d2",
                }}
            >
                {startHour}:00 - {startHour + duration}:00,
                <b>
                    {" "}
                    {windowWidth < sm && username.length > 9
                        ? username.substring(0, 7) + "..."
                        : username.substring(0, 15)}
                </b>
            </div>
        );
    };

    return (
        <div>
            <Navigation/>

        <div className="m-4">
            <h2>{Room.name}</h2>
            <hr />
            {/* -------------------------------------------------------------- */}
            <div className="date-box mb-4">
                <button type="button" onClick={leftArrow} className="btn">
                    <span className="fa-solid fa-angle-left"></span>
                </button>
                <span>Date</span>
                <button type="button" onClick={rightArrow} className="btn">
                    <span className="fa-solid fa-angle-right"></span>
                </button>
            </div>

            <div className="date-container">
                <div className="left-column">
                    <div className="time empty">ㅤ</div>
                    <div className="time">08:00</div>
                    <div className="time">09:00</div>
                    <div className="time">10:00</div>
                    <div className="time">11:00</div>
                    <div className="time">12:00</div>
                    <div className="time">13:00</div>
                    <div className="time">14:00</div>
                    <div className="time">15:00</div>
                    <div className="time">16:00</div>
                    <div className="time">17:00</div>
                    <div className="time">18:00</div>
                </div>

                <div className="container-right">
                    <BookingsByDate
                        date={(new Date().getTime()) + (day * 86400000)}
                    />
                </div>

                <div className="container-right">
                    <BookingsByDate
                        date={(new Date().getTime() + 86400000) + (day * 86400000)}
                    />
                </div>

                {windowWidth >= sm ? (
                    <div className="container-right">
                        <BookingsByDate
                            date={(new Date().getTime() + 86400000 * 2)+ (day * 86400000)}
                        />
                    </div>
                ) : (
                    ""
                    )}

                {windowWidth >= md ? (
                    <div className="container-right">
                        <BookingsByDate
                            date={(new Date().getTime() + 86400000 * 3) + (day * 86400000)}
                        />
                    </div>
                ) : (
                    ""
                    )}

                {windowWidth >= lg ? (
                    <div className="container-right">
                        <BookingsByDate
                            date={(new Date().getTime() + 86400000 * 4) + (day * 86400000)}
                        />
                    </div>
                ) : (
                    ""
                )}
            </div>

            {/* -------------------------------------------------------------- */}

            <hr />

            <p className="center"><b>Select a date/time to book</b></p>
            <div className="book-time">
                <select value={selectedOptionDate} onChange={handleOptionDateChange} className="select-menu box1">
                    <option value="">Date</option>
                    {/* TODO: update date to currentDate, currentDate+1, ... */}
                    <option value="1">{getDate(0)}</option>
                    <option value="2">{getDate(1)}</option>
                    <option value="3">{getDate(2)}</option>
                    <option value="4">{getDate(3)}</option>
                    <option value="5">{getDate(4)}</option>
                </select>
                <select value={selectedOptionTimeStart} onChange={handleOptionTimeStartChange} className="select-menu box2">
                    <option value="">Start-Time</option>
                    {/* TODO: update time that is available */}
                    <option value="8">08:00</option>
                    <option value="9">09:00</option>
                    <option value="10">10:00</option>
                    <option value="11">11:00</option>
                    <option value="12">12:00</option>
                    <option value="13">13:00</option>
                    <option value="14">14:00</option>
                    <option value="15">15:00</option>
                    <option value="16">16:00</option>
                    <option value="17">17:00</option>
                    <option value="18">18:00</option>
                </select>
                <select value={selectedOptionTimeEnd} onChange={handleOptionTimeEndChange} className="select-menu box2">
                    <option value="">End-Time</option>
                    {/* TODO: update time that is available in range */}
                    <option value="9">09:00</option>
                    <option value="10">10:00</option>
                    <option value="11">11:00</option>
                    <option value="12">12:00</option>
                    <option value="13">13:00</option>
                    <option value="14">14:00</option>
                    <option value="15">15:00</option>
                    <option value="16">16:00</option>
                    <option value="17">17:00</option>
                    <option value="18">18:00</option>
                    <option value="19">19:00</option>
                </select>
                <button type="button" onClick={bookTime} className="btn book-time-btn">
                    Book Time
                </button>                
            </div>

            {/* -------------------------------------------------------------- */}
            {/* <button type="button" className="btn book-time-btn">
                Book Time
            </button> */}
        </div>
        </div>
    );
};

export default ChooseRoom;
