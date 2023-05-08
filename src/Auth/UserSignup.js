import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "../Axios/Axios";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Jwt, User } from "../Atom/Atom";

export const UserSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    password: "",
  });
  const navigate=useNavigate();
  const [user, setUser] = useRecoilState(User);
  const [jwt, setJwt] = useRecoilState(Jwt);

  // handle form submit
  function handleSubmit(event) {
    event.preventDefault();
    axios.post("/signup", formData).then((result) => {
      if (result.data.status) {
        toast.success("Signed Successfully");
        setJwt(result.data.jwt);
        setUser({ name: result.data.name, status: true });
        localStorage.setItem("JWToken", result.data.jwt);
        setTimeout(()=>navigate("/"),5000
        )
      } else {
        toast.info(result.data.msg);
      }
    });
  }

  // handle form field changes
  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  // render form
  return (
    <div className="Auth-form-container">
      <ToastContainer />
      <Form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Registration</h3>
          <Form.Group className="mt-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              required
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mt-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              required
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mt-3" required controlId="phoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              required
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mt-3" required controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              required
              rows={3}
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mt-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              required
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Group>
          <Button type="submit" className="mt-3" variant="primary">
            Submit
          </Button>
          <br />
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </Form>
    </div>
  );
};
