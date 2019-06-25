import fire from '../config/Fire';
import _ from 'lodash';

export function dispatchVolunteer(onlineVolunteers){
    var volunteers = onlineVolunteers;
    console.log('volunteers', typeof volunteers);
    console.log('volunteers list', volunteers);
    _.map(volunteers, (volunteer) => {
        console.log('asgsrthsdfg', volunteer);
    })
}