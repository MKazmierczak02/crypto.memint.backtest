import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Table } from "react-bootstrap";
import Loader from "./Loader";
import AlertMessage from "./AlertMessage";
import "../App.css";
import { listSimulations } from "../actions/simulationsActions";
import SimulationRow from "./SimulationRow";  // Dodajemy nowy komponent dla wiersza symulacji

const SimulationList = () => {
  const dispatch = useDispatch();
  const simulationsList = useSelector((state) => state.simulationsList);
  const { loading, error, simulations } = simulationsList;

  useEffect(() => {
    dispatch(listSimulations());
  }, [dispatch]);

  return (
    <Container className="mt-5">
      <h1 className="saira-condensed-bold text-center">Your Simulations</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <AlertMessage variant={"danger"}>{error}</AlertMessage>
      ) : (
        <Row>
          <Col>
            <Table striped bordered hover className="custom-table mt-3">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Strategy</th>
                  <th>Symbol</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Initial Balance</th>
                  <th>Final Balance</th>
                  <th>ROI [%]</th>
                  <th>Max Drawdown [%]</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {simulations.map((simulation) => (
                  <SimulationRow key={simulation.id} simulation={simulation} />
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default SimulationList;
