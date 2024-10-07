import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Box,
  CircularProgress,
  Alert,
  Typography,
} from "@mui/material";
import SimulationDetails from "../components/SimulationDetails";
import {getSimulationSummary} from "../actions/simulationActions";

const SimulationDetailsScreen = () => {
  const { simulationId } = useParams();
  const dispatch = useDispatch();
  const simulationDetails = useSelector((state) => state.simulationSummary);
  const { loading, error, simulation } = simulationDetails;

  useEffect(() => {
    dispatch(getSimulationSummary(simulationId));
  }, [dispatch, simulationId]);

  return (
    <Container
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : simulation && Object.keys(simulation).length > 0 ? (
        <Box sx={{ width: "100%"}}>
          <SimulationDetails simulation={simulation} />
        </Box>
      ) : (
        <Typography variant="h6">No simulation found.</Typography>
      )}
    </Container>
  );
};

export default SimulationDetailsScreen;
