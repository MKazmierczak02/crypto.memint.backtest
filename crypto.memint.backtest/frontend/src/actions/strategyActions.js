import axios from "axios";
import {
    STRATEGY_LIST_REQUEST,
    STRATEGY_LIST_SUCCESS,
    STRATEGY_LIST_FAIL, STRATEGY_DETAILS_REQUEST, STRATEGY_DETAILS_SUCCESS, STRATEGY_DETAILS_FAIL
} from "../constans/actionTypes";


export const listStrategies = () => async (dispatch, getState)  => {
    try {
        dispatch({ type: STRATEGY_LIST_REQUEST })
        console.log('State before accessing userInfo:', getState());
        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo?.token}`,
            },
        };

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


export const listStrategyDetails = (id) => async dispatch  => {
    try {
        dispatch({ type: STRATEGY_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/simulator/strategies/${id}`)
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
