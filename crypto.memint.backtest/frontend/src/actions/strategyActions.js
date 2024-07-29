import axios from "axios";
import {
    STRATEGY_LIST_REQUEST,
    STRATEGY_LIST_SUCCESS,
    STRATEGY_LIST_FAIL
} from "../constans/actionTypes";

export const listStrategies = () => async dispatch  => {
    try {
        dispatch({ type: STRATEGY_LIST_REQUEST })

        const { data } = await axios.get('/api/simulator/strategies/')
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