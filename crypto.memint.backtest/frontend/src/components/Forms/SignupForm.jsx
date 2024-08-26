import React, { useState } from 'react';
import { Alert, Card, Col, Container, Form, Row } from 'react-bootstrap';
import '../../static/css/loginform.css'
import {Link} from "react-router-dom";

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrors({ password: "Passwords do not match" });
      return;
    }

  };

  return (
    <Container className="vh-100 align-content-center saira-condensed-regular">
      <h1 className="text-center mb-4">Sign Up</h1>
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
                <Form.Group className="mb-3 form-group-lg" controlId="formConfirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                  Already have an account?
                  Log in here: <Link to={"/login"}>Log in!</Link>
                </p>
                <button className="login-button w-100 btn-lg">
                  Sign Up
                </button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupForm;
