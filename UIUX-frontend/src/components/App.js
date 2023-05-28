import React, { useState, useEffect } from 'react'
// import './App.css'
import LoginForm from "./Login/Login"
import Navigation from './Navigation/Navigation'
import Profile from './Profile/Profile'
import BookingOverview from './BookingOverview/BookingOverview'

import ModalCancelBooking from "./ModalCancelBooking/ModalCancelBooking"
import ModalAddParticipant from './ModalAddParticipant/ModalAddParticipant'
import RoomsOverview from "./RoomsOverview/RoomsOverview";

const App = () => {
    
    //? test database-----------------
    const room = "4A56"
    const duration = 105
    
    const [participantsState, setParticipantsState] = useState([]);

    // TODO Remove for final build
    useEffect(() => {
        setTimeout(() => {
            setParticipantsState([
                "phiy",
                "tily",
                "kkni",
                "ptso",
                "omse",
            ]);
        }, 2000);
    }, [participantsState]);
    //? test database-----------------

    return (
        <div className='container' style={{border: "1px solid blue"}}>

            {/*<Navigation />

            {/* <ModalAddParticipant />             */}
            {/* <ModalCancelBooking /> */}
            {/*<div style={{margin: "30px 0"}}></div><hr />

            <BookingOverview participants={participantsState} room={room} duration={duration}/>
            <div style={{margin: "30px 0"}}></div><hr />

            <Profile />
            <div style={{margin: "30px 0"}}></div><hr />*/}

            <LoginForm/>
            <div style={{margin: "30px 0"}}></div><hr />
            {/*<RoomsOverview/>*/}
        </div>
    )
}

export default App