import fire, {fire2} from '../config/Fire';
import _ from 'lodash';
import swal from 'sweetalert';
import '../stylesheet_QueueIncidents.css';

export function createUserAccount (account, credentials = {}){
    const email = account.email;
    const password = account.password;
    const isMobile = account.isMobile;
    const user_type = account.user_type;
    const auth = fire2.auth();
    const promise = auth.createUserWithEmailAndPassword(email.trim(), password.trim());
    
    promise.then(user => {
      let app = fire.database().ref('users/'+user.user.uid);
      app.update(account);
      if(!_.isEmpty(credentials)){
        saveUserType(user_type, isMobile, user.user.uid, credentials);
      }else{
        saveUserType(user_type, isMobile, user.user.uid);
        swal(email,"Account successfully created!",{icon:"success"});
          var auth = fire2.auth();
          
          auth.sendPasswordResetEmail(email).then(function() {
            // Email sent.
            console.log('reset password sent');
          }).catch(e=> {
            // An error happened.
            var err = e.message;
            console.log(err);
            this.setState({err: err});
            
          });
      }
      return 'Success'
    });
    promise.catch(e=>{
      var registerError = e.message;
      console.log('ErrorNewAccount',registerError);
      swal(email,registerError,{icon:"error"});
    });
    
    

}

function saveUserType(user_type, isMobile, uid, credentials = {}){
  const mobileUsers = 'mobileUsers/';
  const webUsers = 'webUsers/';
  const coordinates = {
    lng: '',
    lat: ''
  }
  const credentialID = uid;
  let volunteerCredentials = credentials;
  const db = fire.database();
  let points = computeVolunteerPoints(volunteerCredentials);
  volunteerCredentials.points = points;
  
  switch(isMobile){
    case false: switch(user_type){
                  case 'Administrator': 
                                        db.ref(`${webUsers}/${user_type}/${uid}`).update({uid});
                                        break;
                  case 'Command Center Personnel': 
                                        db.ref(`${webUsers}/${user_type}/${uid}`).update({uid});
                                        break;
                  default: console.log(`Error: invalid web user type entered ${user_type}`);
                            break;                
              }
              break;
    case true: switch(user_type){
                  case 'Responder': 
                                    db.ref(`unverifiedMobileUsers/${uid}`).update({user_type});
                                    break;
                  case 'Regular User': 
                                    db.ref(`unverifiedMobileUsers/${uid}`).update({user_type});
                                    break;
                  case 'Volunteer': 
                                    db.ref(`unverifiedMobileUsers/${uid}`).update({user_type});
                                    db.ref(`credentials/${credentialID}`).update(volunteerCredentials);
                                    break;

                  default: console.log(`Error: invalid mobile user type entered ${user_type}`);
              }
              break;
    default: console.log(`Error: invalid user type entered ${user_type}`);
              break;
  }
}

//TODO: compute points for volunteer credentials

function computeVolunteerPoints(credentials){
  let points = 0;
  if(!_.isEmpty(credentials.certification)){
    points = points + 5;
  }
  if(!_.isEmpty(credentials.medicalDegree)){
    points = points + 10;
  }
  if(!_.isEmpty(credentials.medicalProfession)){
    points = points + 15;
  }
  if(credentials.isActive){
    points = points + 15;
  }
  if(credentials.durationService !== 0){
    points = points + (credentials.durationService * 2);
  }
  return points;

}
