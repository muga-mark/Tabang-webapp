import {SIGNED_IN} from '../constants';

export default function logUser(userAccount){
    console.log('user in redux', userAccount);
    const action = {
        type: SIGNED_IN,
        payload: {
            userAccount
        }
    }
    return action;
}