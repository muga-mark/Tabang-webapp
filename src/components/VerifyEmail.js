import VerticalMenu from './VerticalMenu';
import React, {Component} from 'react'
import '../stylesheet_QueueIncidents.css';
import '../Home.css';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import fire from '../config/Fire';
import swal from 'sweetalert';
import {Link} from "react-router";

class verifyEmail extends Component{

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
          
            emailVerified:'',
            email: '',
          
        }
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value});
      }

    componentDidMount(){
        var user = fire.auth().currentUser;
        console.log('userProfile',user);
        var emailVerified, email;
        if (user != null){
            emailVerified = user.emailVerified;
            email = user.email;
            console.log('isEmailVerified: ',emailVerified);
            this.setState({emailVerified: emailVerified, email: email});
            console.log('My Email: ', email);
        }
    }

    verifyEmail = () =>{    
        var user = fire.auth().currentUser;
        user.sendEmailVerification().then(function() {
            // Email sent.
            swal("A verification link has been sent to your email account!", {
                icon: "success",
                });
            }).catch(e=> {
            // An error happened.
            var err = e.message;
                console.log(err);
                this.setState({err: err});
            });
            
        }
    
    render(){
        let unverifed;

        
            unverifed = <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
      
            <Segment stacked style={{marginTop:'20px'}}>
                <Header as='h2' color='red' textAlign='center'>
                    Verify your email address
                </Header>
                <div style={{marginBottom:'30px'}}>
                    <p>
                        To finish setting up this Tabang account, we just need to make sure that
                        this email address is yours.
                    </p>
                </div>
                
                
                    <div className="space"></div>
                    
                    <Button inverted color= 'red' fluid size='large' onClick={this.verifyEmail}>
                        Verify {this.state.email}
                    </Button>
                    
                    <p className='catchError'>{this.state.err}</p>
                    <div style={{marginTop:'50px', marginLeft:'235px'}}>
                    <Link to='login'>
                        Back to login
                    </Link>
                    </div>
                  
            
              </Segment>
            </Grid.Column>
          </Grid>
    
        return(
                
                    <div className="login-form">
                        {unverifed}
                    </div>
            
        )
    }



}

export default verifyEmail;