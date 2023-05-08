import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Jwt, Load } from "../Atom/Atom";
import axios from "../Axios/Axios";
import { TicketDetails } from "./TicketDetails";
import Loading from "../Components/Loading";
export const MyBooking = () => {
  const jwt = useRecoilValue(Jwt);
  const [booking, setBooking] = useState([]);
  const [loading, setLoading] = useRecoilState(Load);
  useEffect(() => {
    setLoading(true);
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
      .then((result) => {
        setBooking(result.data.result);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          {booking.length ? (
            <>
              {booking.map((b, i) => (
                <TicketDetails booking={b} />
              ))}
            </>
          ) : (
            <>No Booking</>
          )}
        </>
      )}
    </div>
  );
};
