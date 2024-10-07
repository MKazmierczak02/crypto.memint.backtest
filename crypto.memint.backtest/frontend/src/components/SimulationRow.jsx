import React, { useEffect, useState } from "react";
import {
  TableRow,
  TableCell,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  Chip,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useSelector } from "react-redux";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import ReplayIcon from '@mui/icons-material/Replay';
import BarChartIcon from '@mui/icons-material/BarChart';
const SimulationRow = ({ simulation }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [status, setStatus] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", severity: "" });
  const navigate = useNavigate();
  const config = {
    headers: {
      Authorization: `Bearer ${userInfo?.token}`,
    },
  };

  useEffect(() => {
    setStatus(simulation.status);
  }, [simulation.status]);

  const handleStartSimulation = async (simulation) => {
    try {
      const response = await axios.post("/api/simulator/start", { id: simulation.id }, config);
      setStatus(response.data.status);
      setToast({ show: true, message: "Simulation started successfully!", severity: "success" });
    } catch (error) {
      setToast({
        show: true,
        message: error.response?.data?.message || "Failed to start simulation.",
        severity: "error",
      });
    }
  };

  const handleResetSimulation = async (simulation) => {
    try {
      const response = await axios.post("/api/simulator/reset", { id: simulation.id }, config);
      setToast({ show: true, message: "Simulation reset successfully!", severity: "info" });
    } catch (error) {
      setToast({
        show: true,
        message: error.response?.data?.message || "Failed to reset simulation.",
        severity: "error",
      });
    }
  };

  const handleCloseToast = () => {
    setToast({ ...toast, show: false });
  };

  return (
    <>
      <TableRow hover>
        <TableCell>#{simulation.id}</TableCell>
        <TableCell>
          <Link
            to={`/strategies/${simulation.strategy.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {simulation.strategy.name}
          </Link>
        </TableCell>
        <TableCell>{simulation.symbol_code}</TableCell>
        <TableCell>{simulation.timeframe}</TableCell>
        <TableCell>{simulation.initial_balance || "N/A"}</TableCell>
        <TableCell>{simulation.fixed_trade_value || "N/A"}</TableCell>
        <TableCell>{simulation.final_balance || "N/A"}</TableCell>
        <TableCell>x{simulation.leverage || "N/A"}</TableCell>
        <TableCell>
          <Chip
            label={status}
            color={
              status === "Running"
                ? "default"
                : status === "Finished"
                ? "success"
                : status === "Ready"
                ? "info"
                : "default"
            }
          />
        </TableCell>
        <TableCell align="center">
          <Tooltip title="Start Simulation">
            <IconButton
              color="success"
              onClick={() => handleStartSimulation(simulation)}
            >
              <PlayArrowIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Reset">
            <IconButton
              color="error"
              onClick={() => handleResetSimulation(simulation)}
            >
              <ReplayIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Summary">
            <IconButton
              color="info"
              onClick={() => navigate(`${simulation.id}`)}
            >
              <BarChartIcon />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>

      <Snackbar
        open={toast.show}
        autoHideDuration={3000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseToast}
          severity={toast.severity}
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SimulationRow;
