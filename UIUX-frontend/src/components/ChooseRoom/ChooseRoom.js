import React, { useState, useEffect } from "react";
import "./ChooseRoom.css";

import { FaLessThan } from "react-icons/fa";

const ChooseRoom = () => {
    // window width
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const sm = 768;
    const md = 992;
    const lg = 1200;

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    });

    // const startHour = 10; // 10:00
    // const duration = 4; // booked for 4 hours

    const booked = (startHour, duration, username) => {
        const height = 40;
        return (
            <div
                className="booked-box"
                style={{
                    top: height * (startHour - 8 + 1),
                    height: duration * height,
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
                <button type="button" className="btn">
                    <span className="fa-solid fa-angle-left"></span>
                </button>
                <span>Date</span>
                <button type="button" className="btn">
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
                        <div>27/05</div>
                        {booked(10, 2, "Phi Va Lo")}
                        {booked(13, 1, "phi-1234567899999999999999999999999999"
                        )}
                    </div>
                </div>

                <div className="container-right">
                    <div className="date">
                        <div>28/05</div>
                        {booked(8, 2, "phiy")}
                        {booked(15, 2, "phiy")}
                    </div>
                </div>

                {windowWidth >= sm ? (
                    <div className="container-right">
                        <div className="date">
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
                            <div>31/05</div>
                            {booked(11, 1, "abc")}
                        </div>
                    </div>
                ) : (
                    ""
                )}










            </div>
            {/* -------------------------------------------------------------- */}
            <button type="button" className="btn book-time-btn">
                Book Time
            </button>
        </div>
    );
};

export default ChooseRoom;
