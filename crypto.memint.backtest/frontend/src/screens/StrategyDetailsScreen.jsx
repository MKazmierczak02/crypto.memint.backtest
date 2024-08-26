import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listStrategyDetails } from "../actions/strategyActions";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import StrategyDetails from "../components/StrategyDetails";

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
              <StrategyDetails strategy={strategy}/>
            </Col>
          </Row>
        )
      )}
    </Container>
  );
};

export default StrategyDetailsScreen;
