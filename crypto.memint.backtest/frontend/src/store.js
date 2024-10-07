import {configureStore, combineReducers} from '@reduxjs/toolkit'
import {thunk} from 'redux-thunk'
import {strategyListReducer, strategyDetailsReducer, strategyCreateReducer, strategyUpdateReducer} from "./reducers/strategyReducers";
import {userLoginReducer} from "./reducers/loginReducer"
import {
    simulationsListReducer,
    simulationDetailsReducer,
    simulationCreateReducer,
    simulationSummaryReducer
} from "./reducers/simulationReducers";

const reducer = combineReducers({
    strategyList: strategyListReducer,
    strategyDetails: strategyDetailsReducer,
    strategyCreate: strategyCreateReducer,
    strategyUpdate: strategyUpdateReducer,

    simulationsList: simulationsListReducer,
    simulationDetails: simulationDetailsReducer,
    simulationSummary: simulationSummaryReducer,
    simulationCreate: simulationCreateReducer,
    userLogin: userLoginReducer
});

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

export const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
}

const store = configureStore({
    reducer: reducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
export default store;