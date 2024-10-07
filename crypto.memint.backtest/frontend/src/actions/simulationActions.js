import axios from "axios";
import {
    SIMULATION
} from "../constans/actionTypes";
import {getAuthConfig} from "../utils/apiConfig";


export const listSimulations = () => async (dispatch, getState)  => {
    try {
        dispatch({ type: SIMULATION.LIST_REQUEST })

        const config = getAuthConfig(getState);

        const { data } = await axios.get('/api/simulator/simulations/', config)
        dispatch({
            type: SIMULATION.LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: SIMULATION.LIST_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}

export const getSimulationSummary = (id) => async (dispatch, getState)  => {
    try {
        dispatch({ type: SIMULATION.SUMMARY_REQUEST })

        const config = getAuthConfig(getState);

        const { data } = await axios.get(`/api/simulator/summary/${id}`, config)
        dispatch({
            type: SIMULATION.SUMMARY_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: SIMULATION.SUMMARY_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}


export const createSimulation = (simulationData) => async (dispatch, getState) => {
  try {
    dispatch({ type: SIMULATION.CREATE_REQUEST });

    const config = getAuthConfig(getState);

    const { data } = await axios.post('/api/simulator/simulations/', simulationData, config);
    dispatch({
      type: SIMULATION.CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SIMULATION.CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
