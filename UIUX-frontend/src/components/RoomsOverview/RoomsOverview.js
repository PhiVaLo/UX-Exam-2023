import React, { useState, useEffect } from 'react'
import './RoomsOverview.css'
import MyDatePicker from "../MyDatePicker/MyDatePicker";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
const apiUrl = "http://localhost:3001";

const RoomsOverview = () => {
    const currentDate = new Date();
    let o = new Date();
    const [date, setDate] = useState(currentDate);
    const [day, setDay] = useState(0);

    const rooms = [];
    rooms.push(); //TODO Push all relevant values from sqlite database

    const [count, setCount] = useState(0);

    const rightArrow = (event) => {
        event.preventDefault();
        setDay(increaseDay => increaseDay + 1);
    }

    const leftArrow = (event) => {
        event.preventDefault();
        setDay(decreaseDay => decreaseDay - 1);
    }

    const getDate = () => {
        let date = currentDate;
        date.setDate(currentDate.getDate() + day);
        return `${date.getDate()}/${date.getMonth()}`;
    }

    return (
        <div className='rooms-overview'>

            <div className='date-container'>
                <form className="my-date">{getDate()}</form>

                <button className='date-backward'>
                    <i className="fa-solid fa-angle-left" onClick={leftArrow}></i>
                </button>

                <button className='date-forward'>
                    <i className="fa-solid fa-angle-right" onClick={rightArrow}></i>
                </button>

            </div>

            <div className="location-container"> {/*LOCATIONS*/}
                {createGrid}
            </div>
        </div>


    )

}

const createGrid = () => {
    let locations = [];
    let grids = [];
    axios.get(apiUrl + `/universities/locations/id`).then(function (response) {
        if (response.data){
            for (const location of response.data) {
                locations.push(location);
            }
        }else{
            console.error("Cannot find universities from api")
        }

        /* May need to be moved out of the then function */
        locations.forEach(location => {
            let rooms = [];
            axios.get(apiUrl + `/universities/locations/${location.location_id}/rooms`).then(function (response) {
                if (response.data){
                    for (const room of response.data) {
                        rooms.push(room);
                    }
                }else{
                    console.error("Cannot find universities from api")
                }
            });

            let colList = [];
            rooms.forEach(room => {
                colList.push(<Col>{room.name}</Col>);
            })

            grids.push(
                <Row xs={3} md={5}>
                    {colList}
                </Row>
            );
        })
    });

    return (
        <Container className='containerGrid'>
            {grids}
        </Container>
    )
}

export default RoomsOverview
