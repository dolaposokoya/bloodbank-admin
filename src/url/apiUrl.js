const env = `development`;
const apiEndpoint = env === 'development' ? `http://localhost:5000/api/` : `https://api-bloodbank-v1.herokuapp.com/api/`
const basicAuth = btoa(`bloodbank-api@gmail.com:e2b1b93e3082485a308992c8c30e06c1`)

export const apiUrl = {
    basicAuth: basicAuth,
    loginUrl: apiEndpoint + "user/loginUser",
    userRegistrationUrl: apiEndpoint + "user/createUser",
    getAllusers: apiEndpoint + "user/getAllUser",
    getMetaData: apiEndpoint + "bloodgroup/bloodAllGroup",
    makeRequest: apiEndpoint + "request/createRequest",
};