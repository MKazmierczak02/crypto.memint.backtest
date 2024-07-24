import React from 'react';
import Navbar from "./Navbar";
import { Container } from "react-bootstrap";
import {useRouteError} from "react-router-dom";

import "../static/css/errorpage.css"
const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
      <main>
      <Navbar></Navbar>
          <Container className={"d-flex flex-column justify-content-center align-items-center vh-100 saira-condensed-regular"}>
              <h1>Oops!</h1>
              <p className={""}>Sorry, an unexpected error has occurred.</p>
              <p>
                  <a href={"/"}>
                      home
                  </a>
              </p>
          </Container>
      </main>
  );
};

export default ErrorPage;
