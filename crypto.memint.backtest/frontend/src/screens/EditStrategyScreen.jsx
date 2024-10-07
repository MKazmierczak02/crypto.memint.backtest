import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listStrategyDetails, updateStrategy } from '../actions/strategyActions';
import {
  Container,
  Box,
  CircularProgress,
  Alert,
  Typography,
} from '@mui/material';
import EditStrategyPage from '../components/ManageStrategyPage/EditStrategyPage';

const EditStrategyScreen = () => {
  const { strategyId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const strategyDetails = useSelector((state) => state.strategyDetails);
  const { loading, error, strategy } = strategyDetails;

  const strategyUpdate = useSelector((state) => state.strategyUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = strategyUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: 'STRATEGY_UPDATE_RESET' });
      navigate(`/strategies/${strategyId}`);
    } else {
      if (!strategy || strategy.id !== Number(strategyId)) {
        dispatch(listStrategyDetails(strategyId));
      }
    }
  }, [dispatch, strategy, strategyId, successUpdate, navigate]);

  const handleUpdateStrategy = (updatedStrategy) => {
    dispatch(updateStrategy(strategyId, updatedStrategy));
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
      {loading || loadingUpdate ? (
        <CircularProgress />
      ) : error || errorUpdate ? (
        <Alert severity="error">{error || errorUpdate}</Alert>
      ) : strategy ? (
        <Box sx={{ width: '100%', maxWidth: '1200px' }}>
          <EditStrategyPage strategy={strategy} onUpdate={handleUpdateStrategy} />
        </Box>
      ) : (
        <Typography variant="h6">Strategy not found.</Typography>
      )}
    </Container>
  );
};

export default EditStrategyScreen;
