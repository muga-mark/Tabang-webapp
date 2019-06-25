import React, {Component} from 'react'
import '../stylesheet_QueueIncidents.css';
import '../loginForm.css';
import { Form, Segment, Table, Icon, Modal, Button, Header } from 'semantic-ui-react';
import fire from '../config/Fire';
import _ from 'lodash';
import {connect} from 'react-redux';
import swal from 'sweetalert';
import {createUserAccount} from '../functions/createUserAccount';
import {Link} from "react-router";

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

class ProfileCCP extends Component{

    constructor(props){
    
        super(props);
        
            this.state = {
                isEmailVerified:'',
                hidden: true,
                uid: this.props.uid.uid,
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

    updateUserFirstName = () =>{

        swal({
            title: "Are you sure you want to change your first name?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            buttons: ["No","Yes"]
            })
            .then((willUpdate) => {
            if (willUpdate) {

                fire.database().ref(`users/${this.state.uid}`).update({
                    firstName: this.state.firstName
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
                swal("Edit First Name has been cancelled!");
            }
            });

    }
    
    updateUserLastName = () => {
        swal({
            title: "Are you sure you want to change your last name?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            buttons: ["No","Yes"]
            })
            .then((willUpdate) => {
            if (willUpdate) {

                fire.database().ref(`users/${this.state.uid}`).update({
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
            title: "Are you sure you want to change your email?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            buttons: ["No","Yes"]
            })
            .then((willUpdate) => {
            if (willUpdate) {

                fire.database().ref(`users/${this.state.uid}`).update({
                    email: this.state.email
                }, function(error) {
                    if (error) {
                        console.log('error updating in database')
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

                    var userEmail = fire.auth().currentUser;
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
                
            } else {
                swal("Edit Email has been cancelled!");
            }
            });

    }

    updateUserContactNumber = () => {
        swal({
            title: "Are you sure you want to change your contact number?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            buttons: ["No","Yes"]
            })
            .then((willUpdate) => {
            if (willUpdate) {

                fire.database().ref(`users/${this.state.uid}`).update({
                    contactNumber: this.state.contactNumber
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
                swal("Edit Contact Number has been cancelled!");
            }
            });
    }

    updateUserPassword = () => {
        swal({
            title: "Are you sure you want to change your password?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            buttons: ["No","Yes"]
            })
            .then((willUpdate) => {
            if (willUpdate) {

                fire.database().ref(`users/${this.state.uid}`).update({
                    password: this.state.password
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

                var userPassword = fire.auth().currentUser;
                console.log('auth', userPassword);
    
                var newPassword = this.state.password;
    
                userPassword.updatePassword(newPassword).then(function() {
                // Update successful.
                console.log('password updated successfully!')
                        
                }).catch(function(error) {
                // An error happened.
                console.log('password: error updating')
                });

                swal("Update failed", {
                    icon: "error",
                    });
            } else {
                swal("Edit Password has been cancelled!");
            }
            });
    }

    emailVerification = () =>{
        swal({
            title: "Please select continue to verify your email address",
            buttons: true,
            dangerMode: true,
            buttons: ["Cancel","Continue"]
            })
            .then((willUpdate) => {
            if (willUpdate) {

                var user = fire.auth().currentUser;

                user.sendEmailVerification().then(function() {
                // Email sent.
                swal("Email sent!",{icon:'success'});
            }).catch(function(error) {
                // An error happened.
                swal(error,"Error!",{icon:'success'});
        });
            } else {
                swal("Email Verification has been cancelled!");
            }
            });

    }



    componentDidMount(){
        this.getUserProfile();
        var user = fire.auth().currentUser;
        console.log('userProfile',user);
        var emailVerified;
        if (user != null){
            emailVerified = user.emailVerified;
            console.log('isEmailVerified: ',emailVerified);
            this.setState({emailVerified: emailVerified});
            console.log('isEmailVerified2: ', emailVerified);
        }
    }

    getUserProfile = () =>{

        var user = fire.database().ref(`users/${this.state.uid}`);
        var firstName, lastName, email, contactNumber, password, snap;
        user.once('value', snapshot => {
            console.log('snapshot', snapshot);
            snap = snapshot.val();
            firstName = snap.firstName;
            lastName = snap.lastName;
            email = snap.email;
            contactNumber = snap.contactNumber;
            password = snap.password;
            this.setState({firstName, lastName, email, contactNumber, password}, () => {
                // console.log(
                //     `${this.state.firstName} 
                //     ${this.state.lastName} 
                //     ${this.state.email}
                //     ${this.state.contactNumber}
                //     ${this.state.password}
                //     userAccount`);
            });
        });
        

    }
    
    render(){
        const { formError } = this.state;
        let verified;
        let unverified;

        if(this.state.emailVerified === true){
            verified = <Icon name='check circle'></Icon>
            console.log('potangINA',verified);
        }else if(this.state.emailVerified === false){
            unverified = <Icon onClick={this.emailVerification} name='times circle'></Icon>
        }
            

        return(
            <div>
                <div className="Profilepage">
                    <div className='login-form'>
                        
                        <Header as='h1' textAlign='center'>
                            <div style={{marginTop:'10px', fontSize:'16px', textAlign:'left', marginLeft:'5px', marginTop:'-15px'}}>
                                <Link to='ccpersonnel'>
                                    Back to home
                                </Link>
                            </div>
                            <div style={{marginTop:'20px'}}>
                                <b>PROFILE</b>
                            </div>
                        </Header>

                            <div style={{color:'whitesmoke', fontSize:'16px', marginBottom:'50px'}}>
                                <p><b style={{fontSize:'20px'}}>Name: </b> {this.state.firstName} {this.state.lastName}  </p>
                                <p><b style={{fontSize:'20px'}}>Email: </b> {this.state.email} <div class="tooltip">{verified}<span class="tooltiptext">Your email is verified!</span></div><div class="tooltip">{unverified}<span class="tooltiptext">Click to verify email!</span></div></p>                        
                                <p><b style={{fontSize:'20px'}}>Contact Number: </b> {this.state.contactNumber} </p>
                                
                            </div>
                        
                    
                            <Modal trigger={<Button color='blue' floated='right'>Update Profile</Button>} closeIcon size='small'  basic>
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
                                                        defaultValue={this.state.firstName}
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
                                                        defaultValue={this.state.lastName}
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
                                                        defaultValue={this.state.email}
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
                                                        defaultValue={this.state.contactNumber}
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

                                    <Table.Row>
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
                                                onClick={this.updateUserPassword} disabled={this.state.formError.password}>
                                                Edit<Icon name='edit' />
                                        </Button>
                                    </Table.Cell>
                                </Table.Row>
                                    
                                    </Table.Body>
                                </Table>

                                </Modal.Content>
                            </Modal>
                        </div>
                </div>
            </div>
        )
    }



}

function mapStateToProps(state){
    console.log('poooota', state.user.userAccount )
    console.log('poooota', state.uid )

    return {
        user: state.user.userAccount,
        uid: state.uid
    }
  }


export default connect(mapStateToProps)(ProfileCCP);
// export default Profile;