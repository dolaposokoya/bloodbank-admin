import { VERIFY_TOKEN_FAILED, VERIFY_TOKEN_REQUEST, VERIFY_TOKEN_SUCCESS } from "./actionTypes";
import axios from "axios";
import { apiUrl } from '../url/apiUrl'

export const verifyTokenAction = (token, callback) => {
    return dispatch => {
        dispatch({ type: VERIFY_TOKEN_REQUEST })
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            token: `${token}`
        }
        axios.post(`${apiUrl.validateToken}`, { headers }).then(response => {
            const data = response.data
            if (response) {
                if (data.success === false) {
                    dispatch({ type: VERIFY_TOKEN_FAILED, payload: data.data });
                    callback({ error: true, message: data.message })
                }
                else if (data.success === true) {
                    dispatch({ type: VERIFY_TOKEN_SUCCESS, payload: data.data });
                    callback({ error: false, message: data.message, data: data.data })
                }
            }
            else {
                dispatch({ type: VERIFY_TOKEN_FAILED });
                callback({ error: true, message: 'Something went wrong' })
            }
        }).catch(error => {
            dispatch({ type: VERIFY_TOKEN_FAILED, payload: error.message });
            callback({ error: true, message: error.message })
        })
    }

}