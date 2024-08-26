import React from "react";
import {Container} from "react-bootstrap";
import SimulationList from "../components/SimulationList";

const SimulationScreen = () => {

    return (
        <Container className={"min-vh-100"}>
        <SimulationList />
        </Container>
    );
};

export default SimulationScreen