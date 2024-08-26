import axios from "axios";
import {
    SIMULATION_LIST_REQUEST,
    SIMULATION_LIST_SUCCESS,
    SIMULATION_LIST_FAIL, SIMULATION_DETAILS_REQUEST, SIMULATION_DETAILS_SUCCESS, SIMULATION_DETAILS_FAIL
} from "../constans/actionTypes";
import {getAuthConfig} from "../utils/apiConfig";


export const listSimulations = () => async (dispatch, getState)  => {
    try {
        dispatch({ type: SIMULATION_LIST_REQUEST })

        const config = getAuthConfig(getState);

        const { data } = await axios.get('/api/simulator/simulations/', config)
        dispatch({
            type: SIMULATION_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: SIMULATION_LIST_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}


export const listSimulationDetails = (id) => async (dispatch, getState)  => {
    try {
        dispatch({ type: SIMULATION_DETAILS_REQUEST })

        const config = getAuthConfig(getState);

        const { data } = await axios.get(`/api/simulator/simulations/${id}`, config)
        dispatch({
            type: SIMULATION_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: SIMULATION_DETAILS_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}
