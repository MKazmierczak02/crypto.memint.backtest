import {USER} from "../constans/actionTypes";

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER.LOGIN_REQUEST:
            return { loading: true }

        case USER.LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }

        case USER.LOGIN_FAIL:
            return { loading: false, error: action.payload }

        case USER.LOGOUT:
            return {}

        default:
            return state
    }
}
