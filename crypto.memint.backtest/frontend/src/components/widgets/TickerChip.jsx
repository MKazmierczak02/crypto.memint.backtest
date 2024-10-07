import React, { useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';

const TickerChip = ({ symbol }) => {
  const widgetRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbol: symbol,
      width: '100%',
      isTransparent: true,
      colorTheme: 'dark',
      locale: 'en',
    });

    if (widgetRef.current) {
      widgetRef.current.innerHTML = '';
      widgetRef.current.appendChild(script);
    }

    return () => {
      if (widgetRef.current) {
        widgetRef.current.innerHTML = '';
      }
    };
  }, [symbol]);

  return (
    <Box
      sx={{
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderRadius: 2,
        padding: 1,
        display: {xs: 'None', md: 'flex'},
        alignItems: 'center',
        justifyContent: 'center',
        width: { xs: 'None', sm: '180px', md: '200px' },
        height: { xs: 'None', sm: '70px', md: '100px' },
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        margin: 0.5,
        position: 'relative',
      }}
    >
      <Box ref={widgetRef} sx={{ width: '100%', height: '100%' }}>
      </Box>
    </Box>
  );
};

export default TickerChip;
