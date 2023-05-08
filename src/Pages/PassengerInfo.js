import React, { useState } from "react";
import { Card, Form } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import { FlightId } from "../Atom/Atom";
import axios from "../Axios/Axios";
import { Jwt } from "../Atom/Atom";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PassengerInfo = () => {
  const [passengerCount, setPassengerCount] = useState(1);
  const [passengers, setPassengers] = useState([]);
  const [index, setIndex] = useState(1);
  const [pcount, setPCount] = useState(true);
  const jwt = useRecoilValue(Jwt);
  const fl = useRecoilValue(FlightId);
  const navigate = useNavigate();
  const handlePassengerCountChange = (e) => {
    const c = parseInt(e.target.value);
    setIndex(1);
    if (c > 9) {
      setPassengerCount(Math.min(9, fl.seatCount));
      setPassengers(
        Array(Math.min(9, fl.seatCount)).fill({
          name: "",
          gender: "",
          ageGroup: "",
          phoneNumber: "",
        })
      );
    } else if (c <= 0) {
      setPassengerCount(1);
      setPassengers(
        Array(0).fill({
          name: "",
          gender: "",
          ageGroup: "",
          phoneNumber: "",
        })
      );
    } else {
      setPassengerCount(c);
      setPassengers(
        Array(c || 1).fill({
          name: "",
          gender: "",
          ageGroup: "",
          phoneNumber: "",
        })
      );
    }

    console.log(passengers);
  };
  const handleNext = (e) => {
    e.preventDefault();
    setIndex((prev) => prev + 1);
  };
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const newPassengers = [...passengers];
    newPassengers[index - 1] = {
      ...newPassengers[index - 1],
      [name]: value,
    };
    setPassengers(newPassengers);
  };
  function subtractTimes(
    departureDate,
    departureTime,
    arrivalDate,
    arrivalTime
  ) {
    departureDate = departureDate.split("T");
    arrivalDate = arrivalDate.split("T");
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
    try {
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
    } catch (err) {
      return "";
    }
  }
  function convertDate(date) {
    const dateObj = new Date(date);
    const options = { month: "short", day: "numeric", year: "numeric" };
    const formattedDate = dateObj.toLocaleDateString("en-US", options);
    return formattedDate;
  }

  const handleBook = async (e) => {
    e.preventDefault();
    var n = new Date();
    axios
      .post("/booking", {
        passenger: passengers,
        flightId: fl.flightId,
        currentDate: n.toISOString(),
        token: jwt,
      })
      .then((result) => {
        if (result.data.status) {
          toast.success("Booking confirmed");
          setTimeout(() => {
            navigate("/mybooking");
          }, 5000);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
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
              {subtractTimes(
                fl.departureDatetime,
                fl.departureTime,
                fl.arrivalDatetime,
                fl.arrivalTime
              )}
            </div>
            <div className="flightdate">{fl.destinationLocation}</div>
          </div>
        </Card.Header>
        <Card.Body className="d-flex justify-content-evenly">
          <div>
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
          </div>
        </Card.Body>
      </Card>
      <ToastContainer />
      <div className="d-flex justify-content-center">
        <div className="col-md-6">
          <>
            {pcount ? (
              <>
                <label htmlFor={`no`}>Enter no of Passengers:</label>
                <Form.Control
                  type="number"
                  id="no"
                  value={passengerCount}
                  onChange={handlePassengerCountChange}
                />
                <br />
                <button
                  className="btn btn-outline-primary"
                  onClick={(e) => setPCount(!pcount)}
                >
                  Next
                </button>
                <br />
                <br />
              </>
            ) : (
              <>
                <label htmlFor={`no1`}>Number of Passengers:</label>
                <Form.Control
                  type="number"
                  id="no1"
                  onChange={handlePassengerCountChange}
                  disabled
                />
                <br />
                <button
                  className="btn btn-outline-primary"
                  onClick={(e) => setPCount(!pcount)}
                >
                  Edit
                </button>
                <br />
              </>
            )}
            <br />
            {!pcount ? (
              <>
                <form className="passenger-form">
                  Passenger {index}
                  <br />
                  <br />
                  <Form.Label htmlFor={`name-${index}`}>Name:</Form.Label>
                  <Form.Control
                    type="text"
                    id={`name-${index}`}
                    name="name"
                    required
                    value={passengers[index - 1]?.name}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                  <Form.Label htmlFor={`gender-${index}`}>Gender:</Form.Label>
                  <Form.Select
                    id={`gender-${index}`}
                    name="gender"
                    value={passengers[index - 1]?.gender}
                    onChange={(e) => handleInputChange(e, index)}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Form.Select>
                  <Form.Label htmlFor={`age-group-${index}`}>
                    Age Group:
                  </Form.Label>
                  <Form.Select
                    id={`age-group-${index}`}
                    name="ageGroup"
                    value={passengers[index - 1]?.ageGroup}
                    onChange={(e) => handleInputChange(e, index)}
                  >
                    <option value="">Select Age Group</option>
                    <option value="child">Child (below 18)</option>
                    <option value="adult">Adult (18-60)</option>
                    <option value="senior">Senior (above 60)</option>
                  </Form.Select>
                  <Form.Label htmlFor={`phone-number-${index}`}>
                    Phone Number:
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id={`phone-number-${index}`}
                    name="phoneNumber"
                    required
                    value={passengers[index - 1]?.phoneNumber}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                  <br />
                  <br />
                  {index > 1 ? (
                    <button
                      className="btn btn-outline-primary"
                      onClick={(e) => setIndex(index - 1)}
                    >
                      Back
                    </button>
                  ) : (
                    <></>
                  )}
                  {index < passengerCount ? (
                    <button
                      type="submit"
                      onClick={(e) => setIndex((prev) => prev + 1)}
                      className="btn btn-outline-primary"
                      disabled={
                        !passengers[index - 1]?.name ||
                        !passengers[index - 1]?.gender ||
                        !passengers[index - 1]?.ageGroup ||
                        !passengers[index - 1]?.phoneNumber
                      }
                    >
                      Next
                    </button>
                  ) : (
                    <>
                      <button
                        className="btn btn-outline-success"
                        type="submit"
                        disabled={
                          !passengers[index - 1]?.name ||
                          !passengers[index - 1]?.gender ||
                          !passengers[index - 1]?.ageGroup ||
                          !passengers[index - 1]?.phoneNumber
                        }
                        onClick={handleBook}
                      >
                        Submit
                      </button>
                    </>
                  )}
                </form>
              </>
            ) : (
              <></>
            )}
          </>
        </div>
      </div>
    </>
  );
};

export default PassengerInfo;
