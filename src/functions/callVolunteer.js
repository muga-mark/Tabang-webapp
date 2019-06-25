import fire from '../config/Fire';
import _ from 'lodash';
import {getVolunteerProfiles} from './getVolunteerProfiles';
import { computeDistance } from './computeDistance';

export function callVolunteer(volunteerWithCredentials, incidentKey, incidentCoords){
    var volunteerNode = fire.database();
    var selectedVolunteers = volunteerWithCredentials;
    var incidentID = incidentKey
    var isAccepted = false;
    var volunteerProfile = {};
    var volunteerList = [];
    _.map(selectedVolunteers, (volunteer, key) => {
        console.log('volunteersfasd', volunteer);
        var volunteerProfileNode = fire.database().ref(`users/${volunteer.uid}`);
        var volunteerNodePromise = volunteerProfileNode.on('value', snapshot => {
            volunteerProfile = snapshot.val();
            volunteer.firstName = volunteerProfile.firstName;
            volunteer.lastName = volunteerProfile.lastName;
            volunteer.email = volunteerProfile.email;
            volunteer.contactNumber = volunteerProfile.contactNumber;
            console.log('profile', volunteerProfile);
            volunteerList.push(volunteer);
        });
    });
    console.log('call volunteer', volunteerList);
    return volunteerList;
}

