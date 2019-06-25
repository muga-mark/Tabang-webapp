import VerticalMenu from './VerticalMenu';
import React, {Component} from 'react'
// import '../stylesheet_QueueIncidents.css';
import VerifyVolunteer from './VerifyVolunteer';

class UnverifiedVolunteers extends Component{

    render(){
        return(
            <div>
                <div className="VerticalMenu">
                    <VerticalMenu/>
                </div>
                
                <div className="UnverifiedMobileUsers">
                    {/* <h1>UnverifiedVolunteers!</h1> */}
                    <VerifyVolunteer/>
                </div>
            </div>
        )
    }



}

export default UnverifiedVolunteers;