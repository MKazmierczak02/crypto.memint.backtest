import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listStrategyDetails } from "../actions/strategyActions";
import { Container, Row, Col, Card, Spinner, Alert, Table } from "react-bootstrap";

const StrategyDetailsScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const strategyDetails = useSelector((state) => state.strategyDetails);
  const { loading, error, strategy } = strategyDetails;

  useEffect(() => {
    dispatch(listStrategyDetails(id));
  }, [dispatch, id]);

  return (
    <Container className="min-vh-100 align-items-center align-content-center">
      {loading ? (
        <Row className="justify-content-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Row>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        strategy && (
          <Row className="justify-content-center">
            <Col md={8}>
              <Card>
                <Card.Header as="h5">{strategy.name}</Card.Header>
                <Card.Body>
                  <Card.Title>Strategy Details</Card.Title>
                  <Card.Text>{strategy.description}</Card.Text>

                  <h6>Parameters</h6>
                  <Table striped bordered hover size="sm">
                    <tbody>
                      {strategy.parameters &&
                        Object.entries(strategy.parameters).map(([key, value]) => (
                          <tr key={key}>
                            <td>{key}</td>
                            <td>{value}</td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>

                  <h6>Conditions</h6>
                  <Table striped bordered hover size="sm">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Indicator</th>
                        <th>Operator</th>
                        <th>Value</th>
                        <th>Join Operator</th>
                      </tr>
                    </thead>
                    <tbody>
                      {strategy.conditions &&
                        strategy.conditions.map((condition) => (
                          <tr key={condition.id}>
                            <td>{condition.id}</td>
                            <td>{condition.indicator}</td>
                            <td>{condition.operator}</td>
                            <td>{condition.value}</td>
                            <td>{condition.join_operator}</td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>

                  <h6>Actions</h6>
                  <Table striped bordered hover size="sm">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Action Type</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {strategy.actions &&
                        strategy.actions.map((action) => (
                          <tr key={action.id}>
                            <td>{action.id}</td>
                            <td>{action.action_type}</td>
                            <td>{action.amount}</td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )
      )}
    </Container>
  );
};

export default StrategyDetailsScreen;
