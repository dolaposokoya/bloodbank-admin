const { REACT_APP_ENVIRONMENT, REACT_APP_AUTH } = process.env
const apiEndpoint = REACT_APP_ENVIRONMENT === 'development' ? `http://localhost:5000/api/` : `https://api-bloodbank-v1.herokuapp.com/api/`
const basicAuth = btoa(`${REACT_APP_AUTH}`)
console.log('basicAuth', basicAuth)
export const apiUrl = {
    basicAuth: basicAuth,
    loginUrl: apiEndpoint + "user/loginUser",
    userRegistrationUrl: apiEndpoint + "user/createUser",
    getAllUsers: apiEndpoint + "user/getAllUser",
    getMetaData: apiEndpoint + "bloodgroup/bloodAllGroup",
    makeRequest: apiEndpoint + "request/createRequest",
    sortAllUsers: apiEndpoint + "user/sortAllUser",
};