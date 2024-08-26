import React, {useState} from "react";
import {Button} from "react-bootstrap";
import {useSelector} from "react-redux";
import axios from "axios";

const SimulationRow = ({ simulation }) => {

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin
    const [task, setTask] = useState("");

    const handleStartSimulation = async (simulation) => {
        const config = {
        headers: {
            Authorization: `Bearer ${userInfo?.token}`,
        },
    };
        const response = await axios.post("/api/simulator/start",{ id: simulation.id }, config)
        setTask(response.data.task_id)
        console.log(JSON.stringify(response))
    };

    const handleStopSimulation = async (simulation) => {
        const config = {
        headers: {
            Authorization: `Bearer ${userInfo?.token}`,
        },
    };
        const response = await axios.post("/api/simulator/check",{ id: task }, config)
        console.log(JSON.stringify(response.data))
    };

  return (
    <tr>
      <td>{simulation.id}</td>
      <td>{simulation.strategy.name}</td>
      <td>{simulation.symbol.name}</td>
      <td>{simulation.start_date}</td>
      <td>{simulation.end_date}</td>
      <td>{simulation.initial_balance.toFixed(2)}</td>
      <td>{simulation.final_balance?.toFixed(2) || "N/A"}</td>
      <td>{simulation.roi?.toFixed(2) || "N/A"}</td>
      <td>{simulation.max_drawdown?.toFixed(2) || "N/A"}</td>
      <td className="d-flex justify-content-around align-items-center">
        <Button onClick={() => handleStartSimulation(simulation)} variant={"secondary"} className={"button-start-simulation saira-condensed-regular"}>START</Button>
        <Button onClick={() => handleStopSimulation(simulation)} variant={"secondary"} className={"button-stop-simulation saira-condensed-regular"}>STOP</Button>
        </td>
    </tr>
  );
};

export default SimulationRow;
