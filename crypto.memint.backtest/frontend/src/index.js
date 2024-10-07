import React from "react";
import {createRoot} from "react-dom/client";
import { Provider } from "react-redux";
import store, { initialState } from "./store";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider} from "@mui/material";
import { router } from "./router"
import { theme } from "./theme"
import CssBaseline from '@mui/material/CssBaseline';

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store} serverState={initialState}>
      <ThemeProvider theme={theme}>
            <CssBaseline />
            <main>
              <RouterProvider router={router} />
            </main>
      </ThemeProvider>
  </Provider>
);
