import React, { useState, useEffect } from 'react'
import './BookingOverview.css'



const BookingOverview = (props) => {

    const hours = Math.floor(props.duration/60)
    const minutes = props.duration % 60

    return (
        <div className='booking-overview m-4'>
            <div>
                <h2>Booking Information</h2>
                <hr />
            </div>
            <div>
                <p><b>Room name</b>: {props.room}</p>
                <p><b>Time</b>: {hours >= 1 ? (<span>{hours} hours </span>) : null} {minutes > 0 ? (<span>{minutes} minutes </span>) : null}  </p>
                <p><b>Parcicipants</b>: {props.participants.map((participant) => { return <span key={participant}>{participant}, </span> })}</p>
            </div>


            <div>
                <button type="button" className="btn my-btn">Add Participant</button>
            </div>
            <div>
                <button type="button" className="btn my-btn">Cancel Booking</button>
            </div>
        
        </div>
    )
}

export default BookingOverview
