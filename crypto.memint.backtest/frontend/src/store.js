import {configureStore, combineReducers} from '@reduxjs/toolkit'
import {thunk} from 'redux-thunk'
import {strategyListReducer, strategyDetailsReducer} from "./reducers/strategyReducers";
import {userLoginReducer} from "./reducers/loginReducer"

const reducer = combineReducers({
    strategyList: strategyListReducer,
    strategyDetails: strategyDetailsReducer,
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