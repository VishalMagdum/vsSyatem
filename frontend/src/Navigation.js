import React from 'react';
import { Link, Outlet, useNavigate } from "react-router-dom"
import axios from "axios"
import useAuth from './MyHooks/useAuth';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
const Navigation = (props) => {
  const navigate = useNavigate()
  const { setLogin } = useAuth();
  const Logout = async () => {
    try {
      const response = await axios.post("https://vcsystem.onrender.com/user/logout")
      setLogin(false)
      navigate("/", { replace: true });
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>

          <Navbar.Brand href="#"><i style={{ textAlign: 'center', color: "orangered", fontSize: "30px" }} class="fa-solid fa-folder-tree"></i>&nbsp; Version Control</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link className="nav-item nav-link" to="/Dashboard">Home </Link>
              <Link className="nav-item nav-link" to="/Repositories">Repositories </Link>
              <Link className="nav-item nav-link" to="/Collaborations">Collaborations</Link>
              <a className="nav-item nav-link" href="https://drive.google.com/file/d/106nDJ6KhfxSf-5WuREtimje8f7yBUkUN/view?usp=sharing" download="version_control_userguide.pdf" target='_blank'>Guide</a>
            </Nav>
            <Nav>
              <span>
                <button style={{ border: 0 }} className="" onClick={Logout}>Logout <i class="fa-solid fa-right-from-bracket"></i> </button>
              </span>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* <nav className="navbar navbar-expand-sm bg-body-tertiary bg-dark nav-back fixed-top">




        <div className="navbar-nav">
          <Link className="nav-item nav-link " to="/Dashboard">Home </Link>
          <Link className="nav-item nav-link " to="/Repositories">Repositories </Link>
          <Link className="nav-item nav-link " to="/Collaborations">Collaborations</Link>
          <span style={{ position: 'absolute', right: 0 }}>
            <button style={{ border: 0 }} className="nav-item nav-link bg-dark" onClick={Logout}>Logout <i class="fa-solid fa-right-from-bracket"></i> </button>
          </span>
        </div>
      </nav > */}
      <div className='all' style={{ marginTop: 100 }} >

        <Outlet />
      </div>
    </>
  );
}

export default Navigation;