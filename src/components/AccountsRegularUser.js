import VerticalMenu from './VerticalMenu';
import React, {Component} from 'react'
// import '../stylesheet_QueueIncidents.css';
import DeleteRegularUser from './MangeRegularUser';

class AccountsRegularUser extends Component{

    render(){
        return(
            <div>
                <div className="VerticalMenu">
                    <VerticalMenu/>
                </div>
                
                <div className="ManageUserAccounts">
                    <DeleteRegularUser/>
                </div>
            </div>
        )
    }



}

export default AccountsRegularUser;