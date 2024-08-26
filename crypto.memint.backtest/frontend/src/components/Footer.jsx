import React from 'react';
import {Col, Container, Nav, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate()
  return (
      <Container className={"saira-condensed-bold pt-4"}>
        <Row>
          <Col md={12} className="justify-content-center d-flex align-items-center">
            <Nav className="footer-nav">
              <Nav.Link onClick={() => navigate("/privacy-policy")} className="footer-link me-3">Privacy Policy</Nav.Link>
              <Nav.Link href="#terms-of-service" className="footer-link me-3">Terms of Service</Nav.Link>
              <Nav.Link href="#contact" className="footer-link">Contact</Nav.Link>
            </Nav>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="mt-2 d-flex justify-content-center align-items-center">
            <p className="">© 2023 MEMINT. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
  );
};

export default Footer;
