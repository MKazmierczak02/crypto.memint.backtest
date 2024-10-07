import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import CreateSimulationPage from "../components/CreateSimulationPage";

const CreateSimulationScreen = () => {
  const dispatch = useDispatch();

  const simulationCreate = useSelector((state) => state.simulationCreate);
  const { loading: loadingCreate, error: errorCreate, success: successCreate } = simulationCreate;

  const handleCreateSimulation = (simulation) => {
    dispatch(simulationCreate(simulation));
  };

  return (
    <Container
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      { loadingCreate ? (
        <CircularProgress />
      ) : errorCreate ? (
        <Alert severity="error">{ errorCreate}</Alert>
      ) : (
        <Box sx={{ width: '100%', maxWidth: '1200px' }}>
          <CreateSimulationPage onCreate={handleCreateSimulation} />
        </Box>
      )}
    </Container>
  );
};

export default CreateSimulationScreen;
