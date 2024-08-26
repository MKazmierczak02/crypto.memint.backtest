import {Button, Card, Table} from "react-bootstrap";
import React from "react";

const StrategyDetails = (props) => {

  const strategy = props.strategy;
      const handleUseStrategy = (strategy) => {
    console.log(`${strategy.id}`)
  };


    return (
        <Card>
                <Card.Header className="d-flex justify-content-between align-items-center">
                              <p>
                                  {strategy.name}
                              </p>
                              <Button onClick={() => handleUseStrategy(strategy)}
                                      variant={"secondary"}
                                      className={"button-strategy saira-condensed-regular"}>Use
                              </Button>
                </Card.Header>
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
    )
}

export default StrategyDetails;
