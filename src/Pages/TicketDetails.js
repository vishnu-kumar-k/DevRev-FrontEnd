import React, { useEffect, useState } from "react";
import axios from "../Axios/Axios";
import { Card, Container, Table } from "react-bootstrap";

export const TicketDetails = ({ booking }) => {
  const [ticketDetails, setTicketDetails] = useState([]);
  useEffect(() => {
    axios
      .post("/ticketdetails", {
        id: booking.bookingId,
      })
      .then((result) => {
        setTicketDetails(result.data.result);
        console.log(result);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(ticketDetails);
  function subtractTimes(departureDate, departureTime, arrivalDate, arrivalTime) {
    try{
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
  catch(err)
  {
   return" " 
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
  return (
    <>
      <Container>
        <Card style={{ marginTop: "1em" }}>
          <Card.Header>
            <div className="d-flex justify-content-evenly">
              <div className="flighttime">
                {convertTo12HourFormat(booking.departureTime)}
              </div>

              <div></div>
              <div className="flighttime">
                {convertTo12HourFormat(booking.arrivalTime)}
              </div>
            </div>
            <div className="d-flex justify-content-evenly">
              <div md={4} xs={4} className="flightdate">
                {convertDate(booking.departureDatetime)}
              </div>

              <div></div>
              <div className="flightdate">
                {convertDate(booking.arrivalDatetime)}
              </div>
            </div>
            <div className="d-flex justify-content-evenly">
              <div md={4} xs={4} className="flightdate">
                {booking.sourceLocation}
              </div>

              <div className="flightdate">
                {subtractTimes(booking.departureDatetime,booking.departureTime, booking.arrivalDatetime,booking.arrivalTime)}
              </div>
              <div className="flightdate">{booking.destinationLocation}</div>
            </div>
          </Card.Header>
          <Card.Body className="d-flex justify-content-evenly">
            <div>
              <p>
                Name : <span>{booking.flightName}</span>
              </p>
              <p>
                Airline Name : <span>{booking.airlineName}</span>
              </p>
              <p>
                Price : ₹<span>{booking.flightPrice.toLocaleString("en-IN")}</span>
              </p>
              <p>Booking Date:<span>{convertDate(booking.bookingDate)}</span></p>
            </div>
          </Card.Body>
          <Card.Footer>
            <table class="table table-responsive">
              <thead>
                <tr>
                  <th scope="col">S.No</th>
                  <th scope="col">Name</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Age Group</th>
                  <th scope="col">Gender</th>
                </tr>
              </thead>
              <tbody>
                {ticketDetails.map((ticket, index) => (
                  <tr key={ticket.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{ticket.name}</td>
                    <td>{ticket.phoneNumber}</td>
                    <td>{ticket.age}</td>
                    <td>{ticket.gender}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card.Footer>
        </Card>
      </Container>
    </>
  );
};
