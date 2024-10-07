import axios from "axios";
import { STRATEGY } from "../constans/actionTypes";
import { getAuthConfig } from "../utils/apiConfig";

export const fetchStrategies = () => async (dispatch, getState) => {
  try {
    dispatch({ type: STRATEGY.LIST_REQUEST });

    const config = getAuthConfig(getState);

    const { data } = await axios.get('/api/simulator/strategies/', config);
    dispatch({
      type: STRATEGY.LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STRATEGY.LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listStrategyDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: STRATEGY.DETAILS_REQUEST });

    const config = getAuthConfig(getState);

    const { data } = await axios.get(`/api/simulator/strategies/${id}/`, config);
    dispatch({
      type: STRATEGY.DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STRATEGY.DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createStrategy = (strategyData) => async (dispatch, getState) => {
  try {
    dispatch({ type: STRATEGY.CREATE_REQUEST });

    const config = getAuthConfig(getState);

    const { data } = await axios.post('/api/simulator/strategies/', strategyData, config);
    dispatch({
      type: STRATEGY.CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STRATEGY.CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateStrategy = (id, strategyData) => async (dispatch, getState) => {
  try {
    dispatch({ type: STRATEGY.UPDATE_REQUEST });
    const config = getAuthConfig(getState);
    const { data } = await axios.patch(`/api/simulator/strategies/${id}/`, strategyData, config);
    dispatch({
      type: STRATEGY.UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STRATEGY.UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteStrategy = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: STRATEGY.DELETE_REQUEST });

    const config = getAuthConfig(getState);

    const { data } = await axios.delete(`/api/simulator/strategies/${id}/`, config);
    dispatch({
      type: STRATEGY.DELETE_SUCCESS,
      payload: data,
    });
    dispatch(fetchStrategies())
  } catch (error) {
    dispatch({
      type: STRATEGY.DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
