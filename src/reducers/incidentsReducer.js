import {GET_INCIDENTS} from '../constants';
import {SAVE_INCIDENT} from '../constants';

export default function(state = [], action){
    switch(action.type){
        case GET_INCIDENTS: 
            return action.payload;
        case SAVE_INCIDENT:
            return [...state, action.payload];
        default: return state;
    }
}