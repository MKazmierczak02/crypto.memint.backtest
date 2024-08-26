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
import SimulationScreen from "./screens/SimulationScreen";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <NavigationBar />
        <Home />
        <Footer />
      </>
    ),
    errorElement: <ErrorScreen />,
  },
  {
    path: "/login",
    element: (
      <>
        <NavigationBar />
        <Login />
        <Footer />
      </>
    ),
    errorElement: <ErrorScreen />,
  },
  {
    path: "/signup",
    element: (
      <>
        <NavigationBar />
        <SignUp />
        <Footer />
      </>
    ),
    errorElement: <ErrorScreen />,
  },
  {
    path: "/strategies",
    element: (
      <>
        <NavigationBar />
        <StrategyScreen />
        <Footer />
      </>
    ),
    errorElement: <ErrorScreen />,
  },
  {
    path: "/strategies/:id",
    element: (
      <>
        <NavigationBar />
        <StrategyDetailsScreen />
        <Footer />
      </>
    ),
    errorElement: <ErrorScreen />,
  },
    {
    path: "/simulations",
    element: (
      <>
        <NavigationBar />
        <SimulationScreen />
        <Footer />
      </>
    ),
    errorElement: <ErrorScreen />,
  },
  //   {
  //   path: "/simulations/:id",
  //   element: (
  //     <>
  //       <NavigationBar />
  //       <SimulationDetailsScreen />
  //       <Footer />
  //     </>
  //   ),
  //   errorElement: <ErrorScreen />,
  // },

]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store} serverState={initialState}>
    <main className={"saira-condensed-regular"}>
      <RouterProvider router={router} />
    </main>
  </Provider>
);
