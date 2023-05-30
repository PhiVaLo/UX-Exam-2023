import React, { useState, useEffect } from 'react'
import './RoomsOverview.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import "../config";
import Navigation from "../Navigation/Navigation";
const apiUrl = "http://localhost:3002";

const RoomsOverview = () => {
    const currentDate = new Date();
    let o = new Date();
    const [day, setDay] = useState(0);
    const [onetime, setOnetime] = useState(0);
    currentDate.setMonth(currentDate.getMonth() + 1);
    const rooms = [];
    rooms.push(); //TODO Push all relevant values from sqlite database

    const rightArrow = (event) => {
        event.preventDefault();
        setDay(increaseDay => increaseDay + 1);
    }

    const leftArrow = (event) => {
        event.preventDefault();
        setDay(decreaseDay => decreaseDay - 1);
    }

    const getDate = () => {
        const date = currentDate;
        date.setDate(currentDate.getDate() + day);
        return `${date.getDate()}/${date.getMonth()}`;
    }

    const getDateInMilliseconds = () => {
        const date = currentDate;
        date.setDate(currentDate.getDate() + day);
        date.setHours(0, 0, 0);
        return date.getTime();
    }

    const Grid = props => {
        const [roomsMap, setRoomsMap] = useState(new Map());
        const [bookingMap, setBookingMap] = useState(new Map());
        const [grids, setGrids] = useState([]);

        //let id = 'ID' //TODO Import id from logged in user
        let id = 1;

        useEffect(() => {
            (async function(){
                const locationsTemp = [];
                const roomsMapTemp = new Map();
                let response = await axios.get(apiUrl + `/universities/locations/` + id);

                if (response.data){
                    for (const location of response.data) {
                        locationsTemp.push(location);
                    }
                }else{
                    console.error("Cannot find universities from api")
                }

                for (const location of locationsTemp) {
                    roomsMapTemp.set(location, []);
                    response = await axios.get(apiUrl + `/universities/locations/${location.location_id}/rooms`);

                    if (response.data){
                        for (const room of response.data) {
                            roomsMapTemp.get(location).push(room);
                        }
                    }else{
                        console.error("Cannot find universities from api")
                    }
                }

                const curTime = new Date();
                curTime.setDate(curTime.getDate() + day);

                const toTime = new Date();
                toTime.setDate(toTime.getDate() + 1 + day);
                const tempGrids = [];

                for (const [key, value] of roomsMapTemp) {
                    const colList = [];
                    for (const room of value){
                        const response = await axios.get(apiUrl + `/rooms/${room.room_id}/bookings/${curTime.getTime()}&${toTime.getTime()}`);
                        let statusColor = "status-green";

                        if (response.data === 'OK'){
                        }else{
                            if (response.data.length < 3){
                                statusColor = 'status-green';
                            }else if (response.data.length < 6){
                                statusColor = 'status-yellow';
                            }else{
                                statusColor = 'status-red';
                            }
                        }

                        colList.push(<Col onClick={() => redirect(room)} className={`colBox ${statusColor}`}>
                            <strong>{room.name}</strong>
                        </Col>);
                    }
                    tempGrids.push(
                        <h1 className='rowHeader'>{key.name}</h1>,
                        <Row className='rowGrid' xs={4} md={5} lg={6}>
                            {colList}
                        </Row>
                    );
                }

                setRoomsMap(roomsMapTemp);
                setGrids(tempGrids);
            })();
        }, [onetime]);


        return (
            <Container className='containerGrid'>
                {grids}
            </Container>
        )
    }



    return (
        <div>
            <Navigation/>

        <div className='rooms-overview'>

            <div className='dates-container'>
                <form className="my-date">{getDate()}</form>

                <button className='date-backward'>
                    <i className="fa-solid fa-angle-left" onClick={leftArrow}></i>
                </button>

                <button className='date-forward'>
                    <i className="fa-solid fa-angle-right" onClick={rightArrow}></i>
                </button>

            </div>

            <div className="location-container">
                {<Grid/>}
            </div>
        </div>
        </div>
    )
}
function redirect(room) {
    global.config.obj.Room = room;
    window.location.href = "/room"
}



export default RoomsOverview
