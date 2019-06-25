//import PropTypes from 'prop-types'
import React, { Component } from 'react'
import '../stylesheet_QueueIncidents.css';
import '../Login.css';
import {Message, Button, Form, Grid, Header, Segment} from 'semantic-ui-react'
import fire from '../config/Fire';
import CircularProgress from "@material-ui/core/CircularProgress"
//import { BrowserRouter, Switch, Route, Link, history } from "react-router-dom";


class LoginAction extends Component{
    constructor(props){
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        email: '',
        password: '',
        submitting: false,
        completed: 0,
        emailError: false,
        passwordError: false,
        authError:false,
        formError: false,
      }
    }
   
  
    componentDidMount(){
      this.authListener();
      this.timer = setInterval(this.progress, 20);
    }
  
    componentWillUnmount() {
      clearInterval(this.timer);
    }

    progress = () => {
      const { completed } = this.state;
      this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
    };
  
    authListener() {
      fire.auth().onAuthStateChanged((user) => {
        //console.log(user);
        if (user) {
          this.setState({ user });
          //localStorage.setItem('user', user.uid);
        } else {
          this.setState({ user: null });
          //localStorage.removeItem('user');
        }
      });
    }
  
  

    handleSubmit = e => {
      e.preventDefault();
      const { onSubmit } = this.props;
      const { email, password } = this.state;
      if (onSubmit) {
        this.setState({ submitting: true });
        onSubmit(email, password);
      }

      let error=false;
      if (email ===''){
        this.setState({emailError: true});
        console.log("Blank email field");
        error = true;
      } else {
        this.setState({emailError: false});
      }

      if(password===''){
        this.setState({passwordError:true});
        console.log("Blank password field");
      }else{
        this.setState({passwordError:false});
      }

      if(this.authListener()){
        this.setState({authError:false})
      }else{
        this.setState({authError:true}) 
        console.log("Authentication Error");
      }

      if(error){
        this.setState({formError: true});
        console.log("Form error");
      }else{
        this.setState({formError:false});
      }

      
    };  

    handleChange(e){
      this.setState({[e.target.name]: e.target.value});
    }
 
    
  
    render(){
      return(
        <div className='login-form'>
      <style>{`
        body > div,
        body > div > div,
        body > div > div > div.login-form {
          height: 100%;
        }
      `}</style>
      
      <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
      
        <Grid.Column style={{ maxWidth: 450 }}>
          
          <Form size='large' onSubmit={(event) => {this.handleSubmit(event);}}
              error={this.state.emailError || this.state.passwordError || this.state.formError}
              >
            <Segment stacked>
            
            <Header as='h2' textAlign='center' style={{color: 'white'}}>
              Personnel Login   
            </Header>
              <Form.Input
              fluid icon='user'
              iconPosition='left'
              placeholder='E-mail address' 
              name='email' 
              value={this.state.email} 
              onChange={this.handleChange}
              error={this.state.emailError||this.state.authError}/>
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                name='password'
                value={this.state.password}
                onChange={this.handleChange}
                error={this.state.passwordError||this.state.authError}/>
              
              <Button color= 'teal' fluid size='large' >
              { this.state.authError || this.state.formError || this.state.passwordError || this.state.emailError ? "Login" :
                this.state.submitting ? (
                <CircularProgress classname={this.progress} style={{color: "#fff"}} color={"inherit"} size={16} variant="determinate" value={this.state.completed} />) :(
              "Login")}
              </Button>
              {this.state.emailError||this.state.passwordError?
                  <Message compact error>
                    <Message.Header>Login Error</Message.Header>
                    Please do not leave any of the fields blank.</Message>:null}
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
      );
    }
    
  }

  export default LoginAction