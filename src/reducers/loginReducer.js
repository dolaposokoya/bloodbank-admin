import { LOGIN_REQUEST, LOGIN_SUCCESS } from '../actions/actionTypes'

const INITIAL_STATE = {
    currentUser: {},
};
function loginReducer(state = INITIAL_STATE, action) {
    switch (action.types) {
        case LOGIN_REQUEST:
            return { ...state };
        case LOGIN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload
            }
        default: return state
    }
}

export default loginReducer