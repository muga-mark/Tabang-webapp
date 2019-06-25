import React, {Component} from 'react';
import { Image, Table, Header, Button, Form} from 'semantic-ui-react';
import _ from 'lodash';
import fire from '../config/Fire';
class DispatchMobileUser extends Component{

    constructor(props){
        super(props);
        this.state = {
            isButtonDisabled: false
        }

        var isAccepted = fire.database().ref(`mobileUsers/Responder/${this.props.id}/isAccepted`);
        var isACCEPTED;
        isAccepted.on('value', snapshot => {
            isACCEPTED = snapshot.val();
            this.setState({isAccepted: isACCEPTED});

            if(isACCEPTED === true){
            this.setState({isButtonDisabled:true});
            
        }
        });


        var isAccepted = fire.database().ref(`mobileUsers/Volunteer/${this.props.id}/isAccepted`);
        console.log("volunteer123", this.props.id);
        var isACCEPTED;
        isAccepted.on('value', snapshot => {
            isACCEPTED = snapshot.val();
            this.setState({isAccepted: isACCEPTED});
           
            if(isACCEPTED === true){
            this.setState({isButtonDisabled:true});
            
        }
        });

        var isRejected = fire.database().ref(`mobileUsers/Volunteer/${this.props.id}/isRejected`);
        var isREJECTED;
        isRejected.on('value', snapshot => {
            isREJECTED = snapshot.val();   
            this.setState({isRejected: isREJECTED});
            if(isREJECTED === true){
            this.setState({isButtonDisabled:true});
        }
        });

        console.log('certificate',this.props.certification);
    }

    dispatchMobileUser = () => {
        var incidentID = this.props.incidentID;
        var user_type = this.props.user_type
        console.log(`user_type: ${user_type} uid: ${this.props.id}`);
        const dispatchRef = fire.database().ref(`mobileUsers/${user_type}/${this.props.id}`);
        dispatchRef.update({incidentID});
    }
    
    render(){
        return( 
            <Table.Row>
                <Table.Cell>
                    <Header as='h4' image><Image src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' rounded size='mini'/>
                        <Header.Content>
                            <p className='colorBlue'>{this.props.firstName} {this.props.lastName}</p>
                            <Header.Subheader></Header.Subheader>
                            <Header.Subheader><p className='colorRed'>{this.props.distance} m away</p></Header.Subheader>
                        </Header.Content>
                    </Header>
                </Table.Cell>
                <Table.Cell>
                    <Header>
                        <Header.Content>
                            <Form.Group widths='3'>
                                <Form.Field>
                                    <Header.Subheader><p className='colorBlue'><b>Distance:</b> {this.props.distance} m</p></Header.Subheader>
                                </Form.Field>
                                <Form.Field>
                                    <Header.Subheader><p className='colorBlue'><b>Email:</b> {this.props.email}</p></Header.Subheader>
                                </Form.Field>
                                <Form.Field>
                                    <Header.Subheader><p className='colorBlue'><b>Contact Number:</b> {this.props.contactNumber}</p></Header.Subheader>
                                </Form.Field>
                                </Form.Group>
                                <Form.Field>
                                    {this.props.user_type === 'Volunteer'?
                                        <>
                                        <Header.Subheader><p className='colorBlue'><b>Certification:</b> {this.props.certification}</p></Header.Subheader>
                                        <Header.Subheader><p className='colorBlue'><b>Medical Degree:</b> {this.props.medicalDegree}</p></Header.Subheader>
                                        <Header.Subheader><p className='colorBlue'><b>Medical Profession:</b> {this.props.medicalProfession}</p></Header.Subheader>
                                        <Header.Subheader><p className='colorBlue'><b>Points:</b> {this.props.points}</p></Header.Subheader>
                                        </>
                                    :null}
                                </Form.Field>
                            
                            
                        </Header.Content>
                    </Header>
                </Table.Cell>
                <Table.Cell>
                    <Button attached='bottom' color='red' onClick={this.dispatchMobileUser} disabled={this.state.isButtonDisabled}>
                        {this.state.isRejected===true? 'Rejected' : 'Dispatch'}
                    </Button>
                </Table.Cell>
            </Table.Row>
        );  
    }

}

   
export default DispatchMobileUser;