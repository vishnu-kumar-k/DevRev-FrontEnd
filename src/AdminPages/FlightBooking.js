import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { AdminFlightId, Jwt, Load } from "../Atom/Atom";
import axios from "../Axios/Axios";
import { TicketDetails } from "../Pages/TicketDetails";
import { Card } from "react-bootstrap";
import Loading from "../Components/Loading";
import { useNavigate } from "react-router-dom";

export const FlightBooking = () => {
  const [booking, setBooking] = useState([]);
  const fl = useRecoilValue(AdminFlightId);
  console.log(fl);
  const navigate = useNavigate();
  const [loading, setLoading] = useRecoilState(Load);
  useEffect(() => {
    setLoading(true);

    axios
      .post("/admin/flightbooking", { id: fl.flightId })
      .then((result) => {
        setLoading(false);
        setBooking(result.data.result);
        console.log(result);
      })
      .catch((err) => console.log(err));
  }, []);

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
    <div>
      {loading ? (
        <Loading />
      ) : (
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
                <div className="flightdate">
                  {convertDate(fl.arrivalDatetime)}
                </div>
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
            <Card.Body>
              <p>
                Flight Name : <span>{fl.flightName}</span>
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
              {booking.length ? (
                <>
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
                      {booking.map((ticket, index) => (
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
                </>
              ) : (
                <>No Booking</>
              )}
            </Card.Footer>
          </Card>
        </>
      )}
    </div>
  );
};
