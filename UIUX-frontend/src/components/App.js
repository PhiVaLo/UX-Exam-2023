import React, { useState, useEffect } from "react";
import "./App.css";
import LoginForm from "./Login/Login";
import Navigation from "./Navigation/Navigation";
import Profile from "./Profile/Profile";
import BookingOverview from "./BookingOverview/BookingOverview";
import ChooseRoom from "./ChooseRoom/ChooseRoom";

<<<<<<<<< Temporary merge branch 1
import ModalCancelBooking from "./ModalCancelBooking/ModalCancelBooking"
import ModalAddParticipant from './ModalAddParticipant/ModalAddParticipant'
import RoomsOverview from "./RoomsOverview/RoomsOverview";
=========
import ModalCancelBooking from "./ModalCancelBooking/ModalCancelBooking";
import ModalAddParticipant from "./ModalAddParticipant/ModalAddParticipant";

import { WindowWidthProvider } from "./WindowWidthContext";
>>>>>>>>> Temporary merge branch 2

const App = () => {
    //? test database-----------------
    const room = "4A56";
    const duration = 105;

    const [participantsState, setParticipantsState] = useState([]);

<<<<<<<<< Temporary merge branch 1
    // TODO Remove for final build
=========
>>>>>>>>> Temporary merge branch 2
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

<<<<<<<<< Temporary merge branch 1
            <LoginForm/>
            <div style={{margin: "30px 0"}}></div><hr />

            <RoomsOverview/>
        </div>
    )
}
=========
                <div className="container debug-box">
                    <LoginForm />
                </div>
>>>>>>>>> Temporary merge branch 2

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
