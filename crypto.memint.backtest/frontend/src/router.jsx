import {createBrowserRouter} from "react-router-dom";
import NavigationBar from "./components/Navbar";
import Home from "./screens/HomeScreen";
import Footer from "./components/Footer";
import ErrorScreen from "./screens/ErrorScreen";
import LoginForm from "./components/Forms/LoginForm";
import StrategyList from "./components/StrategyList";
import StrategyDetailsScreen from "./screens/StrategyDetailsScreen";
import EditStrategyScreen from "./screens/EditStrategyScreen";
import SimulationList from "./components/SimulationList";
import React from "react";
import CreateStrategyScreen from "./screens/CreateStrategyScreen";
import CreateSimulationScreen from "./screens/CreateSimulationScreen";
import BackgroundWrapper from "./components/backgroundWrapper";
import SimulationDetailsScreen from "./screens/SimulationDetailsScreen";
const common_routes = [
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
          <BackgroundWrapper>
            <LoginForm/>
          </BackgroundWrapper>
        <Footer />
      </>
    ),
    errorElement: <ErrorScreen />,
  },
]

const strategiesRoutes = [
      {
    path: "/strategies",
    element: (
      <>
        <NavigationBar />
          <BackgroundWrapper>
            <StrategyList />
          </BackgroundWrapper>
        <Footer />
      </>
    ),
    errorElement: <ErrorScreen />,
  },
  {
    path: "/strategies/:strategyId",
    element: (
      <>
        <NavigationBar />
          <BackgroundWrapper>
            <StrategyDetailsScreen/>
          </BackgroundWrapper>
        <Footer />
      </>
    ),
    errorElement: <ErrorScreen />,
  },
  {
    path: "/strategies/:strategyId/edit",
    element: (
      <>
        <NavigationBar />
          <BackgroundWrapper>
            <EditStrategyScreen/>
          </BackgroundWrapper>
        <Footer />
      </>
    ),
    errorElement: <ErrorScreen />,
  },
  {
    path: "/strategies/create",
    element: (
      <>
        <NavigationBar />
          <BackgroundWrapper>
              <CreateStrategyScreen/>
          </BackgroundWrapper>
        <Footer />
      </>
    ),
    errorElement: <ErrorScreen />,
  },
  {
    path: "/strategies/:strategyId/simulate",
    element: (
      <>
        <NavigationBar />
          <BackgroundWrapper>
            <CreateSimulationScreen/>
          </BackgroundWrapper>
        <Footer />
      </>
    ),
    errorElement: <ErrorScreen />,
  }
]

const simulationRoutes = [
    {
    path: "/simulations",
    element: (
      <>
        <NavigationBar />
          <BackgroundWrapper>
            <SimulationList />
          </BackgroundWrapper>
        <Footer />
      </>
    ),
    errorElement: <ErrorScreen />,
  },
  {
    path: "/simulations/:simulationId",
    element: (
      <>
        <NavigationBar />
          <BackgroundWrapper>
            <SimulationDetailsScreen/>
          </BackgroundWrapper>
        <Footer />
      </>
    ),
    errorElement: <ErrorScreen />,
  }
]

let routes = [...common_routes, ...strategiesRoutes, ...simulationRoutes];

export const router = createBrowserRouter(routes);