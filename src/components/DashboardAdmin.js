import React, {Component} from 'react'
import '../stylesheet_QueueIncidents.css';
import VerticalMenu from './VerticalMenu';
import Home from './Home';

class DashboardAdmin extends Component {
    
    render(){
        return (
            <div className="ui visible">
            <div >
                    <Home/>
                 
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

export default DashboardAdmin;