import { STRATEGY } from '../constans/actionTypes';

export const strategyListReducer = (state = { strategies: [] }, action) => {
  switch (action.type) {
    case STRATEGY.LIST_REQUEST:
      return { loading: true, strategies: [] };

    case STRATEGY.LIST_SUCCESS:
      return { loading: false, strategies: action.payload };

    case STRATEGY.LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const strategyDetailsReducer = (state = { strategy: {} }, action) => {
  switch (action.type) {
    case STRATEGY.DETAILS_REQUEST:
      return { ...state, loading: true };

    case STRATEGY.DETAILS_SUCCESS:
      return { loading: false, strategy: action.payload };

    case STRATEGY.DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const strategyCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case STRATEGY.CREATE_REQUEST:
      return { loading: true };

    case STRATEGY.CREATE_SUCCESS:
      return { loading: false, success: true, strategy: action.payload };

    case STRATEGY.CREATE_FAIL:
      return { loading: false, error: action.payload };

    case STRATEGY.CREATE_RESET:
      return {};

    default:
      return state;
  }
};

export const strategyUpdateReducer = (state = { strategy: {} }, action) => {
  switch (action.type) {
    case STRATEGY.UPDATE_REQUEST:
      return { ...state, loading: true };

    case STRATEGY.UPDATE_SUCCESS:
      return { loading: false, success: true, strategy: action.payload };

    case STRATEGY.UPDATE_FAIL:
      return { loading: false, error: action.payload };

    case STRATEGY.UPDATE_RESET:
      return {};

    default:
      return state;
  }
};
