import React, {Component} from 'react'
import QueueIncidents from './QueueIncidents';
import CityMap from './CityMap';
import HeaderDashboard from './HeaderDashboard';
import '../stylesheet_QueueIncidents.css';
import {NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

class DashboardCCPersonnel extends Component {

    render(){
        return (
            <div className="ui visible">
                <div className="ui bottom attached segment pushable" style={{maxHeight:'100vh', minHeight: '100vh', display: 'compact', flexFlow: 'column nowrap'}}>
                    <QueueIncidents/><div className="hidescrollbar">
                    <div style={{paddingLeft:"258px"}}> 
                            <div style={{maxHeight:'100%', maxWidth:'100%', }}>
                            <HeaderDashboard user_type='Command Center Personnel'/>
                            <NotificationContainer/>
                            </div>
                            <div style={{minHeight: '80vh', display: 'flex', flexFlow: 'column nowrap'}}>
                                <CityMap/>
                            </div>
                        </div>
                        </div>
                </div>  
           </div>
        );
    }
}
// <CityMap
// containerElement={<div style={{ height: `400px` }} />}
// mapElement={<div style={{ height: `100%` }} />}
// coordinates={this.state.coordinates}
// />
export default DashboardCCPersonnel;