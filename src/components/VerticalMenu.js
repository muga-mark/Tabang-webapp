import React, { Component } from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import fire from '../config/Fire';
import {Link} from "react-router";

class VerticalMenu extends Component{
    constructor(props){
    
        super(props);
        
            this.state = {
              emailVerified:false
            }
    }

    state = { activeItem: '' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    logout() {
        fire.auth().signOut();
    }

    render() {
        const { activeItem } = this.state
        let CreateNewAccount;
        let UnverifiedMobileUsers;
        let ManageAccounts;
        let Archives;

            CreateNewAccount = <Link to='/CreateNewAccount'>
                                    <Menu.Item 
                                        name='create user account' 
                                        active={activeItem === 'create user account'} 
                                        onClick={this.handleItemClick}>
                                        <Icon name='add user'/> Create New Account
                                    </Menu.Item>
                                </Link>

            Archives = <Link to='/Archives'>
                                    <Menu.Item 
                                    name='archives' 
                                    active={activeItem === 'archives'} 
                                    onClick={this.handleItemClick}>
                                    <Icon name='archive'/> Archives
                                    </Menu.Item>
                                </Link>                                

            UnverifiedMobileUsers = <Menu.Item
                                            name='Unverified Mobile Users'
                                            active={activeItem === 'Unverified Mobile Users'}
                                            onClick={this.handleItemClick}>
                                        <Icon name='mobile'/> Unverified Mobile Users
                                            <Menu.Menu>

                                                <Link to='/UnverifiedResponders'>
                                                    <Menu.Item
                                                    name='Responder'
                                                    active={activeItem === 'Responder'}
                                                    onClick={this.handleItemClick}
                                                    >
                                                    Responder
                                                    </Menu.Item>
                                                </Link>

                                                <Link to='/UnverifiedVolunteers'>
                                                    <Menu.Item 
                                                    name='Volunteer' 
                                                    active={activeItem === 'Volunteer'} 
                                                    onClick={this.handleItemClick}>
                                                    Volunteer
                                                    </Menu.Item>
                                                </Link>

                                                <Link to='/UnverifiedRegularUsers'>
                                                    <Menu.Item 
                                                    name='Regular User' 
                                                    active={activeItem === 'Regular User'} 
                                                    onClick={this.handleItemClick}>
                                                    Regular User
                                                    </Menu.Item>
                                                </Link>

                                            </Menu.Menu>
                                        </Menu.Item>

            ManageAccounts = <Menu.Item
                                    name='View All Accounts'
                                    active={activeItem === 'View All Accounts'}
                                    onClick={this.handleItemClick}
                                >
                                <Icon name='users'/> Manage Accounts
                                    <Menu.Menu>
                                        <Link to='/AccountsAdmin'>
                                            <Menu.Item
                                            name='Administrator'
                                            active={activeItem === 'Administrator'}
                                            onClick={this.handleItemClick}
                                            >
                                            Administrator
                                            </Menu.Item>
                                        </Link>
                                        
                                        <Link to='/AccountsCCP'>
                                            <Menu.Item
                                            name='Command Center Personnel'
                                            active={activeItem === 'Command Center Personnel'}
                                            onClick={this.handleItemClick}
                                            >
                                            Command Center Personnel
                                            </Menu.Item>
                                        </Link>

                                        <Link to='/AccountsResponder'>
                                            <Menu.Item
                                            name='Responder'
                                            active={activeItem === 'Responder'}
                                            onClick={this.handleItemClick}
                                            >
                                            Responder
                                            </Menu.Item>
                                        </Link>

                                        <Link to='/AccountsVolunteer'>
                                            <Menu.Item 
                                            name='Volunteer' 
                                            active={activeItem === 'Volunteer'} 
                                            onClick={this.handleItemClick}>
                                            Volunteer
                                            </Menu.Item>
                                        </Link>

                                        <Link to='/AccountsRegularUser'>
                                            <Menu.Item 
                                            name='Regular User' 
                                            active={activeItem === 'Regular User'} 
                                            onClick={this.handleItemClick}>
                                            Regular User
                                            </Menu.Item>
                                        </Link>

                                    </Menu.Menu>
                                </Menu.Item>
    
        return (
            
          <Menu inverted pointing vertical icon='labeled'>
            <Link to='Home'>
                <Menu.Item 
                    name='home' 
                    active={activeItem === 'home'} 
                    onClick={this.handleItemClick}>
                <Icon name='home'/>
                Home
                </Menu.Item>
            </Link>

            <Link to='Profile'>
                <Menu.Item 
                    name='profile' 
                    active={activeItem === 'profile'} 
                    onClick={this.handleItemClick} >
                <Icon name='user circle'/> Profile
                </Menu.Item>
            </Link>
            {CreateNewAccount}
            {UnverifiedMobileUsers}
            {ManageAccounts}
            {Archives}
            
            <Menu.Item
                name='logout' 
                active={activeItem === 'logout'} 
                onClick={this.logout} >
            <Icon name='sign out'/> Logout
            </Menu.Item>
          </Menu>
        )
      }
    }

export default VerticalMenu;