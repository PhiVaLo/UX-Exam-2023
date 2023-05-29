import React, { useState, useEffect } from "react";
import "./App.css";
import LoginForm from "./Login/Login";
import Navigation from "./Navigation/Navigation";
import Profile from "./Profile/Profile";
import BookingOverview from "./BookingOverview/BookingOverview";
import ChooseRoom from "./ChooseRoom/ChooseRoom";

import ModalCancelBooking from "./ModalCancelBooking/ModalCancelBooking";
import ModalAddParticipant from "./ModalAddParticipant/ModalAddParticipant";

import { WindowWidthProvider } from "./WindowWidthContext";
import RoomsOverview from "./RoomsOverview/RoomsOverview";

const App = () => {
    //? test database-----------------
    const room = "4A56";
    const duration = 105;

    const [participantsState, setParticipantsState] = useState([]);


    // TODO Remove for final build
    useEffect(() => {
        setTimeout(() => {
            setParticipantsState(["phiy", "tily", "kkni", "ptso", "omse"]);
        }, 2000);
    }, [participantsState]);
    //? test database-----------------

    return (
        <WindowWidthProvider>
            <div>
                <Navigation />

                <div className="container debug-box">
                    <ChooseRoom />
                </div>

                <div className="container debug-box">
                    <Profile />
                </div>

                <div className="container debug-box">
                    <BookingOverview
                        participants={participantsState}
                        room={room}
                        duration={duration}
                    />
                </div>

                <div className="container debug-box">
                    <LoginForm />
                </div>

                <div className="container debug-box">
                    <ModalAddParticipant />
                </div>

                <div className="container debug-box">
                    <ModalCancelBooking />
                </div>

                <div className="container debug-box">
                    <RoomsOverview />
                </div>
            </div>
        </WindowWidthProvider>
    );
};

export default App;
