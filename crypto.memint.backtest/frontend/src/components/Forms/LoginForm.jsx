import React, { useState } from 'react';
import { Alert, Card, CardContent, Container, TextField, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../actions/userActions";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
    navigate("/");
  };

  return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        color: 'text.primary',
      }}
    >
      <Box sx={{ maxWidth: '500px', width: '100%'}}>
        <Typography variant="h3" align="center" sx={{ mb: 4 }}>
          Log in
        </Typography>

        <Card sx={{ borderRadius: '16px', boxShadow: 3, backgroundColor: "rgba(0, 0, 0, 0.7)"}}>
          <CardContent>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
            >
              <TextField
                label="Email"
                type="email"
                fullWidth
                required
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <TextField
                label="Password"
                type="password"
                fullWidth
                required
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {errors && (
                <Alert severity="error">
                  ERROR
                </Alert>
              )}

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{ borderRadius: '8px' }}
              >
                Log In
              </Button>

              <Typography align="center">
                Don't have an account yet?{" "}
                <Link to="/signup" style={{ textDecoration: 'underline', color: "#fff" }}>
                  Sign up!
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default LoginForm;
