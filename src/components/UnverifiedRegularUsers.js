import VerticalMenu from './VerticalMenu';
import React, {Component} from 'react'
import VerifyRegularUser from './VerifyRegularUser';
// import '../stylesheet_QueueIncidents.css';



class UnverifiedRegularUsers extends Component{

    render(){
        return(
            <div>
                <div className="VerticalMenu">
                    <VerticalMenu/>
                </div>
                
                <div className="UnverifiedMobileUsers">
                    {/* <h1>UnverifiedRegularUsers!</h1> */}
                    <VerifyRegularUser/>
                </div>
            </div>
        )
    }



}

export default UnverifiedRegularUsers;