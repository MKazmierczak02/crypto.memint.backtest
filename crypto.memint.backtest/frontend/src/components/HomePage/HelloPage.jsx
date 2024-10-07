import React from 'react';
import { Typography, Box, Grid2, Slide } from '@mui/material';
import TickerChip from "../widgets/TickerChip";

const HelloPage = () => {
  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    setChecked(true);
  }, []);

  return (
    <Box
      component="section"
      sx={{
        backgroundImage: "url(/static/media/bg3.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        padding: "none",
        backgroundPosition: "center center",
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        color: 'text.primary',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flex: '1',
          alignItems: 'center',
          padding: '2rem',
        }}
      >
        <Grid2
          container
          spacing={2}
          sx={{
            display: 'flex',
            flexDirection: "column",
            justifyContent: 'flex-start',
            padding: '2rem',
          }}
        >
          <Grid2>
            <Slide direction="down" in={checked} timeout={1200}>
              <Box>
                <Typography variant="h1">
                  MAKE YOUR TRADING /<br />
                  <Typography variant="h1" sx={{ fontWeight: "600" }} component="span">
                    MORE EFFECTIVE
                  </Typography>
                </Typography>
              </Box>
            </Slide>
          </Grid2>

          <Grid2
            container
            spacing={2}
            sx={{
              display: 'flex',
              flexDirection: "row",
              justifyContent: 'flex-start',
            }}
          >
            <Slide direction="up" in={checked} timeout={1000}>
              <Box>
                <TickerChip symbol="BITSTAMP:BTCUSD" />
              </Box>
            </Slide>
            <Slide direction="up" in={checked} timeout={1200}>
              <Box>
                <TickerChip symbol="BITSTAMP:ETHUSD" />
              </Box>
            </Slide>
            <Slide direction="up" in={checked} timeout={1400}>
              <Box>
                <TickerChip symbol="BITSTAMP:SOLUSD" />
              </Box>
            </Slide>
          </Grid2>
        </Grid2>
      </Box>
    </Box>
  );
};

export default HelloPage;
