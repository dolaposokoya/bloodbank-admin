import loginReducer from './loginReducer';
import usersReducer from './getAllUserReducer';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    loginReducer,
    usersReducer,
});

export default allReducers;