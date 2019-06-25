import React, {Component} from 'react';
import { Table, Message, Icon, Input } from 'semantic-ui-react'
import fire from '../config/Fire';
import _ from 'lodash';
import DeleteUserAccount from './DeleteUserAccount';
import searchUser from '../functions/searchUser';

class ManageVolunteer extends Component{
   
    constructor(props){
        super(props);
        this.state = {
            volunteerProfiles: [{}],
            volunteers: [{}],
            search: ''
        }
        
    }

    componentDidMount(){
        var array = [];
        fire.database().ref('users').orderByChild('user_type').equalTo('Volunteer').once('value', snapshot => {
            this.setState({volunteers: snapshot.val()}, () => {
                _.map(this.state.volunteers, (volunteer, key) => {
                    var tempObject = volunteer;
                    tempObject.key = key;
                    console.log('temp volunteer', tempObject);
                    array.push(tempObject);
                });
                this.setState({volunteerProfiles: array}, () => {
                    console.log('volunteerProfiles', this.state.volunteerProfiles);
                });
            });
        });    
    }

    searchHandler = (event) => {
        this.setState({search: event.target.value});
    }

    delete = (uid) => {
        console.log('in delete function');
        var filteredItems = this.state.volunteerProfiles.filter(function (item) {
            console.log('in filter');
            return (item.key !== uid);
          });
          this.setState({
            volunteerProfiles: filteredItems
          }, () => {
              console.log('state array updated');
          });
    }

    render(){
        return(
            <div>
                {this.state.volunteers?
                    <Table celled>
                     <Table.Header>
                         <Table.Row>
                            <Table.HeaderCell colSpan='2'> Volunteers </Table.HeaderCell>
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
                     {this.state.volunteerProfiles.filter(searchUser(this.state.search)).map(volunteer => {
                        return(
                        <DeleteUserAccount user_type={volunteer.user_type} firstName={volunteer.firstName} lastName={volunteer.lastName} sex={volunteer.sex} contactNumber={volunteer.contactNumber} email={volunteer.email} password={volunteer.password} address={volunteer.address} uid={volunteer.key} delete={this.delete}/>);
                    })}
                        </Table.Body>
                    </Table>
                :!this.state.volunteers?
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell colSpan='2'> Volunteers </Table.HeaderCell>
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
                                                <Icon name='user'/>No Volunteer Accounts
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

export default ManageVolunteer