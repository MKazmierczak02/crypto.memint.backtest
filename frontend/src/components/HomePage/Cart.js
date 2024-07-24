import React from 'react';
import {Col, Container, Row} from "react-bootstrap";

const Cart = (props) => {
  return (
      <Container className="step-container">
          <Row className="align-items-center">
              <Col>
                  <p className="step-nmb">{props.id}</p>
              </Col>
              <Col className="step-name-container">
                  <p className="step-name">
                      {props.name}
                  </p>
                  <hr className="step-line"/>
              </Col>
          </Row>
          <Row className="step-description">
              <p>
                  {props.description}
              </p>
          </Row>
      </Container>
  );
};

export default Cart;
