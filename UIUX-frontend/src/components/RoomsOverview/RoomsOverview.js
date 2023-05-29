import React, { useState, useEffect } from 'react'
import './RoomsOverview.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import Navigation from "../Navigation/Navigation";
//const apiUrl = "http://localhost:3001";
const apiUrl = "http://localhost:3002";

const RoomsOverview = () => {
    const currentDate = new Date();
    let o = new Date();
    const [day, setDay] = useState(0);
    const [onetime, setOnetime] = useState(0);

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
        let date = currentDate;
        date.setDate(currentDate.getDate() + day);
        return `${date.getDate()}/${date.getMonth()}`;
    }

    const Grid = (props) => {
        const [roomsMap, setRoomsMap] = useState(new Map());
        const grids = [];

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

                setRoomsMap(roomsMapTemp);
            })();
        }, [onetime]);


        const colorList = new Map([
            ['Very', 'status-red'],
            ['Average', 'status-yellow'],
            ['Mildly', 'status-green']
        ]);

        roomsMap.forEach((roomList, location) => {

            console.log("drawing grid");
            const colList = [];

            for (const room of roomList) {
                // TODO function to calculate room bookings (colors)
                const status = "Very";
                colList.push(<Col onClick={redirect(room)} className={`colBox ${colorList.get(status)}`}>
                    <strong>{room.name}</strong>
                    {/*<p className='colBox-info'><strong>Status:</strong> {status}</p>*/}
                </Col>);
            }

            grids.push(
                <h1 className='rowHeader'>{location.name}</h1>,
                <Row className='rowGrid' xs={4} md={5} lg={6}>
                    {colList}
                </Row>
            );
        })

        return (
            <Container className='containerGrid'>
                {grids}
            </Container>
        )
    }

    //Test case:
    /*let testa = [];
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
    )*/

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

            <div className="location-container"> {/*LOCATIONS*/}
                {<Grid/>}
            </div>
        </div>
        </div>
    )
}
function redirect(room) {//TODO needs to redirect to chosen room
    // Method gets called every time useEffect from App is activated.

}



export default RoomsOverview
