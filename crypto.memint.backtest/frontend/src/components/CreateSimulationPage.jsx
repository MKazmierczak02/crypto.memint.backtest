import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Grid,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useParams, useNavigate } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {createSimulation} from "../actions/simulationActions";
import {useDispatch} from "react-redux";

const CreateSimulationPage = () => {
  const { strategyId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Select Data', 'Configure Simulation', 'Review & Submit'];

  const [symbols, setSymbols] = useState([]);
  const [timeframes, setTimeframes] = useState([]);
  const [symbol, setSymbol] = useState('');
  const [timeframeId, setTimeframeId] = useState('');
  const [dataFrom, setDataFrom] = useState(null);
  const [dataTo, setDataTo] = useState(null);
  const [leverage, setLeverage] = useState(1);
  const [initialBalance, setInitialBalance] = useState('10000.00');
  const [fixedTradeValue, setFixedTradeValue] = useState('1000.00');
  const [maxPositions, setMaxPositions] = useState(1);

  useEffect(() => {
    fetch('/api/simulator/symbols/')
      .then((res) => res.json())
      .then((data) => setSymbols(data));

    fetch('/api/simulator/timeframes/')
      .then((res) => res.json())
      .then((data) => setTimeframes(data));
  }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const simulationData = {
      strategy_id: strategyId,
      symbol: symbol,
      timeframe: timeframeId,
      data_from: dataFrom ? dataFrom.toISOString().split('T')[0] : null,
      data_to: dataTo ? dataTo.toISOString().split('T')[0] : null,
      leverage,
      initial_balance: initialBalance,
      fixed_trade_value: fixedTradeValue,
      max_positions: maxPositions,
    };
    dispatch(createSimulation(simulationData));
    navigate('/simulations');
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create Simulation
        </Typography>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Card sx={{backgroundColor: "rgba(0,0,0,0.8)"}}>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {activeStep === 0 && (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                      <InputLabel>Symbol</InputLabel>
                      <Select
                        value={symbol.base_currency}
                        onChange={(e) => setSymbol(e.target.value)}
                        label="Symbol"
                      >
                        {symbols.map((symbol) => (
                          <MenuItem key={symbol.id} value={symbol.base_currency}>
                            {symbol.base_currency}/{symbol.quote_currency}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                      <InputLabel>Timeframe</InputLabel>
                      <Select
                        value={timeframeId}
                        onChange={(e) => setTimeframeId(e.target.value)}
                        label="Timeframe"
                      >
                        {timeframes.map((timeframe) => (
                          <MenuItem key={timeframe.timeframe_id} value={timeframe.timeframe_id}>
                            {timeframe.description}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      label="Data From"
                      value={dataFrom}
                      onChange={(newValue) => {
                        setDataFrom(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      label="Data To"
                      value={dataTo}
                      onChange={(newValue) => {
                        setDataTo(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                  </Grid>
                </Grid>
              )}

              {activeStep === 1 && (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Leverage"
                      type="number"
                      value={leverage}
                      onChange={(e) => setLeverage(e.target.value)}
                      fullWidth
                      required
                      InputProps={{ inputProps: { min: 1 } }}
                      helperText="Leverage used for trading (e.g., 1, 2, 5)"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Initial Balance"
                      type="number"
                      value={initialBalance}
                      onChange={(e) => setInitialBalance(e.target.value)}
                      fullWidth
                      required
                      InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                      helperText="Initial cash balance for the simulation"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Fixed Trade Value"
                      type="number"
                      value={fixedTradeValue}
                      onChange={(e) => setFixedTradeValue(e.target.value)}
                      fullWidth
                      required
                      InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                      helperText="Fixed amount to use for each trade"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Max Positions"
                      type="number"
                      value={maxPositions}
                      onChange={(e) => setMaxPositions(e.target.value)}
                      fullWidth
                      required
                      InputProps={{ inputProps: { min: 1, step: 1 } }}
                      helperText="Maximum number of open positions allowed"
                    />
                  </Grid>
                </Grid>
              )}

              {activeStep === 2 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Review Simulation Details
                  </Typography>
                  <Typography>
                    <strong>Symbol:</strong>{' '}
                    {symbols.find((s) => s.base_currency === symbol)?.base_currency}/
                    {symbols.find((s) => s.base_currency === symbol)?.quote_currency}
                  </Typography>
                  <Typography>
                    <strong>Timeframe:</strong>{' '}
                    {timeframes.find((t) => t.timeframe_id === timeframeId)?.description}
                  </Typography>
                  <Typography>
                    <strong>Data From:</strong>{' '}
                    {dataFrom ? dataFrom.toLocaleDateString() : ''}
                  </Typography>
                  <Typography>
                    <strong>Data To:</strong>{' '}
                    {dataTo ? dataTo.toLocaleDateString() : ''}
                  </Typography>
                  <Typography>
                    <strong>Leverage:</strong> {leverage}
                  </Typography>
                  <Typography>
                    <strong>Initial Balance:</strong> {initialBalance}
                  </Typography>
                  <Typography>
                    <strong>Fixed Trade Value:</strong> {fixedTradeValue}
                  </Typography>
                  <Typography>
                    <strong>Max Positions:</strong> {maxPositions}
                  </Typography>
                </Box>
              )}

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                {activeStep > 0 && (
                  <Button variant="contained" color="primary" onClick={handleBack}>
                    Back
                  </Button>
                )}
                {activeStep < steps.length - 1 ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    disabled={
                      (activeStep === 0 &&
                        (!symbol || !timeframeId )) ||
                      (activeStep === 1 &&
                        (!leverage || !initialBalance || !fixedTradeValue || !maxPositions))
                    }
                  >
                    Next
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} variant="contained" color="primary">
                    Create Simulation
                  </Button>
                )}
              </Box>
            </form>
          </CardContent>
        </Card>
      </Box>
    </LocalizationProvider>
  );
};

export default CreateSimulationPage;
