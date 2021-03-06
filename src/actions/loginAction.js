import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR } from './actionTypes'
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
                    if (userData.success === false) {
                        dispatch({ type: LOGIN_SUCCESS, payload: userData.message });
                        callback({ error: true, message: userData.message })
                    }
                    else if (userData.success === true) {
                        const name = `${userData.data.first_name.charAt(0).toUpperCase()}${userData.data.last_name.charAt(0).toUpperCase()}`
                        const profile_image = `${userData.data.profile_image}`
                        const session_id = `${userData.data.SESSION_ID}`
                        localStorage.setItem('image', profile_image)
                        localStorage.setItem('name', name)
                        dispatch({ type: LOGIN_SUCCESS, payload: userData.message });
                        callback({ error: false, message: userData.message, session_id: session_id })
                    }
                }
            }).catch(error => {
                dispatch({ type: LOGIN_ERROR, payload: error.message });
                callback({ error: true, message: error.message })
            })
    };
};