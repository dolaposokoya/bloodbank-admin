import loginReducer from './loginReducer';
import usersReducer from './getAllUserReducer';
import tokenReducer from './verifyTokenReducer';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    loginReducer,
    usersReducer,
    tokenReducer
});

export default allReducers;