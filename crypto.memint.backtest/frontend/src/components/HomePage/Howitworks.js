import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Cart from "./Cart";

const HowItWorks = () => {

  return (
          <section className="d-flex min-vh-100 align-items-center">
              <Container>
                  <Row className="w-100 mb-5">
                      <hr className="how-it-works-line"/>
                      <p className="how-works-sign ">
                          Let's see how \\<strong>it works</strong>
                      </p>
                  </Row>
                  <Row className="w-100 justify-content-around mt-5 saira-condensed-regular">
                      <Col md={3} className="d-flex justify-content-center align-items-center mb-5">
                          <Cart id={"01"}
                                name={"Select strategy"}
                                description={"Elevate your trading game by selecting from a diverse array of proven " +
                              "strategies. Customize your approach by choosing strategies that align with " +
                              "your risk appetite and investment goals. Our platform offers a broad " +
                              "spectrum of options, from conservative techniques focused on minimizing " +
                              "risk to aggressive strategies aimed at maximizing gains. Utilize the " +
                              "nsights of technical analysis and fine-tune your strategy to adapt to the " +
                              "ever-evolving cryptocurrency market."}/>
                      </Col>
                      <Col md={3} className="d-md-flex justify-content-center align-items-center mb-5">
                          <Cart id={"02"}
                                name={"Adjust variables"}
                                description={
                              "Refine your strategy to perfection by tweaking a variety of parameters. " +
                              "Determine the optimal periods for technical indicators that resonate with " +
                              "your market perspective. Adjust settings such as moving averages, RSI " +
                              "levels, and Bollinger bands to tailor your strategy. Our user-friendly " +
                              "interface allows for easy manipulation of these variables, giving you the " +
                              "control to backtest your custom strategies against historical data and " +
                              "sharpen your trading decisions."
                          }/>
                      </Col>
                      <Col md={3} className="d-md-flex justify-content-center align-items-center mb-5">
                          <Cart id={"02"}
                              name={"Wait for the results"}
                              description={
                                "Exercise patience while our robust simulation engine processes your " +
                                  "strategy against historical data. The platform meticulously evaluates " +
                                  "performance, providing you with comprehensive reports that detail gains, " +
                                  "losses, and key performance indicators. These insights enable you to " +
                                  "measure the effectiveness of your strategy and make data-driven decisions. " +
                                  "Enhance your trading prowess by learning from the past to anticipate " +
                                  "future market movements."
                          }/>
                      </Col>
                  </Row>
              </Container>
          </section>
  );
};

export default HowItWorks;
