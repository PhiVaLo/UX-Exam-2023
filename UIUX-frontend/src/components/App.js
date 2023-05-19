import React, { useState, useEffect } from 'react'
// import './App.css'
import LoginForm from "./Login/Login"
import Navigation from './Navigation/Navigation'
import Profile from './Profile/Profile'
import BookingOverview from './BookingOverview/BookingOverview'

const App = () => {
    
    //? test database-----------------
    const participants = [
        "phiy",
        "tily",
        "kkni",
        "ptso",
        "omse",
    ]
    const room = "4A56"
    const duration = 105
    //? test database-----------------



    return (
        <div className='container' style={{border: "1px solid blue"}}>
            <Navigation />

            <BookingOverview participants={participants} room={room} duration={duration}/>
            <div style={{margin: "30px 0"}}></div><hr />

            <Profile />
            <div style={{margin: "30px 0"}}></div><hr />

            <LoginForm/>
        </div>
    )
}

export default App