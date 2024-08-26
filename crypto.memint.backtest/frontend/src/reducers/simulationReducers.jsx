import {
    SIMULATION_LIST_REQUEST,
    SIMULATION_LIST_SUCCESS,
    SIMULATION_LIST_FAIL,
    SIMULATION_DETAILS_REQUEST,
    SIMULATION_DETAILS_SUCCESS,
    SIMULATION_DETAILS_FAIL
} from '../constans/actionTypes'
export const simulationsListReducer = (state = {simulations: []}, action) =>
{
    switch (action.type) {
        case SIMULATION_LIST_REQUEST:
            return { loading: true, simulations: [] }

        case SIMULATION_LIST_SUCCESS:
            return { loading: false, simulations: action.payload }

        case SIMULATION_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}


export const simulationDetailsReducer = (state = {simulation: {}}, action) =>
{
    switch (action.type) {
        case SIMULATION_DETAILS_REQUEST:
            return { loading: true, ...state }

        case SIMULATION_DETAILS_SUCCESS:
            return { loading: false, simulation: action.payload }

        case SIMULATION_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}
