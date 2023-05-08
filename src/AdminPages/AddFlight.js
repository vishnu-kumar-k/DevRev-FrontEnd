import { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import flight from "../Images/flight.png";
import axios from "../Axios/Axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export const AddFlight = () => {
  const [formData, setFormData] = useState({
    name: "",
    sourceLocation: "",
    destinationLocation: "",
    departureDate: "",
    arrivalDate: "",
    flightPrice: "",
    airlineName: "",
    seatCount: "",
    departureTime: "",
    arrivalTime: "",
  });
const Navigate=useNavigate()
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const departureDate = new Date(formData.departureDate);
    const arrivalDate = new Date(formData.arrivalDate);
    if (arrivalDate < departureDate) {
      toast.warning("Arrival Date is before Departure Date");
    } else {
      axios.post("/addflight", formData).then((result) => {
        if (result.data.status) {
          toast.success("Added Successfully");
          setTimeout(()=>Navigate("/admin"),5000)
          Navigate("/admin")
        } else {
          toast.info("Something went Wrong");
        }
      });
    }
  };

  return (
    <>
      <Container>
        <ToastContainer />
        <Row>
          <Col md={3} xs={0}></Col>
          <Col md={6} xs={12} className="form-outline">
            <div class="d-flex justify-content-center" style={{fontSize:"1.5em",fontWeight:500,color:"red"}}>Add Flight</div>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col xs={4}>
                  <Form.Label className="label">Flight Name</Form.Label>
                  <br />
                  <br />
                  <Form.Label className="label">Depart Location</Form.Label>
                  <br />
                  <br />
                  <Form.Label className="label">
                    Destination Location
                  </Form.Label>
                  <br />
                  <br />
                  <Form.Label className="label">Departure Date</Form.Label>
                  <br />
                  <br />
                  <Form.Label className="label">Arrival Date</Form.Label>
                  <br />
                  <br />
                  <Form.Label className="label">Flight Price</Form.Label>
                  <br />
                  <br />
                  <Form.Label className="label">Airline Name</Form.Label>
                  <br />
                  <br />
                  <Form.Label className="label">Departure Time</Form.Label>
                  <br />
                  <br />
                  <Form.Label className="label">Reach Time</Form.Label>
                </Col>
                <Col xs={8}>
                  <Form.Control
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <br />
                  <Form.Control
                    type="text"
                    name="sourceLocation"
                    required
                    value={formData.sourceLocation}
                    onChange={handleChange}
                  />
                  <br />

                  <Form.Control
                    type="text"
                    name="destinationLocation"
                    required
                    value={formData.destinationLocation}
                    onChange={handleChange}
                  />
                  <br />
                  <Form.Control
                    type="date"
                    name="departureDate"
                    min={new Date().toISOString().slice(0, 10)}
                    required
                    value={formData.departureDate}
                    onChange={handleChange}
                  />
                  <br />
                  <Form.Control
                    type="date"
                    name="arrivalDate"
                    min={new Date().toISOString().slice(0, 10)}
                    required
                    value={formData.arrivalDate}
                    onChange={handleChange}
                  />
                  <br />
                  <Form.Control
                    type="number"
                    name="flightPrice"
                    required
                    value={formData.flightPrice}
                    onChange={handleChange}
                  />
                  <br />
                  <Form.Control
                    type="text"
                    name="airlineName"
                    required
                    value={formData.airlineName}
                    onChange={handleChange}
                  />
                  <br />
                  <Form.Control
                    type="time"
                    name="departureTime"
                    required
                    value={formData.departureTime}
                    onChange={handleChange}
                  />
                  <br />
                  <Form.Control
                    type="time"
                    name="arrivalTime"
                    required
                    value={formData.arrivalTime}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              <br />
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-outline-primary">
                  {" "}
                  Submit
                </button>
              </div>
            </Form>
          </Col>
          <Col md={3} xs={0}></Col>
        </Row>
      </Container>
    </>
  );
};
