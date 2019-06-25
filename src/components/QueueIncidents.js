import React, {Component} from 'react';
import EmergencyDetails from './EmergencyDetails';
import _ from 'lodash';
import {connect} from 'react-redux';
import {getIncidents} from '../actions/incidentAction';
import '../stylesheet_QueueIncidents.css';
import {NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

class QueueIncidents extends Component {
   
    constructor(props){
        super(props);
        this.state = {
            incidentsList : [{
                key: '',
                incidentType: '',
                incidentLocation: '',
                isResponded: '',
                coordinates: {
                    lng: '',
                    lat: ''
                },
            }],
        }
        this.renderEmergency = this.renderEmergency.bind(this);
        
    }

    componentDidMount(){
        this.props.getIncidents();
    }


    renderEmergency = () => {        
        var list = [];
        _.map(this.props.incidentsList, (incident, key)=> {
            incident.key = key;
            list.push(incident);
        })
        list.sort(function(a,b){
            return new Date(b.timeReceived) - new Date(a.timeReceived);
          });
        return _.map(list, (incident, key) => {
             
        if(incident.isRedundantReport === false){
            if(incident.isSettled === false){
                return (
                    <div className='item' key={key}>
                        <EmergencyDetails 
                            timeReceived = {incident.timeReceived}
                            incidentType = {incident.incidentType} 
                            incidentLocation = {incident.incidentLocation}
                            incidentNote = {incident.incidentNote}
                            coordinates = {incident.coordinates}
                            incidentKey = {incident.key}
                            reporterName = {incident.reporterName}
                            responderResponding = {incident.responderResponding}
                            volunteerResponding = {incident.volunteerResponding}
                            isRespondingResponder = {incident.isRespondingResponder}
                            isRespondingVolunteer = {incident.isRespondingVolunteer}
                            isRespondingResponderShown = {incident.isRespondingResponderShown}
                            isRespondingVolunteerShown = {incident.isRespondingVolunteerShown}
                            image_uri = {incident.image_uri}
                            originalResponderName = {incident.originalResponderName}
                            originalVolunteerName = {incident.originalVolunteerName}

                        />
                    </div>
                );
            }
            }
            if(incident.isSettled === true && incident.isShown === false){   
                var a = <div>
                                <p><b>Incident Location:</b> {incident.incidentLocation}</p>
                                <p>This incident has been settled</p>
                            </div>; 
            
                    NotificationManager.success(a,'', 20000);
            }
        });
    }
    
    render(){
        
        return (
            <div className="hidescrollbar">
                <div className="ui visible left vertical sidebar menu">
                        {this.renderEmergency()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps){
    console.log('incidentsList', state.incidents);
    return {
        incidentsList: state.incidents,
    }
}
 


export default connect(mapStateToProps, {getIncidents})(QueueIncidents);