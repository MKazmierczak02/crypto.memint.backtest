import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper, Button, CardHeader,
} from "@mui/material";
import { listSimulations } from "../actions/simulationActions";
import SimulationRow from "./SimulationRow";
import RefreshIcon from '@mui/icons-material/Refresh';

const SimulationList = () => {
  const dispatch = useDispatch();
  const simulationsList = useSelector((state) => state.simulationsList);
  const { loading, error, simulations } = simulationsList;

  useEffect(() => {
    dispatch(listSimulations());
  }, [dispatch]);

  const refreshSimulations = () => {
    dispatch(listSimulations());
  }

  return (
    <Container sx={{ pt: 15, minHeight: "100vh"}}>
      <CardHeader
        title={
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            Your simulations
          </Typography>
        }
        action={
          <Box>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() =>{
                refreshSimulations()
              }}
              startIcon={<RefreshIcon />}
              sx={{ mr: 2, textTransform: 'none' }}
            >
              Refresh
            </Button>
          </Box>
        }
      />
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : simulations.length === 0 ? (
        <Typography variant="h6" align="center">
          No simulations found.
        </Typography>
      ) : (
        <TableContainer component={Paper} sx={{backgroundColor: "rgba(0,0,0,0.5)"}}>
          <Table sx={{ minWidth: 650 }} aria-label="simulations table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Strategy</TableCell>
                <TableCell>Symbol</TableCell>
                <TableCell>Timeframe</TableCell>
                <TableCell>Initial Balance</TableCell>
                <TableCell>Trade Size [USDT]</TableCell>
                <TableCell>Final Balance</TableCell>
                <TableCell>Leverage</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {simulations.map((simulation) => (
                <SimulationRow key={simulation.id} simulation={simulation} onRefresh={refreshSimulations}/>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default SimulationList;
