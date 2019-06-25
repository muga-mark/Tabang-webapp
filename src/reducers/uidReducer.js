import {SIGNED_IN_UID} from '../constants';

let uid = {}

export default function uidReducer(state = uid, action){
    switch(action.type){
        case SIGNED_IN_UID:
            uid = action.payload;
            return uid;
        default:
            return state;
    }
}
