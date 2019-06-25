import {SIGNED_IN_UID} from '../constants';

export default function logUID(uid){
    const action = {
        type: SIGNED_IN_UID,
        payload: {
            uid
        }
    }
    return action;
}