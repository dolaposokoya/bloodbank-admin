import loginReducer from './loginReducer';
// import userReducer from './userDataReducer';
// import metaDataReducer from './metaDataReducer';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    loginReducer,
    //   userReducer,
    //   metaDataReducer,
});

export default allReducers;