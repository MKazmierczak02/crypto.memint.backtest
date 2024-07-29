import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store, { initialState } from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./screens/HomeScreen";
import ErrorScreen from "./screens/ErrorScreen";
import { Login, SignUp } from "./screens/LoginScreen";
import NavigationBar from "./components/Navbar";
import Footer from "./components/Footer";
import StrategyScreen from "./screens/StrategySreen";
import StrategyDetailsScreen from "./screens/StrategyDetailsScreen";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorScreen />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorScreen />,
  },
  {
    path: "/signup",
    element: <SignUp />,
    errorElement: <ErrorScreen />,
  },
  {
    path: "/strategies",
    element: <StrategyScreen />,
    errorElement: <ErrorScreen />,
  },
  {
    path: "/strategies/:id",
    element: <StrategyDetailsScreen />,
    errorElement: <ErrorScreen />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store} serverState={initialState}>
    <header>
      <NavigationBar />
    </header>
    <main className={"saira-condensed-regular"}>
      <RouterProvider router={router} />
    </main>
    <footer>
      <Footer />
    </footer>
  </Provider>
);
