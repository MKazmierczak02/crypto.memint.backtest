import React, { useState } from 'react';
import axios from 'axios';
import { Alert, Card, Col, Container, Form, Row } from 'react-bootstrap';
import '../../static/css/loginform.css'
import {Link} from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:8000/api/simulator/symbols');
      console.log(response);
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  return (
    <Container className="vh-100 align-content-center saira-condensed-regular">
      <h1 className="text-center mb-4">Log in</h1>
      <Row className="justify-content-center">
        <Col md={7}>
          <Card className="rounded-5 shadow-lg">
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3 form-group-lg" controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="form-control-lg"
                  />
                </Form.Group>
                <Form.Group className="mb-3 form-group-lg" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="form-control-lg"
                  />
                </Form.Group>
                {errors && (
                  <Alert variant="danger" role="alert">
                    ERROR
                  </Alert>
                )}
                <p>
                  Dont have an account yet?
                  Sign in here: <Link to={"/signup"}>Sign up!</Link>
                </p>
                <button className="login-button w-100 btn-lg">
                  Log In
                </button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
