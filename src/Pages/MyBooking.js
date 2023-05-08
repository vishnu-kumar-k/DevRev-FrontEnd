import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Jwt } from "../Atom/Atom";
import axios from "../Axios/Axios";
import { TicketDetails } from "./TicketDetails";

export const MyBooking = () => {
  const jwt = useRecoilValue(Jwt);
  const [booking, setBooking] = useState([]);
  useEffect(() => {
    axios
      .post(
        "/mybooking",
        {},
        {
          headers: {
            token: jwt,
          },
        }
      )
      .then((result) => setBooking(result.data.result))
      .catch((err) => console.log(err));
  }, []);
  console.log(booking);
  return (
    <div>
      {booking.length ? (
        <>
          {booking.map((b, i) => (
            <TicketDetails booking={b} />
          ))}
        </>
      ) : (
        <>No Booking</>
      )}
    </div>
  );
};
