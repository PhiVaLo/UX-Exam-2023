import React, { useState, useEffect } from 'react'
import './BookingOverview.css'
import ModalAddParticipant from '../ModalAddParticipant/ModalAddParticipant'
import ModalCancelBooking from '../ModalCancelBooking/ModalCancelBooking'

//import { FaBars, FaTimes, FaUser } from 'react-icons/fa'


const BookingOverview = (props) => {

    const hours = Math.floor(props.duration/60)
    const minutes = props.duration % 60

    const [showAddModal, setShowAddModal] = useState(false);
    const openAddModal = () => {
      setShowAddModal(true);
    };
    const closeAddModal = () => {
      setShowAddModal(false);
    };


    const [showCancelModal, setShowCancelModal] = useState(false);
    const openCancelModal = () => {
      setShowCancelModal(true);
    };
    const closeCancelModal = () => {
      setShowCancelModal(false);
    };


    
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
                <button type="button" className="btn my-btn" onClick={openAddModal}>
                    Add Participant
                </button>
                <div className='center-screen'>
                    {showAddModal && <ModalAddParticipant closeAddModal={closeAddModal} />}
                </div>
            </div>
            
            <div>
                <button type="button" className="btn my-btn" onClick={openCancelModal}>
                    Cancel Booking
                </button>
                <div className='center-screen'>
                    {showCancelModal && <ModalCancelBooking closeCancelModal={closeCancelModal} />}
                </div>                
            </div>
        
        </div>
    )
}

export default BookingOverview
