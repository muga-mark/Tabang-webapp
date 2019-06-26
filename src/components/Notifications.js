import React, {Component} from 'react';
import { Notifications } from 'react-notifications';

class Notification extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        // var isRespondingVolunteerNode = fire.database().ref(`incidents/${this.props.incidentKey}/${this.props.type}/${this.props.uid}/isRespondingVolunteer`);
        // isRespondingVolunteerNode.on('value', snapshot => {
        //     var isRespondingVolunteer = snapshot.val();
        //     if(isRespondingVolunteer){
        //         var audio = new Audio(notificationSound);
        //         audio.play();

        //         setTimeout(() => {
        //             var isRespondingVolunteerShown = fire.database().ref(`incidents/${this.props.incidentKey}/multipleVolunteers/${key}`);
        //             isRespondingVolunteerShown.update({isRespondingVolunteerShown: true}).then(()=>{
        //                 console.log('update isRespondingVolunteerShown', isRespondingVolunteerShown);
        
        //             }).catch(() => {
        //                 console.log(`Error in listening to isRespondingVolunteer. ID: ${key}`);
        //             });
                    
        //             }, 3000);
        //     }else{
        //         console.log(`Error in listening to isRespondingVolunteer. ID: ${key}`);                            
        //     }

        //     var isRespondingVolunteerShownNode = fire.database().ref(`incidents/${this.props.incidenKey}/multipleVolunteers/${key}/isRespondingVolunteerShown`);
        //     isRespondingVolunteerShownNode.on('value', snapshot => {
        //         var isRespondingVolunteerShown = snapshot.val();
        //         if(isRespondingVolunteer && !isRespondingVolunteerShown){

        //             var a = <div style={{fontSize:'12px'}}>
        //                 <b style={{paddingBottom:'8px'}}>Incident ID:</b>{this.props.incidentKey} <br />
        //                 <b style={{paddingBottom:'8px'}}>Incident Location:</b> {this.props.incidentLocation} <br /> <br />
        //                 <p>Volunteer <b>{this.props.name}</b> has accepted this incident.</p>
        //             </div>; 
        
        //             NotificationManager.success(a,'', 20000);

        //         }else{
        //             console.log(`Error in listening to isRespondingVolunteerShown. ID: ${key}`);      
        //         }
        //     });
    
        // });
    }

    render(){
        return <div></div>
    }
}

export default Notifications;