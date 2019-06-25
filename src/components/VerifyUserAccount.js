import React, {Component} from 'react';
import { Button, Table, Header, Image} from 'semantic-ui-react'
import '../stylesheet_QueueIncidents.css';
import '../HeaderDashboard.css';
import fire from '../config/Fire';
import swal from 'sweetalert';

class VerifyUserAccount extends Component{
    
    verifyUser = () => {
        

        swal(this.props.email,{
            title: "Are you sure you want to verify this account?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            })
            .then((willVerify) => {
            if (willVerify) {

                console.log('vertu asd', this.props.uid);
                var isVerified = true;
                var deleteNode = fire.database().ref(`unverifiedMobileUsers/${this.props.uid}`);
                var userNode = fire.database().ref(`users/${this.props.uid}`);
                userNode.update({isVerified: true}).then(()=>{
                    console.log(`${this.props.uid} account verified`);
                    swal("Account Verified!", {icon:"success"});
                    deleteNode.remove().then(()=>{
                        console.log(`${this.props.uid} node in unverifiedMobileUsers node removed`);
                        this.props.verify(this.props.uid);
                    });
                })
                
            } else {
                swal("Verify Account has been cancelled!");
            }
            });
        
    }

    render(){
        return(
            <Table.Row>
                <Table.Cell width='5'>
                    <Header as='h4' image><Image src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' rounded size='mini' circular/>
                        <Header.Content>
                            {this.props.firstName} {this.props.lastName}
                        </Header.Content>
                    </Header>
                </Table.Cell>
                <Table.Cell width='4'>
                        <Header.Content>
                        {this.props.email}
                    </Header.Content>
                </Table.Cell>
                <Table.Cell width='3'>
                    <Header.Content>
                        {this.props.contactNumber}
                    </Header.Content>
                </Table.Cell> 
                <Table.Cell width='3'>
                    <Button color='green' onClick={this.verifyUser}>
                        Verify
                    </Button>
                </Table.Cell>
            </Table.Row>
            
        )
    }

}

export default VerifyUserAccount