/*global google*/
import React, { Component } from 'react'
import { Menu, Dropdown, Icon, Modal, Form, Button, Radio, Select, Image } from 'semantic-ui-react'
import fire from '../config/Fire';
import {connect} from 'react-redux';
import {saveIncident} from '../actions/incidentAction';
import {createUserAccount} from '../functions/createUserAccount';
import '../stylesheet_QueueIncidents.css';
import '../HeaderDashboard.css';
import PlacesAutocomplete, {geocodeByAddress, getLatLng, geocodeByPlaceId} from 'react-places-autocomplete';
import vehicularUnresponded from '../../src/images/va_new.png';
import vehicularResponding from '../../src/images/va_otw.png';
import vehicularSettled from '../../src/images/va_fin.png';
import physicalUnresponded from '../../src/images/pi_new.png';
import physicalResponding from '../../src/images/pi_otw.png';
import physicalSettled from '../../src/images/pi_fin.png';
import volunteerLogo from '../images/tracking_volunteer.png';
import responderLogo from '../images/tracking_responder.png';
import incStat from '../images/incident_new.png';
import swal from 'sweetalert';
import {Link} from "react-router";

const noteRegex = RegExp(
  /^.{0,150}$/
);

const formValid = ({ formError, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formError).forEach(val => {
    val.length > 0 && (valid = false)
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });


  return valid;
}

class HeaderDashboard extends Component{
  
  constructor(props){
    
      super(props);
      
      this.state = {
        open: false,
        open2: false,
        incidentType: '',
        incidentLocation: '',
        destinationPlaceId:'',
        errorAddress:'',
        unresponded: null,
        isResponding: null,
        isSettled: null,
        lat: null,
        lng: null,
        errorMessage: '',
        isShown: false,
        incidentPhoto: null,
        reportedBy: '',
        reporterName: '',
        timeReceived: null,
        timeResponded: null,
        responderResponding: [],
        volunteerResponding: '',
        incidentNote:'',
        firstName: '',
        lastName: '',
        password: '',
        email: '',
        user_type: '',
        contactNumber: '',
        formError: {
          incidentNote:''
        },
      userID: '',
      uid: '',
      currentUID: ''
      }
      this.logout = this.logout.bind(this);
      this.getUserProfile();
      
      
  }

  componentDidMount(){
    this.getUserProfile();
  }

  getUserProfile = () =>{
    
    var userProfile = fire.database().ref(`users/${this.props.uid.uid}`);
        var firstName, lastName, snap;
        userProfile.on('value', snapshot => {
            // console.log('snapshot', snapshot);
            snap = snapshot.val();
            firstName = snap.firstName;
            lastName = snap.lastName;
            
            this.setState({firstName, lastName}, () => {
                // console.log(`${this.state.firstName} ${this.state.lastName} userAccount`);
            });
        });
  }
  

  show = size => () => this.setState({ size, open: true })
  close = () => this.setState(
    { open: false, incidentType: '', incidentLocation: '', errorMessage:'', errorAddress:'', incidentNote:'' })


  handleChange = (incidentLocation, destinationPlaceId, e)  => {
    this.setState({ incidentLocation, destinationPlaceId, errorMessage: '', errorAddress:''});
    this.getUserProfile();
  };

  handleNote = (e) =>{
    e.preventDefault();
    const { name, value } = e.target;
    
    let formError = { ...this.state.formError };

    if (name === "incidentNote"){
      formError.incidentNote = noteRegex.test(value) ? "" : "max of 150 characters";
    }


    this.setState({ formError, [name]: value }, () => console.log(this.state));

  }

  handleSelect = (incidentLocation, destinationPlaceId) => {
    geocodeByPlaceId(destinationPlaceId)
    .then(results => {geocodeByPlaceId(results[0].place_id)
    // .then(placeId => {
        this.setState({destinationPlaceId});
        console.log('destinationPlaceId:',destinationPlaceId)
        console.log(results)
    })
    .catch(error => console.error(error));

    
    geocodeByAddress(incidentLocation)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
          this.setState({lng: latLng.lng, lat: latLng.lat});
          console.log('Incident Location:',incidentLocation)
      })
      .catch(errorAddress => {
        var errorAddress;
        console.log('Invalid Address!', errorAddress);
        this.setState({errorAddress:errorAddress}) // eslint-disable-line no-console
      });
  };

  handleCloseClick = () => {
    this.setState({
      incidentLocation: '',
      latitude: null,
      longitude: null,
    });
  };

  handleError = (status, clearSuggestions) => {
    console.log('Error from Google Maps API', status); // eslint-disable-line no-console
    this.setState({ errorMessage: status }, () => {
      clearSuggestions();
    });
  };

  inputIncidentTypeHandler = (e, {incidentType}) => this.setState({ incidentType})

  inputIncidentLocationHandler = (e) => {
    this.setState({ incidentLocation: e.target.value });
  }

  submitIncidentHandler = (e) => {
    // console.log('uid reported', this.props.user.uid);
    
    e.preventDefault();
    
    var d = Date();
    var a = d.toString()  

    const timeReceived = a;
    const incident = {
      incidentType: this.state.incidentType,
      incidentLocation: this.state.incidentLocation,
      incidentNote: this.state.incidentNote,
      image_uri: '',
      unresponded: true,
      isResponding: false,
      isSettled: false,
      coordinates: {lng: this.state.lng, lat: this.state.lat},
      // incidentPhoto: '',
      reportedBy: this.props.uid.uid,
      reporterName: this.state.firstName + " " + this.state.lastName,
      timeReceived,
      timeResponded: '',
      timeSettled: '',
      responderResponding: '',
      volunteerResponding: '',
      destinationPlaceId: this.state.destinationPlaceId,
      isRequestingResponders: false,
      isRequestingVolunteers: false,
      isRespondingResponder: false,
      unrespondedResponder: true,
      isRespondingVolunteer: false,
      unrespondedVolunteer: true,
      isShown: false,
      isRespondingResponderShown: false,
      isRespondingVolunteerShown: false,
      isRedundantReport: false
    }
    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        Note: ${this.state.incidentNote}
      `);
    }
    this.props.saveIncident(incident);
    this.setState({
        incidentType: '',
        incidentLocation: '',
        destinationPlaceId: '',
        incidentNote:'',
        unresponded: false,
        isResponding: false,
        isSettled: false,
        lng: null,
        lat: null,
        isShown: false,
        isRespondingResponderShown: false,
        isRespondingVolunteerShown: false,
        isRedundantReport: false
    });
    console.log(this.state.incidentsList);
    swal(this.state.incidentLocation,"New incident has been added!");
  }

 
  logout() {
    fire.auth().signOut();
  }

  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })


  render() {
    const { open, size, open2, size2} = this.state
    const { formError } = this.state;
    const {errorMessage} = this.state;

    const searchOptions = {
      location: new google.maps.LatLng(10.324646, 123.942197),
      radius: 10,
      types: ['establishment']
    }

    // this.getUserProfile();


    return (

    <div>
      {/* Header Menu */}
      <Menu inverted>
          <Menu.Menu position='left'>
              <Menu.Item>
                 <span className="appLogo"></span><span style={{marginLeft:"40px"}}>Tabang!</span>
              </Menu.Item>
              <Menu.Item link onClick={this.show('tiny')}>
                 <Icon className="plus" />Add Incident
                 
              </Menu.Item>
          </Menu.Menu>
          <Menu.Menu position='right'>
            <Menu.Item>
              <Dropdown text='Legends' pointing='top right' floating iconPosition='right' icon='caret down'  >
                <Dropdown.Menu>
                  <Dropdown.Item><Image src={vehicularUnresponded} size='mini' floated='right'/>Vehicular Unresponded</Dropdown.Item>
                  <Dropdown.Item><Image src={vehicularResponding} size='mini' floated='right'/>Vehicular Responding</Dropdown.Item>
                  <Dropdown.Item><Image src={vehicularSettled} size='mini' floated='right'/>Vehicular Settled</Dropdown.Item>
                  <Dropdown.Item><Image src={physicalUnresponded} size='mini' floated='right'/>Physical Unresponded</Dropdown.Item>
                  <Dropdown.Item><Image src={physicalResponding} size='mini' floated='right'/>Physical Responding</Dropdown.Item>
                  <Dropdown.Item><Image src={physicalSettled} size='mini' floated='right'/>Physical Settled</Dropdown.Item>
                  <Dropdown.Divider/>
                  <Dropdown.Item><Image src={responderLogo} size='mini' floated='right'/>Responder</Dropdown.Item>
                  <Dropdown.Item><Image src={volunteerLogo} size='mini' floated='right'/>Volunteer</Dropdown.Item>
                  <Dropdown.Item><Image src={incStat} size='mini' floated='right'/>New Emergency</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
            <Link to='/ProfileCCP'>
                  <Menu.Item name='profile' >
                    <Icon name='user circle'/> Profile
                    {/* {this.state.firstName} {this.state.lastName} */}
                  </Menu.Item>
            </Link>
            <Menu.Item onClick={this.logout}>
              <Icon name='sign out'/> Log Out
            </Menu.Item>
          </Menu.Menu>
      </Menu>
      {/* Header Menu */}
    
      {/* Add Incident Modal */}
      <Modal size={size} open={open} onClose={this.close}>
      <Modal.Header>New Emergency</Modal.Header>
          <Modal.Content>
              <Form>
                <Form.Field>
                  <label>Type of Incident</label>
                    <Radio
                      label='Vehicular Accident'
                      incidentType='Vehicular Accident'
                      checked={this.state.incidentType === 'Vehicular Accident'}
                      onChange={this.inputIncidentTypeHandler}
                    />
                    <br/>
                    <Radio
                      label='Physical Injury'
                      incidentType='Physical Injury'
                      checked={this.state.incidentType === 'Physical Injury'}
                      onChange={this.inputIncidentTypeHandler}
                    />
                  </Form.Field>
                  <Form.Field>
                  <label>Incident Location</label>
                  <PlacesAutocomplete
                      onError={this._handleError}
                      clearItemsOnError={true}
                      value={this.state.incidentLocation}
                      onChange={this.handleChange}
                      onSelect={this.handleSelect}
                      searchOptions={searchOptions}
                      // shouldFetchSuggestions={this.state.incidentLocation.length > 3}
                  >
                      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                      <div>
                          <input 
                          {...getInputProps({
                              placeholder: 'Search Places ...',
                              className: 'location-search-input',
                          })} 
                          />
                          
                          <div className="autocomplete-dropdown-container">
                          {loading && <div>Loading...</div>}
                          {suggestions.map(suggestion => {
                              const className = suggestion.active
                              ? 'suggestion-item--active'
                              : 'suggestion-item';
                              // inline style for demonstration purpose
                              const style = suggestion.active
                              ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                              : { backgroundColor: '#ffffff', cursor: 'pointer' };
                              return (
                              <div
                                  {...getSuggestionItemProps(suggestion, {
                                  className,
                                  style,
                                  })}
                              >
                                  <span>{suggestion.description}</span>
                              </div>
                              );
                          })}
                          </div>
                      </div>
                      )}
                  </PlacesAutocomplete>   
                  {errorMessage.length > 0 && (<div>{this.state.errorMessage}</div>
                    )}
                  {this.state.errorAddress?
                    <div>{this.state.errorAddress}</div>:null}
                  </Form.Field>
                  <Form.Field>
                      <label>Note</label>
                      <Form.Input
                        control='textarea'
                        type='text'
                        name='incidentNote'
                        rows='2'
                        noValidate
                        value={this.state.incidentNote}
                        onChange={this.handleNote}
                        className={formError.incidentNote.length > 0 ? "error" : null}
                      />
                      {formError.incidentNote.length > 0 && (
                              <span className="errorMessage">{formError.incidentNote}</span>)}
                  </Form.Field>
              </Form>
              </Modal.Content>
              <Modal.Actions>
              {this.state.incidentLocation.length > 0 && (
                  <Form.Button floated='left' color='red' onClick={this.handleCloseClick}> Clear </Form.Button>)}
                  <Form.Button color='red' onClick={this.submitIncidentHandler} 
                            disabled={!this.state.incidentLocation || !this.state.incidentType 
                                      || this.state.errorMessage || this.state.errorAddress
                                      || !this.state.destinationPlaceId
                                      }>
                      Submit
                  </Form.Button>
                 
        </Modal.Actions>
      </Modal>
      {/* Add Incident Modal */}

    </div>
    )  
  }
}

function mapStateToProps(state){
  return {
      incidentsList: state.incidents,
      user: state.user,
      uid: state.uid
  }
}

export default connect(mapStateToProps, {saveIncident})(HeaderDashboard);