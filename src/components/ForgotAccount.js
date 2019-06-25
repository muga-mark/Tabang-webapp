import React, {Component} from 'react'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import fire from '../config/Fire';
import '../loginForm.css';
import {Link} from "react-router";
import swal from 'sweetalert';

class ForgotAccount extends Component{
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      
      email: '',
      
    }
}

handleChange(e){
  this.setState({[e.target.name]: e.target.value});
}


  forgotPassword = () =>{
    const { email } = this.state;
      

      if (email ===''){
        this.setState({emailError: true});
        console.log("Blank email field");
      } else {
        this.setState({emailError: false});
        
            var auth = fire.auth();
            var emailAddress = this.state.email;
            
            auth.sendPasswordResetEmail(emailAddress).then(function() {
              // Email sent.
              swal("A message has been sent to your email account with instruction to reset your password", {
                icon: "success",
                });
            }).catch(e=> {
              // An error happened.
              var err = e.message;
              console.log(err);
              this.setState({err: err});
              
            });
          
      }

  }

  render(){
    
    return(
      <div className='login-form'>
    
    <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>

      <Segment stacked style={{marginTop:'20px'}}>
        <Header as='h2' color='red' textAlign='center'>
          Reset Password
        </Header>
        
        <Form size='large' >
        <div style={{marginTop:'30px',marginBottom:'20px'}}>
            <Form.Input
              fluid icon='user' 
              iconPosition='left' 
              type='email'
              placeholder='E-mail address' 
              name='email' 
              value={this.state.email} 
              error={this.state.emailError}
              onChange={this.handleChange}
            />
          </div>
            <div className="space"></div>
            
            <Button inverted color= 'red' fluid size='large' onClick={this.forgotPassword}>
              Reset My Password
            </Button>
            {this.state.emailError?
              <p className='catchError'>Please do not leave the email field blank.</p>:null
            }
            <p className='catchError'>{this.state.err}</p>
            <div style={{marginTop:'50px', marginLeft:'235px'}}>
              <Link to='login'>
                Back to login
              </Link>
            </div>
            

        
        </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  </div>
  
    );
  }
  
}

export default ForgotAccount;