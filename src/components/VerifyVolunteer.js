import React, {Component} from 'react';
import { Table, Message, Icon, Input } from 'semantic-ui-react'
import '../stylesheet_QueueIncidents.css';
import '../HeaderDashboard.css';
import fire from '../config/Fire';
import _ from 'lodash';
import VerifyUserAccount from './VerifyUserAccount';
import searchUser from '../functions/searchUser';

class VerifyVolunteer extends Component{
    constructor(props){
        super(props);
        this.state = {
            volunteers: [{}],
            volunteersProfiles: [{}],
            search: ''
        }
    }

    componentDidMount(){
        var list = [];
        var tempObject = {};
        fire.database().ref('unverifiedMobileUsers').orderByChild('user_type').equalTo('Volunteer').once('value', snapshot => {
            this.setState({volunteers: snapshot.val()}, () => {
                console.log('unverified volunteers', this.state.volunteers);
                _.map(this.state.volunteers, (volunteer, key) => {
                    fire.database().ref(`users/${key}`).once('value', snapshot => {
                        tempObject = snapshot.val();
                        tempObject.key = snapshot.key;
                        list.push(tempObject);
                        this.setState({volunteersProfiles: list}, ()=> {
                            console.log('Unverified Volunteers Profiles', this.state.volunteersProfiles);
                        });
                    })
                })
            });
        });
    }

    verify = (uid) => {
        var filteredItems = this.state.volunteersProfiles.filter(function (item) {
            return (item.key !== uid);
          });
         
          this.setState({
            volunteersProfiles: filteredItems
          });
    }

    searchHandler = (event) => {
        this.setState({search: event.target.value});
    }

    render(){
        return(
            <div>
                {this.state.volunteers?
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell colSpan='2'> Unverified Volunteers </Table.HeaderCell>
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
                                <Table.HeaderCell>Action</Table.HeaderCell>
                            </Table.Row>

                        </Table.Header>
                        <Table.Body>
                        {this.state.volunteersProfiles.filter(searchUser(this.state.search)).map(volunteer => 
                            <VerifyUserAccount firstName={volunteer.firstName} lastName={volunteer.lastName} contactNumber={volunteer.contactNumber} email={volunteer.email} uid={volunteer.key} verify={this.verify}/>)}
                        </Table.Body>
                    </Table>
                :!this.state.volunteers?
                <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell colSpan='2'>Unverified Volunteers</Table.HeaderCell>
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
                                <Table.HeaderCell>Action</Table.HeaderCell>
                            </Table.Row>
                            
                        </Table.Header>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell colSpan='4' style={{paddingTop:'40px', paddingBottom:'40px'}}>
                                    <Message info>
                                        <Message.Header>
                                            <div style={{fontSize:'18px', textAlign:'center'}}>
                                                <Icon name='user'/>No Unverified Volunteer Users
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

export default VerifyVolunteer