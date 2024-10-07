import {
    SIMULATION
} from '../constans/actionTypes'
export const simulationsListReducer = (state = {simulations: []}, action) =>
{
    switch (action.type) {
        case SIMULATION.LIST_REQUEST:
            return { loading: true, simulations: [] }

        case SIMULATION.LIST_SUCCESS:
            return { loading: false, simulations: action.payload }

        case SIMULATION.LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}


export const simulationDetailsReducer = (state = {simulation: {}}, action) =>
{
    switch (action.type) {
        case SIMULATION.DETAILS_REQUEST:
            return { loading: true, ...state }

        case SIMULATION.DETAILS_SUCCESS:
            return { loading: false, simulation: action.payload }

        case SIMULATION.DETAILS_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const simulationSummaryReducer = (state = {simulation: {}}, action) =>
{
    switch (action.type) {
        case SIMULATION.SUMMARY_REQUEST:
            return { loading: true, ...state }

        case SIMULATION.SUMMARY_SUCCESS:
            return { loading: false, simulation: action.payload }

        case SIMULATION.SUMMARY_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}


export const simulationCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SIMULATION.CREATE_REQUEST:
      return { loading: true };

    case SIMULATION.CREATE_SUCCESS:
      return { loading: false, success: true, simulation: action.payload };

    case SIMULATION.CREATE_FAIL:
      return { loading: false, error: action.payload };

    case SIMULATION.CREATE_RESET:
      return {};

    default:
      return state;
  }
};
