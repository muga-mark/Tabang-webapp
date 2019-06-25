import React from "react";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
  Circle
} from "react-google-maps";
import { compose, withProps, withStateHandlers } from "recompose";
import { Button, Modal,} from 'semantic-ui-react';
//load custom markers for map
import vehicularUnresponded from '../../src/images/va_new.png';
import vehicularResponding from '../../src/images/va_otw.png';
import vehicularSettled from '../../src/images/va_fin.png';
import physicalUnresponded from '../../src/images/pi_new.png';
import physicalResponding from '../../src/images/pi_otw.png';
import physicalSettled from '../../src/images/pi_fin.png';
import volunteerLogo from '../images/tracking_volunteer.png';
import responderLogo from '../images/tracking_responder.png';

const MapWithPlaces = compose(
  
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyDnJpxYlDPNrGJSQir9SoWBEbMaFa5Nv5w&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: "93vh", width: "100%" }} />,
    mapElement: <div style={{ height: "100%" }} />
  }),
  withStateHandlers(
    props => ({
      infoWindows: props.places.map(p => {
        return { isOpen: false };
      })
    }),
    {
      onToggleOpen: ({ infoWindows }) => selectedIndex => ({
        infoWindows: infoWindows.map((iw, i) => {
          iw.isOpen = selectedIndex === i;
          return iw;
        })
      })
    }
  ),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={props.zoom} defaultCenter={props.center}>
    {props.places &&
      props.places.map((place, i) => {
        let lat = parseFloat(place.coordinates.lat, 10);
        let lng = parseFloat(place.coordinates.lng, 10);     
        let incidentLogo = setLogo(place.incidentType, place.unresponded, place.isResponding, place.isSettled);
        console.log('responders', props.responders);
        if(place.isSettled && !place.isResponding && !place.unresponded){
          return (
              <div key = {i}>
                  <Modal size="tiny" trigger={<Marker
                    position={{ lat: lat, lng: lng }}
                    title={place.incidentLocation} 
                    icon={{
                      url: incidentLogo,
                      scaledSize: new window.google.maps.Size(50,50) 
                    }}>
                    </Marker>}>
                      <Modal.Header>New Emergency</Modal.Header>
                      <Modal.Content>
                            <p><b>Reported by:</b> Regular User</p>
                            <p><b>Type of Incident:</b> {place.incidentType}</p>
                            <p><b>Location of Incident:</b> {place.incidentLocation}</p>
                            <p><b>Photo of Incident:</b></p>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button color='red' >
                                Dispatch Responders
                            </Button>
                            <Button color='blue'>
                                Request Volunteers
                            </Button>
                        </Modal.Actions>
                  </Modal>

              </div>
          );
        }else{
          return (
              <div key = {i}>
                  <Modal size="tiny" trigger={<Marker
                    position={{ lat: lat, lng: lng }}
                    title={place.incidentLocation} 
                    icon={{
                      url: incidentLogo,
                      scaledSize: new window.google.maps.Size(50,50) 
                    }}>
                    <Circle center={{lat: lat, lng: lng}} radius={500} visible={true} 
                      options={{
                        strokeColor: '#babfc7',
                        fillColor: '#7d899e',
                        strokeOpacity: 0.5,
                        strokeWeight: 1,
                        fillOpacity: 0.5,
                        }}   
                    />
                    </Marker>}>
                      <Modal.Header>New Emergency</Modal.Header>
                      <Modal.Content>
                            <p><b>Reported by:</b> Regular User</p>
                            <p><b>Type of Incident:</b> {place.incidentType}</p>
                            <p><b>Location of Incident:</b> {place.incidentLocation}</p>
                            <p><b>Photo of Incident:</b></p>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button color='red' >
                                Dispatch Responders
                            </Button>
                            <Button color='blue'>
                                Request Volunteers
                            </Button>
                        </Modal.Actions>
                  </Modal>

              </div>
          );
        }
      })
    }
      {/*render volunteers*/}
      {props.volunteers &&
        props.volunteers.map((volunteer, i) => {
          let lat = parseFloat(volunteer.coordinates.lat, 10);
          let lng = parseFloat(volunteer.coordinates.lng, 10);     
          //let incidentLogo = setLogo(place.incidentType, place.unresponded, place.isResponding, place.isSettled);
          let volunteerPin = volunteerLogo;
          console.log('uid', volunteer.uid);
          return (
              <div key = {i}>
                  <Modal size="tiny" trigger={<Marker
                    position={{ lat: lat, lng: lng }}
                    icon={{
                      url: volunteerPin,
                      scaledSize: new window.google.maps.Size(35,50) 
                    }}
                    >
                    
                    </Marker>}>
                      <Modal.Header>Volunteer</Modal.Header>
                      <Modal.Content>
                            <p>UID: {volunteer.key}</p>
                        </Modal.Content>
                        <Modal.Actions>
                          <Button color='red' >
                              Dispatch Responders
                          </Button>
                          <Button color='blue'>
                              Request Volunteers
                          </Button>
                      </Modal.Actions>
                  </Modal>
  
              </div>
          );
        })}

        {/*Render Responders*/}
        {props.responders &&
          props.responders.map((responder, i) => {
            let lat = parseFloat(responder.coordinates.lat, 10);
            let lng = parseFloat(responder.coordinates.lng, 10);     
            //let incidentLogo = setLogo(place.incidentType, place.unresponded, place.isResponding, place.isSettled);
            let responderPin = responderLogo;
            console.log('uid', responder.uid);
            return (
                <div key = {i}>
                    <Modal size="tiny" trigger={<Marker
                      position={{ lat: lat, lng: lng }}
                      icon={{
                        url: responderPin,
                        scaledSize: new window.google.maps.Size(50,50) 
                      }}
                      >
                      
                      </Marker>}>
                        <Modal.Header>Responder</Modal.Header>
                        <Modal.Content>
                              <p>UID: {responder.key}</p>
                          </Modal.Content>
                          <Modal.Actions>
                            <Button color='red'>
                                Dispatch Responders
                            </Button>
                            <Button color='blue'>
                                Request Volunteers
                            </Button>
                        </Modal.Actions>
                    </Modal>
    
                </div>
            );
          })}
    
  </GoogleMap>
));

//assigns the custom markers
const setLogo = (incidentType, unresponded, responding, settled) => {
  let logo = null;
  switch(incidentType){
    case 'Vehicular Accident':
      if(unresponded){
        logo = vehicularUnresponded;
      }else if(responding){
        logo = vehicularResponding;
      }else if(settled){
        logo = vehicularSettled;
      }
      break;
    case 'Physical Injury':
      if(unresponded){
        logo = physicalUnresponded;
      }else if(responding){
        logo = physicalResponding;
      }else if(settled){
        logo = physicalSettled;
      }
      break;
    default:
      break;
  }
  return logo;
}

export default MapWithPlaces;

// lat 10.32477
// lng 123.93278