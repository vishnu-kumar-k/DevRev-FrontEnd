import React, { useState } from "react";
import "../stylesheet/UserLogin.css";
import axios from "../Axios/Axios";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Admin, AdminJwt, Jwt, User } from "../Atom/Atom";
export const AdminLogin = () => {
    const navigate=useNavigate()
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [user, setUser] = useRecoilState(Admin);
  const [jwt, setJwt] = useRecoilState(AdminJwt);
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/admin/login", { email, password })
      .then((result) => {
        if (result.data.status) {
          toast.success("Login Successfully");
          setJwt(result.data.jwt);
          setUser({ name: result.data.name, status: true });
          localStorage.setItem("AdminJWToken", result.data.jwt);
          setTimeout(()=>navigate("/admin"),5000)
        } else {
          toast.info(result.data.msg);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div className="Auth-form-container">
        <form onSubmit={handleSubmit}>
          <div className="Auth-form">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Admin Login</h3>
              <div className="form-group mt-3">
                <label>Email address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control mt-1"
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control mt-1"
                  placeholder="Enter password"
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>

                
              </div>
              <ToastContainer />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
