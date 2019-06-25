import firebase from 'firebase';

  // Initialize Firebase
const config = {
  apiKey: "AIzaSyBgzYBdUhkg4o-015KSPN0BYX9YrctNdG0",
  authDomain: "emergencyresponsesystem-57dc4.firebaseapp.com",
  databaseURL: "https://emergencyresponsesystem-57dc4.firebaseio.com",
  projectId: "emergencyresponsesystem-57dc4",
  storageBucket: "emergencyresponsesystem-57dc4.appspot.com",
  messagingSenderId: "583480520859"

};
const fire = firebase.initializeApp(config);
export const fire2 = firebase.initializeApp(config, "Secondary");
//create user session
//destroy current user session
export default fire1;