import {combineReducers} from 'redux';
import incidentsReducer from './incidentsReducer';
import userReducer from './userReducer';
import uidReducer from './uidReducer';

const rootReducer = combineReducers({
    incidents: incidentsReducer,
    user: userReducer,
    uid: uidReducer
}); 

export default rootReducer;