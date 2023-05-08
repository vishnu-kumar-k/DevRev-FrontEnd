import React, { useState } from "react";
import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import "../stylesheet/Flight.css";
import axios from "../Axios/Axios";
import { ToastContainer, toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { AdminFlightId } from "../Atom/Atom";
import { useNavigate } from "react-router-dom";
export const ViewFlight = ({ fl }) => {
  const [flightId, setFlightId] = useRecoilState(AdminFlightId);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function subtractTimes(time1, time2) {
    const date1 = new Date(`1970-01-01T${time1}Z`);
    const date2 = new Date(`1970-01-01T${time2}Z`);
    const diff = Math.abs(date1 - date2);
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
  const handleConfirmRemove = (e) => {
    e.preventDefault();
    axios
      .post("/admin/removeflight", { id: fl.flightId })
      .then((result) => {
        if (result.data.status) {
          toast.success("Removed Successfully");
        } else {
          toast.info("Try after Sometime");
        }
      })
      .catch((err) => console.log(err));
  };
  const handlebooking = async (e) => {
    e.preventDefault();
    await setFlightId(fl);
    navigate("/admin/booking");
  };
  return (
    <div>
      <ToastContainer />
      <Card style={{ marginTop: "1em" }}>
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

            <div className="flightdate">
              {subtractTimes(fl.arrivalTime, fl.departureTime)}
            </div>
            <div className="flightdate">{fl.destinationLocation}</div>
          </div>
        </Card.Header>
        <Card.Body>
          <p>
            Name : <span>{fl.flightName}</span>
          </p>
          <p>
            Airline Name : <span>{fl.airlineName}</span>
          </p>
          <p>
            Price : ₹<span>{fl.flightPrice.toLocaleString("en-IN")}</span>
          </p>
          <p>
            Seats Available : <span>{fl.seatCount}</span>
          </p>
        </Card.Body>
        <Card.Footer>
          <div className="d-flex justify-content-around">
            {fl.status === 1 ? (
              <button
                className="btn btn-outline-success"
                onClick={handleShow}
              >
                Remove Flight
              </button>
            ) : (
              <button className="btn btn-success">Removed Flight</button>
            )}
            <button className="btn btn-outline-danger" onClick={handlebooking}>
              View Booking
            </button>
          </div>
        </Card.Footer>
      </Card>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Are You Sure to Remove?</Modal.Title>
        </Modal.Header>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleConfirmRemove}>Yes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}