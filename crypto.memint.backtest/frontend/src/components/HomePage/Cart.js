import React from 'react';
import { Card, Typography, Box } from '@mui/material';

const Cart = ({ id, name, description }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        maxWidth: 400,
        backgroundColor: '#111',
        boxShadow: 3,
        borderRadius: 2,
        padding: 3,
        textAlign: 'center',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <Typography variant="h4" component="div" >
          {id}
        </Typography>
      </Box>

      <Typography variant="h6" component="div" gutterBottom>
        {name}
      </Typography>

      <Box sx={{ my: 2 }}>
        <hr style={{ width: '50%', margin: '0 auto', border: '1px solid #ccc' }} />
      </Box>

      <Typography variant="p" color="text.secondary" sx={{ flexGrow: 1 }}>
        {description}
      </Typography>
    </Card>
  );
};

export default Cart;
