import { GET_ALL_USER_REQUEST, GET_ALL_USER_REQUEST_FAILED, GET_ALL_USER_REQUEST_SUCCESS } from './actionTypes'
import { apiUrl } from '../url/apiUrl';
import axios from 'axios'


export const usersAction = (token, callback) => {
    return dispatch => {
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            authorization: `Basic ${apiUrl.basicAuth}`,
            token: `Bearer ${token}`
        }
        dispatch({ type: GET_ALL_USER_REQUEST })
        axios.get(`${apiUrl.getAllUsers}`, {
            headers: headers
        }).then(response => {
            const res = response.data
            if (res.success === false) {
                dispatch({ type: GET_ALL_USER_REQUEST_FAILED })
                callback({ error: true, message: response.data.message })
            }
            else if (res.success === true) {
                dispatch({ type: GET_ALL_USER_REQUEST_SUCCESS })
                callback({ error: false, message: response.data.message, data: response.data.data })
            }
        }).catch(error => {
            dispatch({ type: GET_ALL_USER_REQUEST_FAILED })
            callback({ error: true, message: error.message })
        })
    }
}