import React, { useState, useEffect } from "react";
import "./App.css";
import LoginForm from "./Login/Login";
import Navigation from "./Navigation/Navigation";
import Profile from "./Profile/Profile";
import BookingOverview from "./BookingOverview/BookingOverview";
import ChooseRoom from "./ChooseRoom/ChooseRoom"

import ModalCancelBooking from "./ModalCancelBooking/ModalCancelBooking";
import ModalAddParticipant from "./ModalAddParticipant/ModalAddParticipant";

const App = () => {
    //? test database-----------------
    const room = "4A56";
    const duration = 105;

    const [participantsState, setParticipantsState] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setParticipantsState(["phiy", "tily", "kkni", "ptso", "omse"]);
        }, 2000);
    }, [participantsState]);
    //? test database-----------------

    return (
        <div>
            <Navigation />

            <div className="container debug-box">
                <ChooseRoom />
            </div>
{/* 
            <div className="container debug-box">
                <Profile />
            </div>

            <div className="container debug-box">
                <BookingOverview
                    participants={participantsState}
                    room={room}
                    duration={duration}
                />
            </div> */}

            {/* <div className="container debug-box"> */}
                {/* <LoginForm /> */}
            {/* </div> */}

            {/* <div className="container debug-box"> */}
                {/* <ModalAddParticipant /> */}
            {/* </div> */}

            {/* <div className="container debug-box"> */}
                {/* <ModalCancelBooking /> */}
            {/* </div> */}

        </div>
    );
};

export default App;
