import React, { useState } from "react";
import { Button, Toast, ToastContainer } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "axios";

const SimulationRow = ({ simulation }) => {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const [task, setTask] = useState("");
    const [toast, setToast] = useState({ show: false, message: "", variant: "" });

    const config = {
        headers: {
            Authorization: `Bearer ${userInfo?.token}`,
        },
    };

    const handleStartSimulation = async (simulation) => {
        try {
            const response = await axios.post("/api/simulator/start", { id: simulation.id }, config);
            setTask(response.data.task_id);
            setToast({ show: true, message: "Simulation started successfully!", variant: "success" });
        } catch (error) {
            setToast({ show: true, message: error.response?.data?.message || "Failed to start simulation.", variant: "danger" });
        }
    };

    const handleStopSimulation = async (simulation) => {
        try {
            const response = await axios.post("/api/simulator/check", { id: simulation.id }, config);
            setToast({ show: true, message: "Simulation status checked successfully!", variant: "success" });
        } catch (error) {
            setToast({ show: true, message: error.response?.data?.message || "Failed to check simulation status.", variant: "danger" });
        }
    };

    return (
        <>
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
                <td>{simulation.status}</td>
                <td className="d-flex justify-content-around align-items-center">
                    <Button
                        onClick={() => handleStartSimulation(simulation)}
                        variant={"secondary"}
                        className={"button-start-simulation saira-condensed-regular"}
                    >
                        START
                    </Button>
                    <Button
                        onClick={() => handleStopSimulation(simulation)}
                        variant={"secondary"}
                        className={"button-stop-simulation saira-condensed-regular"}
                    >
                        STOP
                    </Button>
                </td>
            </tr>
            <ToastContainer position="top-end" className="p-3">
                <Toast
                    onClose={() => setToast({ ...toast, show: false })}
                    show={toast.show}
                    bg={toast.variant}
                    delay={3000}
                    autohide
                >
                    <Toast.Body>{toast.message}</Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    );
};

export default SimulationRow;
