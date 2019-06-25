import VerticalMenu from './VerticalMenu';
import React, {Component} from 'react'
import ManageAdmin from './ManageAdmin';

class AccountsAdmin extends Component{

    render(){
        return(
            <div>
                <div className="VerticalMenu">
                    <VerticalMenu/>
                </div>
                
                <div className="ManageUserAccounts">
                    <ManageAdmin/>
                </div>
            </div>
        )
    }



}

export default AccountsAdmin;