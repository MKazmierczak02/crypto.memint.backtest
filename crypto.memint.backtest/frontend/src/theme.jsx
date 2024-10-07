import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: 'dark',
    text: {
      primary: '#ffffff',
    },
    primary: {
      main: '#333333',
    },
    secondary: {
      main: '#fff'
    },
  },
  typography: {
    allVariants: {
      color: '#ffffff',
    },
    fontFamily: '"Saira Condensed", sans-serif',
    h1: {
      fontWeight: 200,
      fontSize: '5rem',
    },
    h2: {
      fontWeight: 700,
      fontSize: '3rem',
    },
    h4: {
      fontWeight: 'bold',
      fontSize: '2rem',
    },
    h6: {
      fontSize: '1.5rem',
    },
    button: {
      fontSize: '1.3rem',
    },
  },
components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: "thin",
          scrollbarColor: "#6b6b6b #2b2b2b",

          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "#2b2b2b",
            width: "0.4em",
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: "8px",
            backgroundColor: "#6b6b6b",
            minHeight: "24px",
            border: "3px solid #2b2b2b",
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
            backgroundColor: "#959595",
          },
          "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
            backgroundColor: "#959595",
          },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#959595",
          },
          "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
            backgroundColor: "#2b2b2b",
          },

          "&::-webkit-scrollbar-button": {
            display: "none",
          },
          "& *::-webkit-scrollbar-button": {
            display: "none",
          },
        },
      },
    },
  },
});
