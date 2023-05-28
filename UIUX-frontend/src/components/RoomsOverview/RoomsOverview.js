import React, { useState, useEffect } from 'react'
import './RoomsOverview.css'
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

    //Test case:
    let testa = [];
    testa.push(
        <h1 className='rowHeader'>location.name</h1>,
        <Row className='rowGrid' xs={4} md={5} lg={6}>
            <Col className='colBox status-green'>
                <strong>Room1</strong>

                <p className='colBox-info'><strong>Status:</strong> Fully Booked</p>
            </Col>
            <Col className='colBox'>Room2</Col>
            <Col className='colBox'>Room3</Col>
            <Col className='colBox'>Room4</Col>
            <Col className='colBox'>Room5</Col>
            <Col className='colBox'>Room6</Col>
        </Row>
    )

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
                <Container className='containerGrid'>
                    {testa}
                </Container>
            </div>
        </div>
    )
}
function redirect(room) {//TODO needs to redirect to chosen room

}
const createGrid = () => {
    let locations = [];
    let grids = [];

    let id = 'ID' //TODO Import id from logged in user

    axios.get(apiUrl + `/universities/locations/` + {id}).then(function (response) {
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
                let status = room.status; /*TODO might need to be changed according to api*/
                colList.push(<Col onClick={redirect(room)} className={`colBox ${status.includes('Very') ? 'status-red' : status.includes('Mildly') ? 'status-yellow' : 'status-green'}`}> {/*TODO Values might need to be changed (very & mildly)*/}
                    {room.name}
                    <p className='colBox-info'><strong>Status:</strong> {status}</p>
                </Col>);
            })

            grids.push(
                <h1 className='rowHeader'>{location.name}</h1>,
                <Row className='rowGrid' xs={4} md={5} lg={6}>
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
