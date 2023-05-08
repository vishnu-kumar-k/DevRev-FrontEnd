import React, { useEffect, useState } from "react";
import axios from "../Axios/Axios";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useRecoilState } from "recoil";
import { Load } from "../Atom/Atom";
import { Flights } from "./Flights";
import "../stylesheet/Flight.css"
import Loading from "../Components/Loading";

export const Booking = () => {
  const [flight, setFlight] = useState([]);
  const [loading, setLoading] = useRecoilState(Load);
  const [sourceLocation, setSourceLocation] = useState([]);
  const [destinationLocation, setDestinationLocation] = useState([]);
  const [filter, setFilter] = useState(true);
  const [formData, setFormData] = useState({
    destinationLocation: "",
    sourceLocation: "",
    date: "",
  });
  console.log(formData);

  useEffect(() => {
    setLoading(true);
    axios
      .post("/flight", formData)
      .then(async (result) => {
        await setFlight(result.data.result);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [filter]);
  useEffect(() => {
    setLoading(true);
    axios
      .post("/location")
      .then((result) => {
        setLoading(false);
        setDestinationLocation(result.data.des);
        console.log(result.data.sor);
        setSourceLocation(result.data.sou);
        console.log(result.data.des);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(sourceLocation, destinationLocation[0]);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSearch = (e) => {
    e.preventDefault();
    setFilter(!filter);
  };
  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="filter-form">
            <Form>
              <Row>
                <Col md={3}>
                  <Form.Label>Start Location</Form.Label>
                  <Form.Control
                    as="select"
                    name="sourceLocation"
                    value={formData.sourceLocation}
                    onChange={handleChange}
                  >
                    <option value="">All location</option>
                    {sourceLocation.map((l, index) => (
                      <option key={index} value={l.sourceLocation}>
                        {l.sourceLocation}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
                <Col md={3}>
                  <Form.Label>Destination Location</Form.Label>
                  <Form.Control
                    as="select"
                    name="destinationLocation"
                    value={formData.destinationLocation}
                    onChange={handleChange}
                  >
                    <option value="">All location</option>
                    {destinationLocation.map((l, index) => (
                      <option key={index} value={l.destinationLocation}>
                        {l.destinationLocation}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
                <Col md={3}>
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={formData.date}
                    min={new Date().toISOString().slice(0, 10)}
                    onChange={handleChange}
                  />
                </Col>
                <Col md={3}>
                  <br />

                  <button
                    className="btn btn-danger"
                    onClick={handleSearch}
                  >
                    Search
                  </button>
                </Col>
              </Row>
            </Form>
          </div>
          {flight.length?(<>{flight.map((f, k) => (
                <Flights fl={f} />
              ))}</>):(<>No Flights for this search</>)}
        </>
      )}
    </Container>
  );
};
