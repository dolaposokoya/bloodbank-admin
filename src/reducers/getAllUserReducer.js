import { GET_ALL_USER_REQUEST, GET_ALL_USER_REQUEST_FAILURE, GET_ALL_USER_REQUEST_FAILED, GET_ALL_USER_REQUEST_SUCCESS } from '../actions/actionTypes';

const INITIAL_STATE = {
    users: []
}

const usersReducer = (state = INITIAL_STATE, action) => {
    switch (action.types) {
        case GET_ALL_USER_REQUEST:
            return {
                ...state
            }
        case GET_ALL_USER_REQUEST_FAILED:
            return {
                ...state,
                users: action.payload
            }
        case GET_ALL_USER_REQUEST_FAILURE:
            return {
                ...state,
                users: action.payload
            }
        case GET_ALL_USER_REQUEST_SUCCESS:
            return {
                ...state,
                users: action.payload
            }
        default:
            return state
    }
}

export default usersReducer
