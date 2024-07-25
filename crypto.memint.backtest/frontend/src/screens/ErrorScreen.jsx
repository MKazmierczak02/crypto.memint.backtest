import React from 'react';
import { Container } from "react-bootstrap";
import {useRouteError} from "react-router-dom";

import "../static/css/errorpage.css"
const ErrorScreen = () => {
  const error = useRouteError();
  console.error(error);

  return (
          <Container className={"d-flex flex-column justify-content-center align-items-center vh-100"}>
              <h1>Oops!</h1>
              <p className={""}>Sorry, an unexpected error has occurred.</p>
              <p>
                  <a href={"/"}>
                      home
                  </a>
              </p>
          </Container>
  );
};

export default ErrorScreen;
