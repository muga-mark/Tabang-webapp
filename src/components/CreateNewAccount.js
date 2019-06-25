import React, {Component} from 'react'
import { Button, Form, Select, Segment } from 'semantic-ui-react'
import VerticalMenu from './VerticalMenu';
import '../stylesheet_QueueIncidents.css';
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

const addressRegex = RegExp(
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

class CreateNewAccount extends Component{

    constructor(props){
    
        super(props);
        
        this.state = {
          hidden: true,
          address:'',
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
            user_type:'',
            address:''

        },
        userID: ''  
        }
        this.submitCreateAccount = this.submitCreateAccount.bind(this);
        this.toggleShow = this.toggleShow.bind(this)
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
          
          case "address":
            formError.address = addressRegex.test(value) ? "" : "Please enter a valid address.";
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
          address: this.state.address,
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
            Address: ${this.state.address}
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
            <div>
                <div className="VerticalMenu">
                    <VerticalMenu/>
                </div>
                <div className="CreateNewAccount">
                <Segment.Group>
                <Segment style={{color:'whitesmoke', fontSize:'20px'}}><b>New User Account</b></Segment>
                <Segment>
                <Form>
                    <Form.Group widths='equal'>
                    <Form.Field style={{marginBottom: '10px', color: 'whitesmoke'}} required>
                        <Form.Input
                        fluid
                        placeholder='Email Address'
                        type='email'
                        name='email'
                        noValidate
                        value={this.state.email}
                        className={formError.email.length > 0 ? "error" : null}
                        onChange={this.handleCreateAccount}
                        required
                        />
                        {formError.email.length > 0 && (
                        <span className="errorMessage">{formError.email}</span>)}
                    </Form.Field>   

                    {this.state.user_type === 'Volunteer' ? 
                        <Form.Field
                        control={Select}
                        options={medicalProfessionOptions}                
                        placeholder='Medical Profession'
                        search
                        onChange={this.inputUserTypeHandler_medicalProfession}
                        required                  
                        />: null}  


                    </Form.Group> 

                    <Form.Group widths='equal'>
                    <Form.Field
                        search
                        control={Select}
                        options={userTypeOptions}                
                        placeholder='Select User Type'
                        onChange={this.inputUserTypeHandler}    
                        required              
                        /> 

                    {this.state.user_type === 'Volunteer' && this.state.medicalProfession === 'Nurse' ?
                        <Form.Field
                        control={Select}
                        options={nurse_medicalDegreeOptions}                
                        placeholder='Medical Degree'
                        onChange={this.inputUserTypeHandler_medicalDegree}   
                        required               
                        />: null } 

                    {this.state.user_type === 'Volunteer' && this.state.medicalProfession === 'Surgeon' ?
                        <Form.Field
                        control={Select}
                        options={surgeon_medicalDegreeOptions}                
                        placeholder='Medical Degree'
                        onChange={this.inputUserTypeHandler_medicalDegree}    
                        required              
                        />: null } 

                        {this.state.user_type === 'Volunteer' && this.state.medicalProfession === 'Emergency Medical Service Personnel' ?
                        <Form.Field
                        control={Select}
                        options={ems_medicalDegreeOptions}                
                        placeholder='Medical Degree'
                        onChange={this.inputUserTypeHandler_medicalDegree}      
                        required            
                        />
                        
                    : null }               
                    </Form.Group>

                    <Form.Group widths='equal'>
                    <Form.Field style={{marginBottom: '10px', color: 'whitesmoke'}} required>
                        <Form.Input
                        fluid
                        placeholder='First Name (at least 2 characters)'
                        type='text'
                        name='firstName'
                        noValidate
                        value={this.state.firstName}
                        className={formError.firstName.length > 0 ? "error" : null}
                        onChange={this.handleCreateAccount}
                        required
                        />
                        {formError.firstName.length > 0 && (
                        <span className="errorMessage">{formError.firstName}</span>)}
                    </Form.Field>     

                    {this.state.user_type === 'Volunteer' && this.state.medicalProfession === 'Nurse'? 
                        <Form.Field
                        control={Select}
                        options={nurse_certificationOptions}                
                        placeholder='Certification'           
                        onChange={this.inputUserTypeHandler_certification}    
                        required              
                    />:
                        
                        this.state.user_type === 'Volunteer' && this.state.medicalProfession === 'Surgeon'? 
                        <Form.Field
                        control={Select}
                        options={surgeon_certificationOptions}                
                        placeholder='Certification'           
                        onChange={this.inputUserTypeHandler_certification}
                        required
                        />:(

                        this.state.user_type === 'Volunteer' && this.state.medicalProfession === 'Emergency Medical Service Personnel' ?
                        <Form.Field
                        control={Select}
                        options={ems_certificationOptions}                
                        placeholder='Certification'
                        onChange={this.inputUserTypeHandler_certification}    
                        required              
                        />
                    : null)}   

                    </Form.Group>
                    
                    <Form.Group widths='equal'>
                    <Form.Field style={{marginBottom: '10px', color: 'whitesmoke'}} required>
                        <Form.Input
                        fluid
                        placeholder='Last Name (at least 2 characters)'
                        type='text'
                        name='lastName'
                        noValidate
                        value={this.state.lastName}
                        className={formError.lastName.length > 0 ? "error" : null}
                        onChange={this.handleCreateAccount}
                        required
                        />  
                        {formError.lastName.length > 0 && (
                        <span className="errorMessage">{formError.lastName}</span>)}                  
                    </Form.Field>

                    {this.state.user_type === 'Volunteer' ? 
                        <Form.Field
                        control={Select}                  
                        options={activeVolunteerOptions}                
                        placeholder='Active Volunteer?'
                        onChange={this.inputUserTypeHandler_volunteer}
                        required                  
                        />: null} 
                    </Form.Group>

                    <Form.Group widths='equal'>
                    <Form.Field style={{marginBottom: '10px', color: 'whitesmoke'}} required>
                        <Form.Input
                        fluid
                        placeholder='Password'
                        type={this.state.hidden ? "password" : "text"}
                        name='password'
                        noValidate
                        value={this.state.password}
                        className={formError.password.length > 0 ? "error" : null}
                        onChange={this.handleCreateAccount}
                        required
                        onClick={this.toggleShow}
                        />                     
                        {formError.password.length > 0 && (
                        <span className="errorMessage">{formError.password}</span>)}
                    </Form.Field>
                    
                    {this.state.user_type === 'Volunteer' ? 
                        <Form.Field
                        control={Select}
                        options={durationServiceOptions}                
                        placeholder='Duration Service (in years)'
                        search                    
                        onChange={this.inputUserTypeHandler_durationService}                  
                        required
                        /> : null}                  
                    </Form.Group >

                    <Form.Group widths='equal'>
                    <Form.Field style={{marginBottom: '10px', color: 'whitesmoke'}} required>
                        <Form.Input
                            fluid
                            placeholder='Contact Number: 09XXXXXXXXX'
                            type='text'
                            name='contactNumber'
                            pattern='[0-9]*'
                            inputmode='numeric'
                            noValidate
                            value={this.state.contactNumber}
                            className={formError.contactNumber.length > 0 ? "error" : null}
                            onChange={this.handleCreateAccount}
                            required
                        />
                            {formError.contactNumber.length > 0 && (
                            <span className="errorMessage">{formError.contactNumber}</span>)}
                    </Form.Field>

                    <Form.Field style={{marginBottom: '10px', color: 'whitesmoke'}} required>
                        <Form.Input
                            fluid
                            control={Select}
                            placeholder='Sex'
                            options={sex} 
                            type='text'
                            name='sex'
                            noValidate
                            value={this.state.sex}
                            onChange={this.inputSex}
                            required
                        />
                            
                    </Form.Field>

                    </Form.Group>

                    <Form.Field style={{marginBottom: '10px', color: 'whitesmoke'}} required>
                        <Form.Input
                        fluid
                        placeholder='Address'
                        type='text'
                        name='address'
                        noValidate
                        value={this.state.address}
                        className={formError.address.length > 0 ? "error" : null}
                        onChange={this.handleCreateAccount}
                        required
                        />
                        {formError.address.length > 0 && (
                        <span className="errorMessage">{formError.address}</span>)}
                    </Form.Field> 
                    
                    </Form>

                    <Button floated='right' color='red' onClick={this.submitCreateAccount} 
                        disabled={!this.state.email || !this.state.firstName || !this.state.lastName 
                                || !this.state.user_type || !this.state.password || !this.state.contactNumber || !this.state.sex
                                || this.state.formError.email || this.state.formError.firstName || this.state.formError.lastName
                                || this.state.formError.password || this.state.formError.contactNumber 
                                || this.state.user_type === 'Volunteer'?!this.state.medicalDegree || !this.state.sex
                                || !this.state.medicalProfession || !this.state.certification 
                                || !this.state.isActiveVolunteer || !this.state.durationService:null               
                                } 
                    >Create User Account
                    </Button>
                    
                    </Segment>
                    
                    </Segment.Group>
                </div>
            </div>
        )
    }
    
}

export default CreateNewAccount;