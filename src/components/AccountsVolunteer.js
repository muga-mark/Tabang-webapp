import VerticalMenu from './VerticalMenu';
import React, {Component} from 'react'
import ManageVolunteer from './ManageVolunteer';

class AccountsVolunteer extends Component{

    render(){
        return(
            <div>
                <div className="VerticalMenu">
                    <VerticalMenu/>
                </div>
                
                <div className="ManageUserAccounts">
                    <ManageVolunteer/>
                </div>
            </div>
        )
    }



}

export default AccountsVolunteer;