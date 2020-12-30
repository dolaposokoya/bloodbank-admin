const { REACT_APP_ENVIRONMENT, REACT_APP_AUTH } = process.env
const apiEndpoint = REACT_APP_ENVIRONMENT === 'development' ? `http://localhost:5000/api/` : `https://api-bloodbank-v1.herokuapp.com/api/`
const baseURL = REACT_APP_ENVIRONMENT === 'development' ? `http://localhost:5000/` : `https://api-bloodbank-v1.herokuapp.com/`
const basicAuth = btoa(`${REACT_APP_AUTH}`)

export const apiUrl = {
    baseURL: baseURL,
    basicAuth: basicAuth,
    loginUrl: apiEndpoint + "admin/loginAdmin",
    userRegistrationUrl: apiEndpoint + "admin/createAdmin",
    getAllUsers: apiEndpoint + "user/getAllUser",
    getMetaData: apiEndpoint + "bloodgroup/bloodAllGroup",
    makeRequest: apiEndpoint + "request/createRequest",
    sortAllUsers: apiEndpoint + "user/sortAllUser",
    updateStatus: apiEndpoint + "admin/updateStatus",
    validateToken: apiEndpoint + "token/validateToken",
};