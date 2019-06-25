import React, {Component} from 'react';
import { Table, Message, Icon, Input } from 'semantic-ui-react'
import fire from '../config/Fire';
import _ from 'lodash';
import DeleteUserAccount from './DeleteUserAccount';
import searchUser from '../functions/searchUser';

class ManageCCP extends Component{

    constructor(props){
        super(props);
        this.state = {
            admins: [{}],
            ccpProfiles: [{}],
            commandCenterPersonnel: [{}],
            search: ''
        }
        
    }

    componentDidMount(){
        var array = [];
        fire.database().ref('users').orderByChild('user_type').equalTo('Command Center Personnel').once('value', snapshot => {
            this.setState({commandCenterPersonnel: snapshot.val()}, () => {
                _.map(this.state.commandCenterPersonnel, (ccp, key) => {
                    var tempObject = ccp;
                    tempObject.key = key;
                    console.log('temp ccp', tempObject);
                    array.push(tempObject);
                });
                this.setState({ccpProfiles: array}, () => {
                    console.log('ccpProfiles', this.state.ccpProfiles);
                });
            });
        });
    }

    searchHandler = (event) => {
        this.setState({search: event.target.value});
    }

    delete = (uid) => {
        var filteredItems = this.state.ccpProfiles.filter(function (item) {
            return (item.key !== uid);
          });
         
          this.setState({
            ccpProfiles: filteredItems
          });
    }

    render(){
        return(
            <div>
                 {this.state.commandCenterPersonnel?
                    <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell colSpan='2'> Command Center Personnels </Table.HeaderCell>
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
                            {this.state.ccpProfiles.filter(searchUser(this.state.search)).map(ccp => {
                                return(
                                <DeleteUserAccount user_type={ccp.user_type} firstName={ccp.firstName} lastName={ccp.lastName} sex={ccp.sex} address={ccp.address} contactNumber={ccp.contactNumber} email={ccp.email} password={ccp.password} uid={ccp.key} delete={this.delete}/>);
                            })}
                        </Table.Body>
                    </Table>
                :!this.state.commandCenterPersonnel?
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell colSpan='2'> Command Center Personnel </Table.HeaderCell>
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
                                            <Icon name='user'/>No Command Center Personnel Accounts
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

export default ManageCCP