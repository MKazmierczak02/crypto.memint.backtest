import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link as RouterLink, useRouteError } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import BackgroundWrapper from "../components/backgroundWrapper";

const ErrorScreen = () => {
  const error = useRouteError();
  console.error(error);

  return (
      <BackgroundWrapper>
    <Container
      component="main"
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
      }}
    >
      <Typography variant="h2" component="h1" gutterBottom>
        <ErrorOutlineIcon sx={{ fontSize: 40, verticalAlign: 'middle', mr: 1 }} />
        Oops!
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Sorry, an unexpected error has occurred.
      </Typography>

      {error && (
        <Typography variant="body2" color="textSecondary">
          {error.statusText || error.message}
        </Typography>
      )}

      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          component={RouterLink}
          to="/"
          sx={{ textTransform: 'none' }}
          aria-label="Go to Home Page"
        >
          Go to Home
        </Button>
      </Box>
    </Container>
      </BackgroundWrapper>
  );
};

export default ErrorScreen;
