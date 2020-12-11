import { LOGIN_REQUEST, LOGIN_SUCCESS } from './actionTypes'
import { apiUrl } from '../url/apiUrl';
const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    authorization: `Basic ${apiUrl.basicAuth}`
}

export const LoginAction = (loginData, callback) => {
    return dispatch => {
        dispatch({ type: LOGIN_REQUEST });
        fetch(apiUrl.loginUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(loginData),
        })
            .then(response => response.json())
            .then(userData => {
                if (userData) {
                    console.log('userData', userData.data)
                    if (userData.success === false) {
                        dispatch({ type: LOGIN_SUCCESS, payload: userData.message });
                        callback({ error: true, message: userData.message })
                    }
                    else if (userData.success === true) {
                        localStorage.setItem('token', userData.data.token)
                        localStorage.setItem('profile_id', userData.data.profile_id)
                        localStorage.setItem('image', userData.data.fileName)
                        dispatch({ type: LOGIN_SUCCESS, payload: userData.message });
                        callback({ error: false, message: userData.message })
                    }
                }
            })
    };
};