import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Jwt, Load, User } from "../Atom/Atom";
import { useEffect } from "react";
import axios from "../Axios/Axios";
import { toast } from "react-toastify";

function NavBar() {
  const [user, setUser] = useRecoilState(User);
  const [jwt, setjwt] = useRecoilState(Jwt);
  const[loading,setLoading]=useRecoilState(Load)
  const navigate=useNavigate()
  useEffect(() => {
    setLoading(true)
    axios
      .post(
        "/verifyuser",
        {},
        {
          headers: {
            token: jwt,
          },
        }
      )
      .then((result) => {
        setLoading(false)
        if (result.data.status) {
          setUser({ status: true, name: result.data.name });
        } else {
          localStorage.removeItem("JWToken");
          setUser({ status: false, name: "" });
        }
      });
  }, []);
  const handleLogout=(e)=>
  {
    e.preventDefault();
    setUser({status:false,name:''})
    setjwt('')
    localStorage.removeItem("JWToken")
  }
  const handleMyBooking=(e)=>
  {
    e.preventDefault();
    if(user.status)
    {
      navigate("/mybooking")
    }
    else
    {
      toast.warning(`please Login!!`)
      setTimeout(()=>navigate("/login"),5000)
    }
  }
  return (<>{loading?(<></>):(
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand >AirBook</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link>
              <Link to="/" className="Link">
                Booking
              </Link>{" "}
            </Nav.Link>
            <Nav.Link>
              <Link onClick={handleMyBooking} className="Link">
                MyBookings
              </Link>
            </Nav.Link>
          </Nav>
          <Nav className="d-flex">
            {user.status ? (
              <>
                <Nav.Link>{user.name}</Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            ) : (
              <Nav.Link><Link className="Link" to="/login">Login</Link></Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>)}</>
  );
}

export default NavBar;
