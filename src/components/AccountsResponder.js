import VerticalMenu from './VerticalMenu';
import React, {Component} from 'react'
import ManageResponder from './ManageResponder';

class AccountsResponder extends Component{

    render(){
        return(
            <div>
                <div className="VerticalMenu">
                    <VerticalMenu/>
                </div>
                
                <div className="ManageUserAccounts">
                    <ManageResponder/>
                </div>
            </div>
        )
    }



}

export default AccountsResponder