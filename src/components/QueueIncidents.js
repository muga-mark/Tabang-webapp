import React, {Component} from 'react';
import EmergencyDetails from './EmergencyDetails';
import _ from 'lodash';
import {connect} from 'react-redux';
import {getIncidents} from '../actions/incidentAction';
import '../stylesheet_QueueIncidents.css';
import {NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import notificationSound from '../sound files/notificationSound.mp3';
import fire from '../config/Fire';

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

    computeTotalResponseTime = (date2, date1) => {
        var res = Math.abs(date1 - date2) / 1000;
        var days = Math.floor(res / 86400);                      
        var hours = Math.floor(res / 3600) % 24;        
        var minutes = Math.floor(res / 60) % 60;
        var seconds = res % 60;
        var time = {
            days, hours, minutes, seconds
        }
        return time;
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
        var multipleVolunteers, multipleResponders;
    
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
                            isDisplayCard = {incident.isDisplayCard}
                            isDisplayCardShown = {incident.isDisplayCardShown}

                        />
                    </div>
                );
            }
            }
            if(incident.isSettled === true && incident.isShown === false){  
                var {days, hours, minutes, seconds} = this.computeTotalResponseTime(new Date(incident.timeResponderArrived), new Date(incident.timeReceived)); 
                var a = <div style={{fontSize:'12px'}}>
                                <b style={{paddingBottom:'8px'}}>Incident ID:</b>{incident.key} <br />
                                <b style={{paddingBottom:'8px'}}>Incident Location:</b> {incident.incidentLocation} <br /> <br />
                                <span style={{paddingBottom:'8px'}}>This incident has been settled</span> <br /> <br />
                                <span><b>Total Response Time:</b> <br />
                                {days} day/s: {hours} hour/s: {minutes} minute/s: {seconds} second/s </span>
                        </div>; 
            
                var audio = new Audio(notificationSound);
                audio.play();
                
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