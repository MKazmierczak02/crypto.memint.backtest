import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {deleteStrategy, fetchStrategies} from "../actions/strategyActions";
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
  Paper, Button,
} from "@mui/material";
import StrategyRow from "./StrategyRow";
import AddIcon from "@mui/icons-material/Add";
import {useNavigate} from "react-router-dom";

const StrategyList = () => {
  const dispatch = useDispatch();
  const strategyList = useSelector((state) => state.strategyList);
  const { loading, error, strategies } = strategyList;
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchStrategies());
  }, [dispatch]);

  const handleDeleteStrategy = (id) =>  {
    dispatch(deleteStrategy(id));
  }

  return (
    <Container sx={{pt:15, minHeight: "100vh" }}>
      <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 3 }}>
        Trading Strategies
      </Typography>
      <Box align={"right"}>
        <Button
            variant="outlined"
            color="secondary"
            onClick={() => {navigate(`create`)}}
            startIcon={<AddIcon />}
            sx={{ textTransform: 'none', mb: 3}}
            >
              New
          </Button>
      </Box>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : strategies.length === 0 ? (
        <Typography variant="h6" align="center">
          No strategies found.
        </Typography>
      ) : (
        <TableContainer component={Paper} sx={{backgroundColor: "rgba(0,0,0,0.5)"}}>
          <Table sx={{ minWidth: 650 }} aria-label="strategies table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Created at</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {strategies.map((strategy) => (
                <StrategyRow key={strategy.id} strategy={strategy} onDelete={handleDeleteStrategy}/>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default StrategyList;
