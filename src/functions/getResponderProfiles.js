import fire from '../config/Fire';

export function getResponderProfiles(userList){
    let userProfile = {};
    let userProfiles = [];
    userList.forEach((user) => {
        var userAccountRef = fire.database().ref(`users/${user.key}`);
        userAccountRef.once('value', snapshot => {
            userProfile = snapshot.val();
            userProfile.key = user.key;
            userProfile.distance = user.distance;
            userProfiles.push(userProfile);
            console.log('user profile', userProfile);
        });
    });
    return userProfiles;
}