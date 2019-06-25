import VerticalMenu from './VerticalMenu';
import React, {Component} from 'react'
import ManageCCP from './ManageCCP';

class AccountsCCP extends Component{

    render(){
        return(
            <div>
                <div className="VerticalMenu">
                    <VerticalMenu/>
                </div>
                
                <div className="ManageUserAccounts">
                    <ManageCCP/>
                </div>
            </div>
        )
    }



}

export default AccountsCCP;