import React, {Component} from 'react';
import { Button, Table, Header, Image, Modal, Form, Select, Icon, ModalActions} from 'semantic-ui-react'
import '../stylesheet_QueueIncidents.css';
import '../HeaderDashboard.css';
import fire, {fire2} from '../config/Fire';
import swal from 'sweetalert';
import {createUserAccount} from '../functions/createUserAccount';

const emailRegex = RegExp(
    /^([a-zA-Z0-9_.\-]+)@([a-zA-Z]+)\.([a-zA-Z]{2,5})$/
  );
  
  const contactNumberRegex = RegExp(
    /^(09|\+639)\d{9}$/
  );
  
  const firstNameRegex = RegExp(
    /^[a-zA-ZñÑ.,'-\s]+$/
  );
  
  const lastNameRegex = RegExp(
    /^[a-zA-ZñÑ.,'-\s]+$/
  );
  
  const passwordRegex = RegExp(
    /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/
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

class DeleteUserAccount extends Component{
    constructor(props){
    
        super(props);
        
        this.state = {
            editFirstName: false,
            firstName: '',
            lastName: '',
            password: '',
            email: '',
            user_type: '',
            contactNumber: '',
            sex: '',
            errorMessage: '',
            durationService: '',
            medicalDegree:'',
            medicalProfession:'',
            certification:'',
            isActiveVolunteer:'',
            formError: {
                firstName:'',
                lastName:'',
                email:'',
                password:'',
                contactNumber:'',
                sex: '',
                user_type:''
            },
            userID: ''  
            }
            this.submitCreateAccount = this.submitCreateAccount.bind(this);
            this.toggleShow = this.toggleShow.bind(this);            
    }

    toggleShow() {
        this.setState({ hidden: !this.state.hidden });
    }

    handleCreateAccount = (e) => {
        e.preventDefault();
        //this.setState({[e.target.name]: e.target.value});
        const { name, value } = e.target;
        
        let formError = { ...this.state.formError };
    
          switch (name) {
    
          case "firstName":
            formError.firstName = firstNameRegex.test(value) ? "" : "Please enter a valid name.";
            break;
    
          case "lastName":
            formError.lastName = lastNameRegex.test(value) ? "" : "Please enter a valid name.";
            break;
    
          case "email":
            formError.email = emailRegex.test(value)? "" : "Please enter a valid email address.";
            break;
    
          case "password":
            formError.password = passwordRegex.test(value) ? "" : "Password must be 8 characters or longer, should contain at least 1 lowercase and 1 uppercase letter, and at least one special character"
            break;
    
          // case "confirmPassword":
          //   formError.confirmPassword = value.length < 8 ? "Password should at least 8 characters" : "";
          //   break;
    
          case "contactNumber":
            formError.contactNumber = contactNumberRegex.test(value)? "": "Please enter a valid number (09XXXXXXXX or +639XXXXXXXX)";
            break;
    
          default:
            break;
        }
    
        
           this.setState({ formError, [name]: value }, () => console.log(this.state));
    
      };

    //   editFirstName = (e) =>{

    //   }

      inputUserTypeHandler = (e, { value }) => {
        //this.setState({user_type: e.target.value})
        this.setState({ user_type: value })
        //console.log('USRER TPsdfgs', value);
      };
    
      inputUserTypeHandler_volunteer = (e, { value }) => {
        this.setState({ isActiveVolunteer: value })
      };
    
      inputUserTypeHandler_medicalDegree = (e, { value}) => {
        this.setState({medicalDegree: value })
      };
    
      inputUserTypeHandler_medicalProfession = (e, { value}) => {
        this.setState({medicalProfession: value })
      };
    
      inputUserTypeHandler_durationService = (e, { value}) => {
        this.setState({durationService: value })
      };
      
      inputUserTypeHandler_certification = (e, { value}) => {
        this.setState({certification: value })
      };
    
      inputSex = (e, { value}) => {
        this.setState({sex: value })
      };
    
      submitCreateAccount = (e) => {
    
        e.preventDefault();
        var isMobile = false;
        var err = '';
        if(this.state.user_type === 'Regular User' || this.state.user_type === 'Responder' || this.state.user_type === 'Volunteer'){
          isMobile = true;
        }
    
        const account = {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          password: this.state.password,
          email: this.state.email,
          user_type: this.state.user_type,
          contactNumber: this.state.contactNumber,
          sex: this.state.sex,
          isMobile,
          isVerified: false
        }
    
        const credentials = {
          medicalProfession: this.state.medicalProfession,
          medicalDegree: this.state.medicalDegree,
          certification: this.state.certification,
          isActiveVolunteer: this.state.isActiveVolunteer,
          forVA: false,
          forPI: false,
          durationService: this.state.durationService
        }
    
        if (formValid(this.state)) {
          console.log(`
            --SUBMITTING--
            First Name: ${this.state.firstName}
            Last Name: ${this.state.lastName}
            Email: ${this.state.email}
            Password: ${this.state.password}
            Contact Number: ${this.state.contactNumber}
            Sex: ${this.state.sex}
            User Type: ${this.state.user_type}
          `);
        }
        if(account.user_type === 'Volunteer'){
          err = createUserAccount(account, credentials);
          this.setState({err: err});
        }else{
          err = createUserAccount(account);
          this.setState({err: err});
        }
        this.setState({
          firstName: '',
          lastName: '',
          userName: '',
          password: '',
          email: '',
          user_type: '',
          contactNumber: '',
          sex: '',
          medicalProfession: '',
          medicalDegree: '',
          certification: '',
          isActiveVolunteer: ''
        })
    
        
      }

    

    deleteUser = () => {

        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this account!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            buttons: ["No","Yes"]
            })
            .then((willDelete) => {
            if (willDelete) {

                if(this.props.user_type === 'Administrator' || this.props.user_type === 'Command Center Personnel'){
                    var webUserNode = fire.database().ref(`webUsers/${this.props.user_type}/${this.props.uid}`);
                    var userNode = fire.database().ref(`users/${this.props.uid}`);
                    console.log('in web delete');
                    let deleteWebUser = fire2.auth().signInWithEmailAndPassword(this.props.email, this.props.password);
                    deleteWebUser.then(() => {
                        var user = fire2.auth().currentUser;
                        user.delete().then(()=>{
                            console.log(`ID: ${this.props.uid} has been removed from authentication`);
                            webUserNode.remove().then(()=>{
                                console.log(`${this.props.uid} removed from webUsers node`);
                                userNode.remove().then(()=>{
                                    console.log(`${this.props.uid} removed from users node`);
                                    this.props.delete(this.props.uid);
                                });
                            });
                        }).catch(()=>{
                            console.log(`Error in removing ID: ${this.props.uid} from authentication`);
                        });
                    }).catch((error)=>{
                        console.log(`Error in login for ${this.props.uid}`, error);
                    });

                }else if(this.props.user_type === 'Regular User' || this.props.user_type === 'Responder' || this.props.user_type === 'Volunteer'){
                    var mobileUserNode = fire.database().ref(`mobileUsers/${this.props.user_type}/${this.props.uid}`);
                    var userNode2 = fire.database().ref(`users/${this.props.uid}`);
                    let deleteMobileUser = fire2.auth().signInWithEmailAndPassword(this.props.email, this.props.password);
                    deleteMobileUser.then(()=>{
                        mobileUserNode.remove().then(()=>{
                            console.log(`${this.props.uid} removed from mobileUsers node`);
                            userNode2.remove().then(()=>{
                                console.log(`${this.props.uid} removed from users node`);
                                if(this.props.user_type === 'Volunteer'){
                                    fire.database().ref(`credentials/${this.props.uid}`).remove().then(()=>{
                                        console.log(`${this.props.uid} credentials have been deleted`);
                                        this.props.delete(this.props.uid);
                                    });
                                }
                                if(!this.props.isVerified){
                                    var deleteUnverifiedNode = fire.database().ref(`unverifiedMobileUsers/${this.props.uid}`);
                                    deleteUnverifiedNode.remove().then(()=>{
                                        this.props.delete(this.props.uid);
                                    })
                                }else{
                                    this.props.delete(this.props.uid);
                                }
                            });
                        });
                    }).catch((error)=>{
                        console.log(`Error in login for ${this.props.uid}`, error);
                    });
                }
                swal("The account has been deleted!", {
                icon: "success",
                });
            } else {
                swal(this.props.email,"This account is safe!");
            }
            });

        
    }

    updateUserFirstName = () =>{
       // console.log(`${this.props.uid} 'firstName' ${this.state.firstName}`);
        swal({
            title: "Are you sure you want to edit this account's first name?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            buttons: ["No","Yes"]
            })
            .then((willUpdate) => {
            if (willUpdate) {

                fire.database().ref(`users/${this.props.uid}`).update({
                    firstName: this.state.firstName
                }, function(error) {
                    if (error) {
                        console.log('error updating')
                        swal("Update failed", {
                        icon: "error",
                        });
                    } else {
                        //console.log(`${this.props.uid} 'firstName' ${this.state.firstName}`);
                        //this.props.update(this.props.uid, 'firstName', this.state.firstName);
                        console.log('updated successfully!');
                        //this.props.update();
                        swal("Account successfully updated!", {
                        icon: "success",
                        });
                    }
                });
                
            } else {
                swal("Edit First Name has been cancelled!");
            }
            });

    }
    
    updateUserLastName = () => {
        swal({
            title: "Are you sure you want to edit this account's last name?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            buttons: ["No","Yes"]
            })
            .then((willUpdate) => {
            if (willUpdate) {

                fire.database().ref(`users/${this.props.uid}`).update({
                    lastName: this.state.lastName
                }, function(error) {
                    if (error) {
                        console.log('error updating')
                        swal("Update failed", {
                            icon: "error",
                            });
                        } else {
                        console.log('updated successfully!')
                        swal("Account successfully updated!", {
                            icon: "success",
                            });
                        }
                    });
                
            } else {
                swal("Edit Last Name has been cancelled!");
            }
            });

    }

    updateUserEmail = () => {
        swal({
            title: "Are you sure you want to edit this account's email?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            buttons: ["No","Yes"]
            })
            .then((willUpdate) => {
            if (willUpdate) {

                fire.database().ref(`users/${this.props.uid}`).update({
                    email: this.state.email
                }, function(error) {
                    if (error) {
                        console.log('error updating')
                        swal("Update failed", {
                            icon: "error",
                            });
                        } else {
                        console.log('updated successfully!')
                        swal("Account successfully updated!", {
                            icon: "success",
                            });
                        }
                    });

                    let updateUserEmail = fire2.auth().signInWithEmailAndPassword(this.props.email, this.props.password);
                    updateUserEmail.then(() => {
                        
                        var userEmail = fire2.auth().currentUser;
                        console.log('auth', userEmail);

                        var newEmail = this.state.email;

                        userEmail.updateEmail(newEmail).then(function() {
                        // Update successful.
                        console.log('email updated successfully!')
                                
                        }).catch(function(error) {
                        // An error happened.
                        console.log('email: error updating in authentication')
                        swal("Update failed", {
                            icon: "error",
                            });
                        });

                    }).catch((error) =>{
                        console.log(`Error in login for ${this.props.uid}`, error);
                    });
                    
                
            } else {
                swal("Edit Email has been cancelled!");
            }
            });

    }

    // updatePassword = () => {
    //     swal({
    //         title: "Are you sure you want to edit this account's password?",
    //         icon: "warning",
    //         buttons: true,
    //         dangerMode: true,
    //         buttons: ["No","Yes"]
    //         })
    //         .then((willUpdate) => {
    //         if (willUpdate) {

    //             fire.database().ref(`users/${this.props.uid}`).update({
    //                 password: this.state.password
    //             }, function(error) {
    //                 if (error) {
    //                     console.log('error updating password in database')
    //                     swal("Update failed", {
    //                         icon: "error",
    //                         });
    //                     } else {
    //                     console.log('password updated successfully in database')
    //                     swal("Account successfully updated!", {
    //                         icon: "success",
    //                         });
    //                     }
    //                 });

    //                 let updateUserPassword = fire2.auth().signInWithEmailAndPassword(this.props.email, this.props.password);
    //                 updateUserPassword.then(() => {
                        
    //                     var userPassword = fire2.auth().currentUser;
    //                     console.log('auth', userPassword);

    //                     var newPassword = this.state.password;

    //                     updateUserPassword.updatePassword(newPassword).then(function() {
    //                     // Update successful.
    //                     console.log('password updated successfully!')
                                
    //                     }).catch(function(error) {
    //                     // An error happened.
    //                     console.log('password: error updating in authentication', error)
    //                     swal("Update failed", {
    //                         icon: "error",
    //                         });
    //                     });

    //                 }).catch((error) =>{
    //                     console.log(`Error in login for ${this.props.uid}`, error);
    //                 });
                    
                
    //         } else {
    //             swal("Edit Email has been cancelled!");
    //         }
    //         });

    // }

    updateUserContactNumber = () => {
        swal({
            title: "Are you sure you want to edit this account's contact number?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            buttons: ["No","Yes"]
            })
            .then((willUpdate) => {
            if (willUpdate) {

                fire.database().ref(`users/${this.props.uid}`).update({
                    contactNumber: this.state.contactNumber
                }, function(error) {
                    if (error) {
                        console.log('error updating')
                        swal("Update failed", {
                            icon: "error",
                            });
                        } else {
                        console.log('updated successfully!');
                        // this.props.
                        swal("Account successfully updated!", {
                            icon: "success",
                            });
                        }
                    });
                
            } else {
                swal("Edit Contact Number has been cancelled!");
            }
            });
    }

    
    render(){
        const { formError } = this.state;
        const userTypeOptions = [
            { text: 'Administrator', value: 'Administrator'},
            { text: 'Command Center Personnel', value: 'Command Center Personnel'},
            { text: 'Responder', value: 'Responder'},
            { text: 'Volunteer', value: 'Volunteer'},
            { text: 'Regular User', value: 'Regular User'}
          ]
        
        const activeVolunteerOptions = [
            { text: 'Yes', value: 'Yes'},
            { text: 'No', value: 'No'},
        ]
    
        const surgeon_medicalDegreeOptions = [
            { text: 'Bachelor of Medicine and Bachelor of Surgery (MBBS)', value: 'Bachelor of Medicine and Bachelor of Surgery'},
            { text: 'Master of Medicine (MM, MMed)', value: 'Master of Medicine'},
            { text: 'Master of Surgery (MS, MSurg, ChM)', value: 'Master of Surgery'},
            { text: 'Master of Medical Science (MMSc, MMedSc)', value: 'Master of Medical Science'},
            { text: 'Doctor of Medical Science (DMSc, DMedSc)', value: 'Doctor of Medical Science'},
            { text: 'Doctor of Surgery (DS, DSurg)', value: 'Doctor of Surgery'},
            { text: 'Doctor of Medicine (MD)', value: 'Doctor of Medicine'},
        ]
    
        const surgeon_certificationOptions = [
            { text: 'General Surgeon Board Certification', value: 'General Surgeon Board Certification'},
        ]
    
        const nurse_medicalDegreeOptions = [
            { text: 'Bachelor of Science in Nursing (BSN)', value: 'Bachelor of Science in Nursing'},
            { text: 'Associate Degree in Nursing (ADN)', value: 'Associate Degree in Nursing'},
        ]
    
        const nurse_certificationOptions = [
            { text: 'Maternal and Child Health Nursing', value: 'Maternal and Child Health Nursing'},
            { text: 'Emergency and Trauma Nursing', value: 'Emergency and Trauma Nursing'},
            { text: 'Cardiovascular Nursing', value: 'Cardiovascular Nursing'},
        ]
    
        const ems_medicalDegreeOptions = [
            {text: 'Emergency Medical Services NC II', value: 'Emergency Medical Services NC II'},
        ]
    
        const ems_certificationOptions = [
            {text: 'Medical First Responder', value: 'Medical First Responder'},
            {text: 'Ambulance Care Assistants', value: 'Ambulance Care Assistants'},
            {text: 'Emergency Medical Technicians', value:'Emergency Medical Technicians'},
            {text: 'Paramedics', value: 'Paramedics'},
        ]
    
        const medicalProfessionOptions = [
            { text: 'Nurse', value: 'Nurse'},
            { text: 'Surgeon', value: 'Surgeon'},
            { text: 'Emergency Medical Service Personnel', value: 'Emergency Medical Service Personnel'},
        ]
    
        const durationServiceOptions = [
            {text: '1 year', value: 1},
            {text: '2 years', value: 2},
            {text: '3 years', value: 3},
            {text: '4 years', value: 4},
            {text: '5 years', value: 5},
            {text: '6 years', value: 6},
            {text: '7 years', value: 7},
            {text: '8 years', value: 8},
            {text: '9 years', value: 9},
            {text: '10 years', value: 10},
        ]
    
        const sex = [
            { text: 'Male', value: 'Male'},
            { text: 'Female', value: 'Female'},
        ]
        return(
            
            <Table.Row>
                
                <Table.Cell width='5'>
                    <Header as='h4' image>
                        {this.props.sex === 'Male'?
                        <Image src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' rounded size='mini' circular/>
                        :<Image src='https://react.semantic-ui.com/images/avatar/small/lena.png' rounded size='mini' circular/>}
                        <Header.Content>
                            {/* {this.props.firstName} {this.props.lastName} */}
                            <Modal trigger={<a positive>{this.props.firstName} {this.props.lastName}</a>} closeIcon size='tiny'>
                                <Modal.Header>Account Details</Modal.Header>
                                <Modal.Content style={{backgroundColor:'#c5e2ff'}}>
                                    <div style={{fontSize:'1.03em', fontFamily:'sans-serif', color:'#0b233b'}}>
                                        <pre style={{fontSize:'1.03em', fontFamily:'sans-serif', marginBottom:'0px', marginTop:'5px'}}>
                                            <Icon name='user'/><b>Name                   : </b>{this.props.firstName} {this.props.lastName}
                                        </pre>
                                        <pre style={{fontSize:'1.03em', fontFamily:'sans-serif', marginBottom:'0px', marginTop:'5px'}}>
                                            <Icon name='mobile'/><b>Contact Number : </b>{this.props.contactNumber}
                                        </pre>
                                        <pre style={{fontSize:'1.03em', fontFamily:'sans-serif', marginBottom:'0px', marginTop:'5px'}}>
                                            <Icon name='mail'/><b>Email Address    : </b>{this.props.email}
                                        </pre>
                                        <pre style={{fontSize:'1.03em', fontFamily:'sans-serif', marginBottom:'0px', marginTop:'5px'}}>
                                            <Icon name='map marker alternate'/><b>Address               : </b>{this.props.address}
                                        </pre>
                                        <pre style={{fontSize:'1.03em', fontFamily:'sans-serif', marginBottom:'0px', marginTop:'5px'}}>
                                            {this.props.sex === 'Male' ? 
                                            <Icon name='male'/>:<Icon name='female'/>}
                                            <b>Sex                       : </b>{this.props.sex}
                                        </pre>
                                        <pre style={{fontSize:'1.03em', fontFamily:'sans-serif', marginBottom:'0px', marginTop:'5px'}}>
                                            <Icon name='address card outline'/><b>UID                       : </b>{this.props.uid}
                                        </pre>
                                    </div>
                                </Modal.Content>
                                <Modal.Actions style={{padding:'25px'}} />
                            </Modal>
                        </Header.Content>
                    </Header>
                </Table.Cell>
                <Table.Cell width='4'>
                        <Header.Content>
                        {this.props.email}
                    </Header.Content>
                </Table.Cell>
                <Table.Cell width='3'>
                    <Header.Content>
                        {this.props.contactNumber}
                    </Header.Content>
                </Table.Cell> 
                <Table.Cell width='3'>
                    <Button.Group>
                        <Modal trigger={<Button positive>Update</Button>} closeIcon size='small'  basic>
                            <Modal.Header>Edit Account</Modal.Header>
                            <Modal.Content>
                                
                            <Table celled collapsing selectable>
                                <Table.Body>
                                
                                <Table.Row>
                                    <Table.Cell width='3'><b>First Name:</b></Table.Cell>
                                    <Table.Cell>    
                                        <Form>
                                            <Form.Field>
                                                <Form.Input
                                                    fluid
                                                    noValidate
                                                    type='text'
                                                    name='firstName'
                                                    className={formError.firstName.length > 0 ? "error" : null}
                                                    style={{color:'white'}}
                                                    placeholder='First Name'
                                                    onChange={this.handleCreateAccount}
                                                    defaultValue={this.props.firstName}
                                                    ref={input => this.firstName = input}
                                                />
                                            </Form.Field>
                                            {formError.firstName.length > 0 && (
                                            <span className="errorMessage">{formError.firstName}</span>)}
                                        </Form>
                                    </Table.Cell>
                                    <Table.Cell width='2'>
                                        <Button color='green' icon labelPosition='right' 
                                                onClick={this.updateUserFirstName} disabled={this.state.formError.firstName}>
                                                Edit<Icon name='edit' />
                                        </Button>
                                    </Table.Cell>
                                </Table.Row>
                                
                                <Table.Row>
                                    <Table.Cell width='3'><b>Last Name:</b></Table.Cell>
                                    <Table.Cell>
                                        <Form>
                                            <Form.Field>
                                                <Form.Input
                                                    fluid
                                                    noValidate
                                                    type='text'
                                                    name='lastName'
                                                    className={formError.lastName.length > 0 ? "error" : null}
                                                    style={{color:'white'}}
                                                    placeholder='Last Name'
                                                    onChange={this.handleCreateAccount}
                                                    defaultValue={this.props.lastName}
                                                    ref={input => this.lastName = input}
                                                />
                                            </Form.Field>
                                            {formError.lastName.length > 0 && (
                                            <span className="errorMessage">{formError.lastName}</span>)}
                                        </Form>
                                    </Table.Cell>
                                    <Table.Cell width='2'>
                                        <Button color='green' icon labelPosition='right' 
                                                onClick={this.updateUserLastName} disabled={this.state.formError.lastName}>
                                                Edit<Icon name='edit' />
                                        </Button>
                                    </Table.Cell>
                                </Table.Row>
                                
                                <Table.Row>
                                    <Table.Cell width='4'><b>Email:</b></Table.Cell>
                                    <Table.Cell>
                                        <Form>
                                            <Form.Field>
                                                <Form.Input
                                                    fluid
                                                    noValidate
                                                    type='email'
                                                    name='email'
                                                    className={formError.email.length > 0 ? "error" : null}
                                                    style={{color:'white'}}
                                                    placeholder='Last Name'
                                                    onChange={this.handleCreateAccount}
                                                    defaultValue={this.props.email}
                                                    ref={input => this.email = input}
                                                />
                                            </Form.Field>
                                            {formError.email.length > 0 && (
                                            <span className="errorMessage">{formError.email}</span>)}
                                        </Form>
                                    </Table.Cell>
                                    <Table.Cell width='2'>
                                        <Button color='green' icon labelPosition='right' 
                                                onClick={this.updateUserEmail} disabled={this.state.formError.email}>
                                                Edit<Icon name='edit' />
                                        </Button>
                                    </Table.Cell>
                                </Table.Row>
                                
                                <Table.Row>
                                    <Table.Cell width='4'><b>Contact:</b></Table.Cell>
                                    <Table.Cell>
                                        <Form>
                                            <Form.Field>
                                                <Form.Input
                                                    fluid
                                                    noValidate
                                                    type='text'
                                                    name='contactNumber'
                                                    className={formError.contactNumber.length > 0 ? "error" : null}
                                                    style={{color:'white'}}
                                                    placeholder='Contact Number'
                                                    onChange={this.handleCreateAccount}
                                                    defaultValue={this.props.contactNumber}
                                                    ref={input => this.contactNumber = input}
                                                />
                                            </Form.Field>
                                            {formError.contactNumber.length > 0 && (
                                            <span className="errorMessage">{formError.contactNumber}</span>)}
                                        </Form>
                                    </Table.Cell>
                                    <Table.Cell width='2'>
                                        <Button color='green' icon labelPosition='right' 
                                                onClick={this.updateUserContactNumber} disabled={this.state.formError.contactNumber}>
                                                Edit<Icon name='edit' />
                                        </Button>
                                    </Table.Cell>
                                </Table.Row>

                                {/* <Table.Row>
                                    <Table.Cell width='4'><b>Password:</b></Table.Cell>
                                    <Table.Cell>
                                        <Form>
                                            <Form.Field>
                                                <Form.Input
                                                    fluid
                                                    placeholder='Password'
                                                    type={this.state.hidden ? "password" : "text"}
                                                    name='password'
                                                    noValidate
                                                    className={formError.password.length > 0 ? "error" : null}
                                                    onChange={this.handleCreateAccount}
                                                    required
                                                    // defaultValue={this.state.password}
                                                    // ref={input => this.password = input}
                                                    value={this.state.password}
                                                    onClick={this.toggleShow}
                                                />
                                            </Form.Field>
                                            {formError.password.length > 0 && (
                                            <span className="errorMessage">{formError.password}</span>)}
                                        </Form>
                                    </Table.Cell>
                                    <Table.Cell width='2'>
                                        <Button color='green' icon labelPosition='right' 
                                                onClick={this.updatePassword} disabled={this.state.formError.password}>
                                                Edit<Icon name='edit' />
                                        </Button>
                                    </Table.Cell>
                                </Table.Row> */}
                                
                                </Table.Body>
                            </Table>

                            </Modal.Content>
                            </Modal>
                        <Button.Or />
                        <Button onClick={this.deleteUser}>Delete</Button>
                    </Button.Group>
                </Table.Cell>
            </Table.Row>
        )
    }

}

export default DeleteUserAccount