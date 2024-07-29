import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listStrategies } from "../actions/strategyActions";
import { Container, Row, Col, Table } from "react-bootstrap";
import Loader from "./Loader";
import AlertMessage from "./AlertMessage";
import StrategyRow from "./StrategyRow";
import "../App.css";

const StrategyList = () => {
  const dispatch = useDispatch();
  const strategyList = useSelector((state) => state.strategyList);
  const { loading, error, strategies } = strategyList;

  useEffect(() => {
    dispatch(listStrategies());
  }, [dispatch]);

  return (
    <Container className="mt-5">
      <h1 className="saira-condensed-bold text-center">Trading Strategies</h1>
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
                  <th>Name</th>
                  <th>Description At</th>
                  <th>Created at</th>
                  <th>Win [%]</th>
                </tr>
              </thead>
              <tbody>
                {strategies.map((strategy) => (
                  <StrategyRow key={strategy.id} strategy={strategy} />
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default StrategyList;
