const { REACT_APP_ENVIRONMENT, REACT_APP_AUTH } = process.env
console.log('REACT_APP_ENVIRONMENT',REACT_APP_ENVIRONMENT)
const apiEndpoint = REACT_APP_ENVIRONMENT === 'development' ? `http://localhost:5000/api/` : `https://api-bloodbank-v1.herokuapp.com/api/`
const baseEndpoint = REACT_APP_ENVIRONMENT === 'development' ? `http://localhost:5000/` : `https://api-bloodbank-v1.herokuapp.com/`
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