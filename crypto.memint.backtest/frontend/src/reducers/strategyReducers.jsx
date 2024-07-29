import {
    STRATEGY_LIST_REQUEST,
    STRATEGY_LIST_SUCCESS,
    STRATEGY_LIST_FAIL
} from '../constans/actionTypes'
export const strategyListReducer = (state = {strategies: []}, action) =>
{
    switch (action.type) {
        case STRATEGY_LIST_REQUEST:
            return { loading: true, strategies: [] }

        case STRATEGY_LIST_SUCCESS:
            return { loading: false, strategies: action.payload }

        case STRATEGY_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}
