import React, {Component} from 'react';
import { Table, Message, Icon, Input } from 'semantic-ui-react'
import fire from '../config/Fire';
import _ from 'lodash';
import DeleteUserAccount from './DeleteUserAccount';
import searchUser from '../functions/searchUser';

class ManageResponder extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            responders: [{}],
            respondersProfiles: [{}],
            search: ''
        }
        this.update = this.update.bind(this);
        console.log('this', this)
        //this.updateDetails = this.updateDetails.bind(this);
    }

    componentDidMount(){
        var array = [];
        fire.database().ref('users').orderByChild('user_type').equalTo('Responder').once('value', snapshot => {
            this.setState({responders: snapshot.val()}, () => {
                _.map(this.state.responders, (responder, key) => {
                    var tempObject = responder;
                    tempObject.key = key;
                    console.log('temp responder', tempObject);
                    array.push(tempObject);
                });
                this.setState({respondersProfiles: array}, () => {
                    console.log('respondersProfiles', this.state.respondersProfiles);
                });
            });
        });    
    }

    searchHandler = (event) => {
        this.setState({search: event.target.value});
    }

    delete = (uid) => {
        console.log('in delete function');
        var filteredItems = this.state.respondersProfiles.filter(function (item) {
            console.log('in filter');
            return (item.key !== uid);
          });
          this.setState({
            respondersProfiles: filteredItems
          }, () => {
              console.log('state array updated');
          });
    }

    update(){
        console.log('updateDetails');
    }

    render(){
        return(
            <div>
                {this.state.responders?
                     <Table celled>
                     <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell colSpan='2'> Responders </Table.HeaderCell>
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
                            {this.state.respondersProfiles.filter(searchUser(this.state.search)).map(responder => {
                                return(
                                <DeleteUserAccount isVerified={this.isVerified} user_type={responder.user_type} firstName={responder.firstName} lastName={responder.lastName} sex={responder.sex} contactNumber={responder.contactNumber} email={responder.email} address={responder.address} password={responder.password} uid={responder.key} delete={this.delete} update={this.update}/> );                        
                            })}
                        </Table.Body>
                    </Table>
                :!this.state.responders?
                <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell colSpan='2'> Responders </Table.HeaderCell>
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
                                        <Icon name='user'/>No Responder Accounts
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

export default ManageResponder