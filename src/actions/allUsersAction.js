import { GET_ALL_USER_REQUEST, GET_ALL_USER_REQUEST_FAILURE, GET_ALL_USER_REQUEST_FAILED, GET_ALL_USER_REQUEST_SUCCESS } from './actionTypes'
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
            if (res.success === false && res.status === 401) {
                dispatch({ type: GET_ALL_USER_REQUEST_FAILURE, payload: res.message })
                callback({ unauthorized: true, message: res.message, status: res.status })
            }
            else if (res.success === false && res.status < 399) {
                dispatch({ type: GET_ALL_USER_REQUEST_FAILED, payload: res.message })
                callback({ error: true, message: res.message })
            }
            else if (res.success === true) {
                dispatch({ type: GET_ALL_USER_REQUEST_SUCCESS, payload: res.data })
                callback({ error: false, message: res.message, data: res.data })
            }
        }).catch(error => {
            dispatch({ type: GET_ALL_USER_REQUEST_FAILED })
            callback({ error: true, message: error.message })
        })
    }
}