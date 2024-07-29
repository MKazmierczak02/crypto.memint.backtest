import React, { useState, useEffect } from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
import axios from "axios";

const NavigationBar = (username) => {

  const [healthy, setHealthy] = useState(false);

  useEffect(() => {
    const fetchHealthy = async () =>{
      const response = await axios.get("/api/check")
      if (response.data.status === "ok") {
        setHealthy(true);
      }
    }
    fetchHealthy()
  }, []);

  return (
    <Navbar expand="lg" variant="dark" className={"saira-condensed-bold fixed-top"}>
      <Container>
        <Navbar.Brand href="/" className={"navbar-logo"}>MEMINT</Navbar.Brand>
        <span className="navbar-badge" style={healthy ? {background: "green"} : {background: "red"}}></span>
        <Navbar.Toggle aria-controls="" className="nav-toggle"/>
        <Navbar.Collapse>
          <Nav className="ms-auto align-items-center navbar-nav">
            <Nav.Link href="#how-it-works" className="me-3">Home</Nav.Link>
            <Nav.Link href="#" className="me-3">Pricing</Nav.Link>
            <Nav.Link href="#" className="me-3">Tools</Nav.Link>
            <Nav.Link href="#" className="me-3">About</Nav.Link>
            <Nav.Link href={"/login"} className="">Log in</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
