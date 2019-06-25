import React, {Component} from 'react';
import _ from "lodash";
import fire from '../config/Fire';
import MapWithPlaces from './MapWithPlaces';

class CityMap extends Component {
    constructor(props){
      super(props);
      this.state = {
          incidentsList: [{
              key: '',
              incidentType: '',
              incidentLocation: '',
              coordinates: {
                lng: '',
                lat: ''
              },
              responded: null
          }],
          responders: [{
            coordinates: {
              lng: '',
              lat: ''
            },
            uid: ''
          }],
          volunteers: [{
            coordinates: {
              lng: '',
              lat: ''
            },
            uid: ''
          }],
          regularUsers: [{
            coordinates: {
              lng: '',
              lat: ''
            },
            uid: ''
          }],
      }
      let app = fire.database().ref('/incidents');
      let respondersRef = fire.database().ref('mobileUsers/Responder');
      let volunteersRef = fire.database().ref('mobileUsers/Volunteer');
      let regularUsersRef = fire.database().ref('mobileUsers/Regular User');

      app.on('value', snapshot => {
          this.getData(snapshot.val());
      });

      respondersRef.on('value', snapshot => {
        this.getMobileUserCoordinates(snapshot.val(), 'Responder');
      });

      volunteersRef.on('value', snapshot => {
        this.getMobileUserCoordinates(snapshot.val(), 'Volunteer');
      });

      regularUsersRef.on('value', snapshot => {
        this.getMobileUserCoordinates(snapshot.val(), 'Regular User');
      });
      console.log('constructor respondrs', this.state.volunteers);
  }

  getData = (values) => {
      let incidentValues = values;
      let incidentsList = _(incidentValues)
                          .keys()
                          .map(incidentKey => {
                              let cloned = _.clone(incidentValues[incidentKey]);
                              cloned.key = incidentKey;
                              return cloned;
                          })
                          .value();
      this.setState({incidentsList: incidentsList});
  }

  getMobileUserCoordinates = (values, user_type) => {
    let mobileUsersValues = values;
    let mobileUsersList = _(mobileUsersValues)
                          .keys()
                          .map(userKey => {
                              let cloned = _.clone(mobileUsersValues[userKey]);
                              cloned.key = userKey;
                              return cloned;
                          })
                          .value();
    this.setMobileList(mobileUsersList, user_type);
    console.log('mobile users', mobileUsersList);
  }

  setMobileList = (mobileUsersList, user_type) => {
    switch(user_type){
      case 'Responder': this.setState({responders: mobileUsersList});
                        break;
      case 'Volunteer': this.setState({volunteers: mobileUsersList});
                        break;
      case 'Regular User': this.setState({regularUsers: mobileUsersList});
                        break;
      default: console.log(`Error: Invalid user_type: ${user_type}`);
    }
  }
  
  render() { 
    console.log('constructor respondrs', this.state.volunteers);

    return(
      <div>
      {console.log('responder list', this.state.responders)}
        <MapWithPlaces 
          center={{ lat: 10.324646, lng: 123.942197 }}
          zoom={15}
          places={this.state.incidentsList}
          responders = {this.state.responders}
          volunteers = {this.state.volunteers}
          regularUsers = {this.state.regularUsers}
        />
      </div>
    );
  }
}

export default CityMap;

    //Mandaue City coords
        // lat: 10.333333,
        // lng: 123.933334
        
        //MCPO coords
        // 10.324646, 123.942197