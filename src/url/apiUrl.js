const { REACT_APP_ENVIRONMENT, REACT_APP_AUTH, REACT_APP_API_URL, REACT_APP_BASE_URL } = process.env
const apiEndpoint = REACT_APP_ENVIRONMENT === 'development' ? `${REACT_APP_API_URL}` : `https://api-bloodbank-v1.herokuapp.com/api/`
const baseEndpoint = REACT_APP_ENVIRONMENT === 'development' ? `${REACT_APP_BASE_URL}` : `https://api-bloodbank-v1.herokuapp.com/`
// https://api-bloodbank-v1.herokuapp.com/
const basicAuth = btoa(`${REACT_APP_AUTH}`)

export const apiUrl = {
    basicAuth: basicAuth,
    loginUrl: apiEndpoint + "admin/loginAdmin",
    userRegistrationUrl: apiEndpoint + "admin/createAdmin",
    getAllUsers: apiEndpoint + "user/getAllUser",
    getMetaData: apiEndpoint + "bloodgroup/bloodAllGroup",
    makeRequest: apiEndpoint + "request/createRequest",
    sortAllUsers: apiEndpoint + "user/sortAllUser",
    imageUrl: baseEndpoint,
    updateStatus: apiEndpoint + "admin/updateStatus",
};