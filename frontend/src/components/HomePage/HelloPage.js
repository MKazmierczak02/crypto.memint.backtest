import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';

const HelloPage = () => {

  return (
      <section className="d-flex align-items-center min-vh-100">
          <Container>
              <Row className="w-100">
                  <Col md={6} className="d-flex justify-content-center align-items-center">
                      <h1 className={"saira-condensed-extralight header"}>MAKE YOUR TRADING <br/>
                          <strong className={"saira-condensed-bold"}>MORE EFFECTIVE</strong>
                      </h1>
                  </Col>
                  <Col md={6} className="d-none d-md-flex justify-content-center align-items-center">
                      <img src="/static/media/main-pc.webp" alt="Trading" className="img-fluid"/>
                  </Col>
              </Row>
              <Row className="w-100 justify-content-center">
                  <button className={"get-started-btn saira-condensed-regular mt-5"}>Get Started</button>
              </Row>
          </Container>
      </section>
  );
};

export default HelloPage;
