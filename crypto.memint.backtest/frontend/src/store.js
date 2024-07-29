import {configureStore, combineReducers} from '@reduxjs/toolkit'
import {thunk} from 'redux-thunk'
import {strategyListReducer} from "./reducers/strategyReducers";

const reducer = combineReducers({
    strategyList: strategyListReducer,
});

export const initialState = {}


const store = configureStore({
    reducer: reducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;