import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useRecoilState } from "recoil";
import { Admin, AdminJwt, Load } from "../Atom/Atom";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "../Axios/Axios";

function Menu() {
  const [admin, setAdmin] = useRecoilState(Admin);
  const[adminjwt,setAdminjwt]=useRecoilState(AdminJwt)
  const navigate=useNavigate();
  const [loading,setLoading]=useRecoilState(Load)
  useEffect(()=>
  {
    setLoading(true)
    axios.post("/verifyadmin",{},{headers:{
      token:adminjwt
    }}).then((result)=>
    {
      setLoading(false)
      if(result.data.status)
      {
        setAdmin({name:result.data.name,status:true})
      }
      else
      {
        navigate("/admin/login")
      }
    }).catch((err)=>console.log(err))
  },[]);
  const handleLogout=(e)=>
  {
    e.preventDefault();
    localStorage.removeItem("AdminJWToken")
    setAdmin({status:false,name:''})
    setAdminjwt('');
    navigate("/admin/login")
  }
  return (
    <>{loading?(<></>):(
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
              <Link to="/admin" className="Link">
                Flight
              </Link>
            </Nav.Link>
            <Nav.Link>
            <Link to="addflight" className="Link">
              AddFlight
            </Link>
          </Nav.Link>
          </Nav>
          <Nav className="d-flex">
            <Nav.Link className="Link">{admin.name}</Nav.Link>
            <Nav.Link className="Link" onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>)}</>
  );
}

export default Menu;




            