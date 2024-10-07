import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listStrategyDetails } from "../actions/strategyActions";
import {
  Container,
  Box,
  CircularProgress,
  Alert,
  Typography,
} from "@mui/material";
import StrategyDetails from "../components/StrategyDetails";

const StrategyDetailsScreen = () => {
  const { strategyId } = useParams();
  const dispatch = useDispatch();
  const strategyDetails = useSelector((state) => state.strategyDetails);
  const { loading, error, strategy } = strategyDetails;

  useEffect(() => {
    dispatch(listStrategyDetails(strategyId));
  }, [dispatch, strategyId]);

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
      ) : strategy && Object.keys(strategy).length > 0 ? (
        <Box sx={{ width: "100%" }}>
          <StrategyDetails strategy={strategy} />
        </Box>
      ) : (
        <Typography variant="h6">No strategy found.</Typography>
      )}
    </Container>
  );
};

export default StrategyDetailsScreen;
