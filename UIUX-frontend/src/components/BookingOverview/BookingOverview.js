import React, {useEffect, useState} from 'react'
import './BookingOverview.css'
import ModalAddParticipant from '../ModalAddParticipant/ModalAddParticipant'
import ModalCancelBooking from '../ModalCancelBooking/ModalCancelBooking'
import axios from "axios";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Navigation from "../Navigation/Navigation";
import {Room} from "../RoomsOverview/RoomsOverview";

//import { FaBars, FaTimes, FaUser } from 'react-icons/fa'

const apiUrl = "http://localhost:3002";

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

    const ParticipantNames = (props) => {
        const [bookingParticipants, setParticipants] = useState([]);

        useEffect(() => {
            (async function(){
                const bookingId = 3;
                const usersTemp = [];
                const bookingDetails = [];
                let response = await axios.get(apiUrl + `/bookings/details/${bookingId}`);

                if (response.data){
                    for (const bookingsDetail of response.data) {
                        bookingDetails.push(bookingsDetail);
                    }
                }else {
                    console.error("Cannot find booking from api")
                }

                for (const bookingsDetail of bookingDetails) {
                    response = await axios.get(apiUrl + `/users/${bookingsDetail.user_id}`);

                    if (response.data){
                        usersTemp.push(response.data.email);

                    }else{
                        console.error("Cannot find user from api")
                    }
                }

                setParticipants(usersTemp);
            })();
        }, []);

        const list = [];

        bookingParticipants.forEach((participant) => {
            list.push(
                <p>{participant}</p>
            )
        })

        return (
            <div>
                <p><b>Participants</b>: {list}</p>

            </div>
        )
    }

    return (
        <div>
            <Navigation/>
        <div className='booking-overview m-4'>
            <div>
                <h2>Booking Information</h2>
                <hr />
            </div>
            <div>
                <p><b>Room name</b>: {props.room}</p>
                <p><b>Time</b>: {hours >= 1 ? (<span>{hours} hours </span>) : null} {minutes > 0 ? (<span>{minutes} minutes </span>) : null}  </p>
                {/*<p><b>Participants</b>: {props.participants.map((participant) => {
                    return <span key={participant}>{participant}, </span>
                })}</p>
                */}
                {<ParticipantNames/>}
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
        </div>
    )
}

export default BookingOverview
