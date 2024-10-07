import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, Typography, IconButton, Box, Badge, Drawer, List, ListItem, ListItemText } from '@mui/material';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import { useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';

const NavigationBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [healthy, setHealthy] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHealthy = async () => {
      const response = await axios.get("/api/check");
      if (response.data.status === "ok") {
        setHealthy(true);
      }
    };
    fetchHealthy();
  }, []);

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/');
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const list = () => (
    <Box
      sx={{ width: 250, height: "100vh" , backgroundColor: "#000"}}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {userInfo ? (
          <>
            <ListItem button onClick={() => navigate('/simulations')}>
              <ListItemText primary="Simulations" />
            </ListItem>
            <ListItem button onClick={() => navigate('/strategies')}>
              <ListItemText primary="Strategies" />
            </ListItem>
            <ListItem button onClick={() => navigate('/statistics')}>
              <ListItemText primary="Statistics" />
            </ListItem>
            <ListItem button onClick={logoutHandler}>
              <ListItemText primary="Log out" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem button onClick={() => navigate('/pricing')}>
              <ListItemText primary="Pricing" />
            </ListItem>
            <ListItem button onClick={() => navigate('/tools')}>
              <ListItemText primary="Tools" />
            </ListItem>
            <ListItem button onClick={() => navigate('/about')}>
              <ListItemText primary="About" />
            </ListItem>
            <ListItem button onClick={() => navigate('/login')}>
              <ListItemText primary="Log in" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" style={{ background: 'transparent', boxShadow: 'none'}}>
        <Toolbar>
          <Typography
            variant="h4"
            component="div"
            sx={{ flexGrow: 1, cursor: 'pointer', fontFamily: 'Saira Condensed, sans-serif', fontWeight: 700 }}
            onClick={() => navigate('/')}
          >
            MBACKTEST
          </Typography>

          <Badge
            variant="dot"
            color={healthy ? "success" : "error"}
            sx={{ mr: 2 }}
          >
            <Box sx={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: healthy ? 'green' : 'red' }} />
          </Badge>

          <IconButton
            color="inherit"
            edge="end"
            onClick={toggleDrawer(true)}
            sx={{ display: { xs: 'block', sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {userInfo ? (
              <>
                <Button color="inherit" onClick={() => navigate('/simulations')} sx={{ mr: 2 }}>
                  Simulations
                </Button>
                <Button color="inherit" onClick={() => navigate('/strategies')} sx={{ mr: 2 }}>
                  Strategies
                </Button>
                <Button color="inherit" onClick={() => navigate('/statistics')} sx={{ mr: 2 }}>
                  Statistics
                </Button>
                <Button color="inherit" onClick={logoutHandler}>
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" onClick={() => navigate('/pricing')} sx={{ mr: 2 }}>
                  Pricing
                </Button>
                <Button color="inherit" onClick={() => navigate('/tools')} sx={{ mr: 2 }}>
                  Tools
                </Button>
                <Button color="inherit" onClick={() => navigate('/about')} sx={{ mr: 2 }}>
                  About
                </Button>
                <Button color="inherit" onClick={() => navigate('/login')}>
                  Log in
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        {list()}
      </Drawer>
    </>
  );
};

export default NavigationBar;
