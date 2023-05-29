import React, { useState, useEffect, useContext } from "react";
import "./ChooseRoom.css";

import { WindowWidthContext } from "../WindowWidthContext";
import {Room} from "../RoomsOverview/RoomsOverview";
import "../config";

const ChooseRoom = () => {
    const [day, setDay] = useState(0);
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

    // TODO - startHour (all available timeslots (08-16))
    // TODO - duration (all available timeslots up to the next booked-startHour)

    const getBookingsByDate = (date) => {

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
        <div className="m-4">
            <h2>Room Name</h2>
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
                    <div className="date">
                        {() => getBookingsByDate(new Date().getTime() % 86400000 + day)}
                        <div>27/05</div>
                        {booked(10, 2, "Phi Va Lo", "student")}
                        {booked(
                            13,
                            1,
                            "phi-1234567899999999999999999999999999"
                        )}
                    </div>
                </div>

                <div className="container-right">
                    <div className="date">
                        {() => getBookingsByDate((new Date().getTime() + 86400000) % 86400000 + day)}
                        {/* update date to currentDate+1 */}
                        <div>28/05</div>
                        {booked(8, 2, "phiy")}
                        {booked(15, 2, "phiy", "student")}
                    </div>
                </div>

                {windowWidth >= sm ? (
                    <div className="container-right">
                        <div className="date">
                            {() => getBookingsByDate((new Date().getTime() + 86400000 * 2) % 86400000 + day)}

                            {/* update date to currentDate+2 */}
                            <div>29/05</div>
                            {booked(9, 5, "abc")}
                        </div>
                    </div>
                ) : (
                    ""
                    )}

                {windowWidth >= md ? (
                    <div className="container-right">
                        <div className="date">
                            {() => getBookingsByDate((new Date().getTime() + 86400000 * 3) % 86400000 + day)}
                            {/* update date to currentDate+3 */}
                            <div>30/05</div>
                            {booked(10, 1, "abc")}
                        </div>
                    </div>
                ) : (
                    ""
                    )}

                {windowWidth >= lg ? (
                    <div className="container-right">
                        <div className="date">
                        {/* update date to currentDate+4 */}
                            <div>31/05</div>
                            {booked(11, 1, "abc")}
                        </div>
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
                    <option value="option1">27/05</option>
                    <option value="option2">28/05</option>
                    <option value="option3">29/05</option>
                    <option value="option5">30/05</option>
                    <option value="option6">31/05</option>
                    <option value="option7">01/06</option>
                </select>
                <select value={selectedOptionTimeStart} onChange={handleOptionTimeStartChange} className="select-menu box2">
                    <option value="">Start-Time</option>
                    {/* TODO: update time that is available */}
                    <option value="option1">08:00</option>
                    <option value="option2">09:00</option>
                    <option value="option3">10:00</option>
                    <option value="option4">11:00</option>
                    <option value="option5">12:00</option>
                    <option value="option6">13:00</option>
                    <option value="option7">14:00</option>
                    <option value="option8">15:00</option>
                    <option value="option9">16:00</option>
                </select>
                <select value={selectedOptionTimeEnd} onChange={handleOptionTimeEndChange} className="select-menu box2">
                    <option value="">End-Time</option>
                    {/* TODO: update time that is available in range */}
                    <option value="option1">09:00</option>
                    <option value="option2">10:00</option>
                    <option value="option3">11:00</option>
                    <option value="option4">12:00</option>
                    <option value="option5">13:00</option>
                    <option value="option6">14:00</option>
                    <option value="option7">15:00</option>
                    <option value="option8">16:00</option>
                    <option value="option9">17:00</option>
                </select>
                <button type="button" className="btn book-time-btn">
                    Book Time
                </button>                
            </div>

            {/* -------------------------------------------------------------- */}
            {/* <button type="button" className="btn book-time-btn">
                Book Time
            </button> */}
        </div>
    );
};

export default ChooseRoom;
