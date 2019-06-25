import {SIGNED_IN} from '../constants';

let user = {}

export default function userReducer(state = user, action){
    switch(action.type){
        case SIGNED_IN:
            user = action.payload;
            return user;
        default:
            return state;
    }
}
