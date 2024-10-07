import React from 'react';
import { Container, Typography, Box, Link, Grid2 } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const footerLinks = [
    { text: 'Privacy Policy', href: '#privacy-policy', onClick: () => navigate('/privacy-policy') },
    { text: 'Terms of Service', href: '#terms-of-service' },
    { text: 'Contact', href: '#contact' },
  ];

  return (
      <Box
          component="footer"
          sx={{
              py: 4,
              textAlign: 'center',
              backgroundColor: "#000",
              color: 'text.primary',
              fontFamily: '"Saira Condensed", sans-serif',
          }}
      >
          <hr/>
          <Container>
              <Grid2 container justifyContent="center">
                  <Grid2 item>
                      {footerLinks.map((link, index) => (
                          <Link
                              key={index}
                              href={link.href}
                              onClick={link.onClick ? link.onClick : undefined}
                              underline="none"
                              sx={{
                                  color: 'text.primary',
                                  fontWeight: 'bold',
                                  fontSize: '1rem',
                                  mx: 3,
                                  cursor: 'pointer',
                                  '&:hover': {
                                      textDecoration: 'underline',
                                  },
                              }}
                          >
                              {link.text}
                          </Link>
                      ))}
                  </Grid2>
              </Grid2>

              <Grid2 container justifyContent="center" sx={{mt: 2}}>
                  <Typography variant="body2" sx={{fontWeight: 'bold'}}>
                      © 2023 MEMINT. All Rights Reserved.
                  </Typography>
              </Grid2>
          </Container>
      </Box>
  );
};

export default Footer;
