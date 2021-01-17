import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR } from '../actions/actionTypes'

const INITIAL_STATE = {
    currentUser: {},
    admin_token: '',
};
function loginReducer(state = INITIAL_STATE, action) {
    switch (action.types) {
        case LOGIN_REQUEST:
            return { ...state };
        case LOGIN_ERROR:
            return {
                ...state,
                currentUser: action.payload
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                admin_token: action.admin_token
            }
        default: return state
    }
}

export default loginReducer