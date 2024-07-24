import React from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <Navbar expand="lg" variant="dark" className={"saira-condensed-bold fixed-top"}>
      <Container>
        <Navbar.Brand as={Link} to="/" className={"navbar-logo"}>MEMINT</Navbar.Brand>
        <Navbar.Toggle aria-controls="" className="nav-toggle" />
        <Navbar.Collapse>
          <Nav className="ms-auto align-items-center navbar-nav">
            <Nav.Link href="#how-it-works" className="me-3">Home</Nav.Link>
            <Nav.Link href="#" className="me-3">Pricing</Nav.Link>
            <Nav.Link href="#" className="me-3">Tools</Nav.Link>
            <Nav.Link href="#" className="me-3">About</Nav.Link>
            <Nav.Link as={Link} to={"/login"} className="">Log in</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
