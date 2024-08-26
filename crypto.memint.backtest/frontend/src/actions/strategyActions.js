import axios from "axios";
import {
    STRATEGY_LIST_REQUEST,
    STRATEGY_LIST_SUCCESS,
    STRATEGY_LIST_FAIL, STRATEGY_DETAILS_REQUEST, STRATEGY_DETAILS_SUCCESS, STRATEGY_DETAILS_FAIL
} from "../constans/actionTypes";
import {getAuthConfig} from "../utils/apiConfig";


export const listStrategies = () => async (dispatch, getState)  => {
    try {
        dispatch({ type: STRATEGY_LIST_REQUEST })
        
        const config = getAuthConfig(getState);

        const { data } = await axios.get('/api/simulator/strategies/', config)
        dispatch({
            type: STRATEGY_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: STRATEGY_LIST_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}


export const listStrategyDetails = (id) => async (dispatch, getState)  => {
    try {
        dispatch({ type: STRATEGY_DETAILS_REQUEST })

        const config = getAuthConfig(getState);

        const { data } = await axios.get(`/api/simulator/strategies/${id}`, config)
        dispatch({
            type: STRATEGY_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: STRATEGY_DETAILS_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}
