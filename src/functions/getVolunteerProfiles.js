import fire from '../config/Fire';
import _ from 'lodash';

export function getVolunteerProfiles(uid){
    var volunteerProfileNode = fire.database().ref(`users/${uid}`);
    var volunteerProfile = {};
    volunteerProfileNode.once('value', snapshot => {
        volunteerProfile = snapshot.val();
        console.log('profile', volunteerProfile);
    });
    return volunteerProfile;
}