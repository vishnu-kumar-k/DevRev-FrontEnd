import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import "../stylesheet/Flight.css";
import axios from "../Axios/Axios";
import { ToastContainer, toast } from "react-toastify";
import { useRecoilState, useRecoilValue } from "recoil";
import { FlightId, User } from "../Atom/Atom";
import { useNavigate } from "react-router-dom";
export const Flights = ({ fl }) => {
  const[flightId,setFilghtId]=useRecoilState(FlightId)
  const navigate=useNavigate()
  const user=useRecoilValue(User)
  function subtractTimes(departureDate, departureTime, arrivalDate, arrivalTime) {
    departureDate=departureDate.split("T")
    arrivalDate=arrivalDate.split("T")
    const departureDateTime = new Date(`${departureDate[0]}T${departureTime}`);
    const arrivalDateTime = new Date(`${arrivalDate[0]}T${arrivalTime}`);
    const diff = Math.abs(departureDateTime - arrivalDateTime);
  
    const hours = Math.floor(diff / (1000 * 60 * 60))
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((diff / (1000 * 60)) % 60)
      .toString()
      .padStart(2, "0");
    if (minutes === "00") {
      return `${hours} h`;
    } else {
      return `${hours} h ${minutes} m`;
    }
  }
  
  function convertTo12HourFormat(time) {
    let hour = parseInt(time.substring(0, 2));
    let minute = time.substring(3, 5);
    let meridiem = "AM";

    if (hour > 12) {
      hour = hour - 12;
      meridiem = "PM";
    } else if (hour === 12) {
      meridiem = "PM";
    } else if (hour === 0) {
      hour = 12;
    }

    return `${hour}:${minute} ${meridiem}`;
  }
  function convertDate(date) {
    const dateObj = new Date(date);
    const options = { month: "short", day: "numeric", year: "numeric" };
    const formattedDate = dateObj.toLocaleDateString("en-US", options);
    return formattedDate;
  }
  
  const handleBook=(e)=>
  {
    e.preventDefault();
    setFilghtId(fl);
    if(user.status)
    {
    navigate("/passengerinfo")
    }
    else
    {
      toast.warning(`please Login!!!`);
      setTimeout(()=>navigate("/login"),5000);

    }
  }
  return (
    <div>
        <ToastContainer />
      <Card style={{ marginTop: "1em",marginBottom:"1em" }}>
        <Card.Header>
          <div className="d-flex justify-content-evenly">
            <div className="flighttime">
              {convertTo12HourFormat(fl.departureTime)}
            </div>

            <div></div>
            <div className="flighttime">
              {convertTo12HourFormat(fl.arrivalTime)}
            </div>
          </div>
          <div className="d-flex justify-content-evenly">
            <div md={4} xs={4} className="flightdate">
              {convertDate(fl.departureDatetime)}
            </div>

            <div></div>
            <div className="flightdate">{convertDate(fl.arrivalDatetime)}</div>
          </div>
          <div className="d-flex justify-content-evenly">
            <div md={4} xs={4} className="flightdate">
              {fl.sourceLocation}
            </div>

            <div className="flightdate">{subtractTimes(fl.departureDatetime,fl.departureTime,fl.arrivalDatetime,fl.arrivalTime)}</div>
            <div className="flightdate">{fl.destinationLocation}</div>
          </div>
        </Card.Header>
        <Card.Body className="d-flex justify-content-evenly">
          <div ><p >Name : <span>{fl.flightName}</span></p>
          <p>Airline Name : <span>{fl.airlineName}</span></p>
          <p>Price : ₹<span>{fl.flightPrice.toLocaleString("en-IN")}</span></p>
          <p>Seats Available : <span>{fl.seatCount}</span></p>
          </div>
        </Card.Body>
    