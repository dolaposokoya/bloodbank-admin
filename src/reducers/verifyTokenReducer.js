import { actions } from "react-table";
import { VERIFY_TOKEN_FAILED, VERIFY_TOKEN_REQUEST, VERIFY_TOKEN_SUCCESS } from "../actions/actionTypes";

const initial_state = {
    verified: {}
}

function verifyTokenReducer(state = initial_state, action) {
    switch (actions.types) {
        case VERIFY_TOKEN_REQUEST:
            return { ...state }
        case VERIFY_TOKEN_SUCCESS:
            return {
                ...state,
                verified: action.payload
            }
        case VERIFY_TOKEN_FAILED:
            return { ...state }
        default:
            return state
    }
}
export default verifyTokenReducer