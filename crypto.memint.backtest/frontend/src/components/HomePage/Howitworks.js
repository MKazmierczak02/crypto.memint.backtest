import React, { useState } from 'react';
import {Container, Grid, Typography, Box, IconButton, Slide, Fade} from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import Cart from './Cart';
import Globe from '../widgets/Globe';
import { useInView } from 'react-intersection-observer';

const steps = [
  {
    id: '01',
    name: 'Create Your Strategy',
    description:
      'Start by crafting a personalized trading strategy that aligns with your investment goals. Define condition groups and add conditions using a wide array of technical indicators such as moving averages, RSI, MACD, Bollinger Bands, and more. Customize each condition by selecting indicators, setting parameters (like period lengths or thresholds), and choosing logical operators (AND, OR) to build complex trading rules. Tailor your strategy to react to specific market signals and conditions, giving you full control over your trading approach.'
  },
  {
    id: '02',
    name: 'Set Up Simulation Parameters',
    description:
      'Configure the simulation environment to test your strategy under realistic market conditions. Select the trading symbol (e.g., BTC/USD, ETH/USD) and the timeframe (e.g., 1-minute, 1-hour, 1-day) you wish to analyze. Specify the historical data range by setting the start and end dates. Adjust key variables such as leverage, initial account balance, and fixed trade value to match your trading style and risk tolerance. These settings allow you to simulate different scenarios and assess how your strategy performs across various market conditions.'
  },
  {
    id: '03',
    name: 'Run Simulation and Analyze Results',
    description:
      'Execute the simulation to see how your strategy would have performed using historical market data. Our advanced simulation engine processes your strategy, executing trades based on your defined conditions and actions. Once the simulation is complete, review comprehensive performance reports that include metrics like final balance, return on investment (ROI), profit and loss over time, and maximum drawdown. Analyze detailed transaction histories and position data to gain insights. Use these results to evaluate the effectiveness of your strategy, identify areas for improvement, and refine your approach for better future performance.'
  }
];

const HowItWorks = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showStep, setShowStep] = useState(true);
  const { ref, inView } = useInView({ triggerOnce: true });

  const handleNext = () => {
    setShowStep(false);
    setTimeout(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
      setShowStep(true);
    }, 300);
  };

  const handleBack = () => {
    setShowStep(false);
    setTimeout(() => {
      setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);
      setShowStep(true);
    }, 300);
  };

  return (
    <Box
      component="section"
      sx={{
        backgroundColor: '#000',
        color: '#fff',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
        overflow: "hidden"
      }}
    >
      <Container maxWidth="lg">
          <Slide direction="right" in={inView} timeout={2000}>
            <Box ref={ref} sx={{ textAlign: 'left', mb: 5 }}>
                <Typography variant="h3" component="p" sx={{ fontWeight: 'bold' }}>
                  Let's see how <strong>it works</strong>
                </Typography>
              <hr />
            </Box>
          </Slide>

        <Grid container spacing={2} alignItems="center" justifyContent="center">
            <Slide direction="right" in={inView} timeout={1000}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}
            >
              <IconButton
                onClick={handleBack}
                sx={{
                  color: 'primary.main',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.2)',
                  },
                }}
              >
                <ArrowBackIos />
              </IconButton>

              <Fade in={showStep} timeout={300}>
                <Box>
                  <Cart
                    id={steps[currentStep].id}
                    name={steps[currentStep].name}
                    description={steps[currentStep].description}
                  />
                </Box>
              </Fade>

              <IconButton
                onClick={handleNext}
                sx={{
                  color: 'primary.main',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.2)',
                  },
                }}
              >
                <ArrowForwardIos />
              </IconButton>
            </Box>
          </Grid>
            </Slide>
            <Slide direction="left" in={inView} timeout={1000}>
          <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              {/* <Globe /> */}
            </Box>
          </Grid>
            </Slide>
        </Grid>
      </Container>
    </Box>
  );
};

export default HowItWorks;
