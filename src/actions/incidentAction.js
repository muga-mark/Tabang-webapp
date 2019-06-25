import {GET_INCIDENTS} from '../constants';
import fire from '../config/Fire';

export function getIncidents(){
    let app = fire.database().ref('/incidents');
    return dispatch => {
        app.on('value', snapshot => {
            dispatch({
                type: GET_INCIDENTS,
                payload: snapshot.val()
            })
        })
    }
}

export function saveIncident(incident){
    console.log('incident push', incident);
    let app = fire.database().ref('/incidents');
    return dispatch => app.push(incident);
}
