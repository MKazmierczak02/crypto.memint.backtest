import React from 'react';
import StrategyList from '../components/StrategyList';
import {Container} from "react-bootstrap";

const StrategyScreen = () => {
  return (
    <Container className={"min-vh-100"}>
      <StrategyList />
    </Container>
  );
};

export default StrategyScreen;
