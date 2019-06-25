import VerticalMenu from './VerticalMenu';
import React, {Component} from 'react'
import '../stylesheet_QueueIncidents.css';

class Home extends Component{

    render(){
        return(
            <div>
                <div className="VerticalMenu">
                    <VerticalMenu/>
                </div>
                
                <div className="Homepage">
                    {/* <h1>WELCOME MADAFAKKER!</h1> */}
                </div>
            </div>
        )
    }



}

export default Home;