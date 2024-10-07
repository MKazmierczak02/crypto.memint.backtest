import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  Chip,
  Paper,
  Grid,
  Accordion,
  AccordionSummary,
  Tooltip,
  AccordionDetails, IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DownloadIcon from '@mui/icons-material/Download';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { Line } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';
import axios from "axios";
import {useSelector} from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  ChartTooltip,
  Legend,
  zoomPlugin
);

const SimulationDetails = ({ simulation }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const config = {
    headers: {
      Authorization: `Bearer ${userInfo?.token}`,
    },
  };

  if (!simulation || !simulation.price_data || !simulation.positions) {
    return <div>Loading...</div>;
  }

  const priceLabels = simulation.price_data.map((data) => data.timestamp);
  const priceValues = simulation.price_data.map((data) => parseFloat(data.close));

  const entryMarkers = simulation.positions.map((position) => ({
    x: position.entry_timestamp,
    y: parseFloat(position.entry_price) + 100,
  }));

  const exitMarkers = simulation.positions
    .filter((position) => position.close_timestamp && position.close_price)
    .map((position) => ({
      x: position.close_timestamp,
      y: parseFloat(position.close_price) - 100,
    }));

  const priceChartData = {
    labels: priceLabels,
    datasets: [
      {
        label: 'Price',
        data: priceValues,
        borderColor: 'darkgrey',
        fill: false,
        tension: 0.05,
        pointRadius: 0,
        pointHoverRadius: 0,
      },
      {
        type: 'scatter',
        label: 'Entry Positions',
        data: entryMarkers,
        pointStyle: 'triangle',
        backgroundColor: 'green',
        borderColor: 'green',
        pointRadius: 8,
        pointHoverRadius: 10,
      },
      {
        type: 'scatter',
        label: 'Exit Positions',
        data: exitMarkers,
        pointStyle: 'triangle',
        backgroundColor: 'red',
        borderColor: 'red',
        pointRadius: 8,
        pointHoverRadius: 10,
      },
    ],
  };

  const balanceLabels = simulation.balance_over_time.map((data) => data.timestamp);
  const balanceValues = simulation.balance_over_time.map((data) => parseFloat(data.balance));

  const balanceChartData = {
    labels: balanceLabels,
    datasets: [
      {
        label: 'Balance',
        data: balanceValues,
        borderColor: 'green',
        fill: false,
        tension: 0.1,
        pointRadius: 0,
        pointHoverRadius: 0,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        type: 'time',
        time: {
          tooltipFormat: 'MMM dd yyyy',
          unit: 'month',
          displayFormats: {
            month: 'MMM yyyy',
          },
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'xy',
        },
        pan: {
          enabled: true,
          mode: 'xy',
        },
        limits: {
          x: { min: 'original', max: 'original' },
          y: { min: 'original', max: 'original' },
        },
      },
    },
  };

  const handleDownloadReport = async (simulationId) => {
  try {
    const response = await axios.get(`/api/simulator/report/${simulationId}/`, {
      ...config,
      responseType: 'blob',
    });

    const contentDisposition = response.headers['content-disposition'];
    console.log(`Download Filename ${contentDisposition}`);
    let filename = 'simulation_report.csv';
    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename="?(.+)"?/);
      if (filenameMatch && filenameMatch[1]) {
        filename = filenameMatch[1];
      }
    }
    const blob = new Blob([response.data], { type: 'text/csv' });

    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;

    document.body.appendChild(link);

    link.click();

    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(link.href);

  } catch (error) {
  console.log("ERROR WHILE DOWNLOADING CSV FILE")
    console.log(error)
  }
  };


  return (
    <Card sx={{ mt: 15, width: '100%', backgroundColor: 'rgba(0,0,0,0.6)' }}>
      <CardHeader
        title={
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            Simulation Details
          </Typography>
        }
      />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Summary
            </Typography>
            <Tooltip title="Download">
              <IconButton
                color="info"
                onClick={() => handleDownloadReport(simulation.id)}
              >
                <DownloadIcon />
              </IconButton>
            </Tooltip>
            <Paper sx={{ p: 2, mb: 4, backgroundColor: 'rgba(0,0,0,0.8)' }}>
              <Typography variant="body1">
                Initial Balance: ${parseFloat(simulation.initial_balance).toFixed(2)}
              </Typography>
              <Typography variant="body1">
                Final Balance: ${parseFloat(simulation.final_balance).toFixed(2)}
              </Typography>
              <Typography variant="body1">
                ROI: {simulation.roi ? `${simulation.roi}%` : 'N/A'}
              </Typography>
              <Typography variant="body1">
                Total Profit: ${parseFloat(simulation.total_profit).toFixed(2)}
              </Typography>
              <Typography variant="body1">
                Total Trades: {simulation.total_trades}
              </Typography>
              <Typography variant="body1">
                Success Rate: {simulation.success_rate}%
              </Typography>
              <Typography variant="body1">
                Max Drawdown: {simulation.max_drawdown ? `${simulation.max_drawdown}%` : 'N/A'}
              </Typography>
            </Paper>

            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Positions
            </Typography>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="positions-content"
                id="positions-header"
              >
                <Typography variant="subtitle1">
                  View Positions ({simulation.positions.length})
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {simulation.positions.length > 0 ? (
                  simulation.positions.map((position) => (
                    <Paper
                      key={position.id}
                      elevation={3}
                      sx={{ mb: 2, p: 2, backgroundColor: 'rgba(0,0,0,0.8)' }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <Typography variant="body1">
                          {position.position_type.toUpperCase()} - {position.size} units @ $
                          {parseFloat(position.entry_price).toFixed(2)}
                        </Typography>
                        <Chip
                          label={position.status.toUpperCase()}
                          color={position.status === 'closed' ? 'success' : 'warning'}
                        />
                      </Box>
                      <Typography variant="body2">
                        Entry Date: {new Date(position.entry_timestamp).toLocaleDateString()}
                      </Typography>
                      {position.close_timestamp && (
                        <Typography variant="body2">
                          Close Date: {new Date(position.close_timestamp).toLocaleDateString()}
                        </Typography>
                      )}
                      <Typography variant="body2">
                        Realized Profit: ${parseFloat(position.realized_profit).toFixed(2)}
                      </Typography>
                    </Paper>
                  ))
                ) : (
                  <Typography variant="body1">No positions available.</Typography>
                )}
              </AccordionDetails>
            </Accordion>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Charts
            </Typography>
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Crypto Price Over Time
              </Typography>
              <Line data={priceChartData} options={chartOptions} />
            </Box>
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Balance Over Time
              </Typography>
              <Line data={balanceChartData} options={chartOptions} />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SimulationDetails;
