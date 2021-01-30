import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR } from '../actions/actionTypes'

const INITIAL_STATE = {
    currentUser: {},
    session_id: '',
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
                session_id: action.session_id
            }
        default: return state
    }
}

export default loginReducer