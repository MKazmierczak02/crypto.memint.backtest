import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStrategy } from '../actions/strategyActions';
import {
  Container,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import CreateStrategyPage from "../components/ManageStrategyPage/CreateStrategyPage";

const CreateStrategyScreen = () => {
  const dispatch = useDispatch();

  const strategyCreate = useSelector((state) => state.strategyCreate);
  const { loading: loadingCreate, error: errorCreate, success: successCreate } = strategyCreate;

  const handleCreateStrategy = (strategy) => {
    dispatch(createStrategy(strategy));
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
          <CreateStrategyPage onCreate={handleCreateStrategy} />
        </Box>
      )}
    </Container>
  );
};

export default CreateStrategyScreen;
