import React, {Component} from 'react';
import { Table, Message, Icon, Input, Loader } from 'semantic-ui-react'
import fire from '../config/Fire';
import _ from 'lodash';
import DeleteUserAccount from './DeleteUserAccount';
import searchUser from '../functions/searchUser';

class ManageAdmin extends Component{

    constructor(props){
        super(props);
        this.state = {
            admins: [{}],
            adminsProfiles: [{}],
            administrators: [{}],
            search: ''
        }
        
    }

    componentDidMount(){
        var array = [];
        fire.database().ref('users').orderByChild('user_type').equalTo('Administrator').once('value', snapshot => {
            this.setState({administrators: snapshot.val()}, () => {
                _.map(this.state.administrators, (administrator, key) => {
                    var tempObject = administrator;
                    tempObject.key = key;
                    console.log('temp admin', tempObject);
                    array.push(tempObject);
                });
                this.setState({adminsProfiles: array}, () => {
                    console.log('adminsprofile', this.state.adminsProfiles);
                });
            });
        });
    }

    searchHandler = (event) => {
        this.setState({search: event.target.value});
    }

    delete = (uid) => {
        var filteredItems = this.state.adminsProfiles.filter(function (item) {
            return (item.key !== uid);
          });
         
          this.setState({
            adminsProfiles: filteredItems
          });
    }

    render(){
        return(
            <div>
                 {this.state.administrators?
                    <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell colSpan='2'> Administrators </Table.HeaderCell>
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
                            {this.state.adminsProfiles.filter(searchUser(this.state.search)).map(administrator => {
                                return(
                                <DeleteUserAccount user_type={administrator.user_type} firstName={administrator.firstName} lastName={administrator.lastName} contactNumber={administrator.contactNumber} email={administrator.email} address={administrator.address} password={administrator.password} sex={administrator.sex} uid={administrator.key} delete={this.delete}/>);
                            })}
                        </Table.Body>
                    </Table>
                :!this.state.administrators?
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell colSpan='2'> Administrators </Table.HeaderCell>
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
                                            <Icon name='user'/>No Admin Accounts
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

export default ManageAdmin