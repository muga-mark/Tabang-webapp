import React, {Component} from 'react';
import { Table, Message, Icon, Input } from 'semantic-ui-react'
import fire from '../config/Fire';
import _ from 'lodash';
import DeleteUserAccount from './DeleteUserAccount';
import searchUser from '../functions/searchUser';


class ManageRegularUser extends Component{

    constructor(props){
        super(props);
        this.state = {
            regularUsersProfiles: [{}],
            regularUsers: [{}],
            search: ''
        }
    }

    componentDidMount(){
        var array = [];
        fire.database().ref('users').orderByChild('user_type').equalTo('Regular User').once('value', snapshot => {
            this.setState({regularUsers: snapshot.val()}, () => {
                _.map(this.state.regularUsers, (regularUser, key) => {
                    var tempObject = regularUser;
                    tempObject.key = key;
                    console.log('temp regularUser', tempObject);
                    array.push(tempObject);
                });
                this.setState({regularUsersProfiles: array}, () => {
                    console.log('regularUsersProfiles', this.state.regularUsersProfiles);
                });
            });
        });    
    }

    searchHandler = (event) => {
        this.setState({search: event.target.value});
    }

    delete = (uid) => {
        console.log('in delete function');
        var filteredItems = this.state.regularUsersProfiles.filter(function (item) {
            console.log('in filter');
            return (item.key !== uid);
          });
          this.setState({
            regularUsersProfiles: filteredItems
          }, () => {
              console.log('state array updated');
          });
    }

    render(){
        return(
            <div>
                {this.state.regularUsers?
                    <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell colSpan='2'> Regular Users </Table.HeaderCell>
                            <Table.HeaderCell colSpan='2'>
                                <form>
                                    <Input type="text" name="" id="" onChange={this.searchHandler} style={{marginLeft:'75px'}}/><Icon name='search' style={{marginLeft:'6px'}}/>    
                                </form>
                            </Table.HeaderCell>
                        </Table.Row>
                        
                        <Table.Row>
                            <Table.HeaderCell style={{width:'350px'}}>Name</Table.HeaderCell>
                            <Table.HeaderCell style={{width:'300px'}}>Email</Table.HeaderCell>
                            <Table.HeaderCell>Contact Number</Table.HeaderCell>
                            <Table.HeaderCell>Status</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {this.state.regularUsersProfiles.filter(searchUser(this.state.search)).map(regularUser => {
                        return(
                        <DeleteUserAccount user_type={regularUser.user_type} firstName={regularUser.firstName} lastName={regularUser.lastName} sex={regularUser.sex} contactNumber={regularUser.contactNumber} email={regularUser.email} address={regularUser.address} password={regularUser.password} uid={regularUser.key} delete={this.delete}/>);
                    })}
                        </Table.Body>
                    </Table>
                :!this.state.regularUsers?
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell colSpan='2'> Regular Users </Table.HeaderCell>
                            <Table.HeaderCell colSpan='2'>
                                <form>
                                    <Input type="text" name="" id="" onChange={this.searchHandler} style={{marginLeft:'75px'}}/><Icon name='search' style={{marginLeft:'6px'}}/>
                                </form>
                            </Table.HeaderCell>
                        </Table.Row>
                        
                        <Table.Row>
                            <Table.HeaderCell style={{width:'350px'}}>Name</Table.HeaderCell>
                            <Table.HeaderCell style={{width:'300px'}}>Email</Table.HeaderCell>
                            <Table.HeaderCell>Contact Number</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                        
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell colSpan='4' style={{paddingTop:'40px', paddingBottom:'40px'}}>
                                <Message info>
                                    <Message.Header>
                                        <div style={{fontSize:'18px', textAlign:'center'}}>
                                            <Icon name='user'/>No Regular User Accounts
                                        </div>
                                    </Message.Header>
                                </Message>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
                :null
                } 
                
            </div>
        )
    }

}

export default ManageRegularUser