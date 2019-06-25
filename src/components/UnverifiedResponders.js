import VerticalMenu from './VerticalMenu';
import React, {Component} from 'react'
import VerifyResponder from './VerifyResponder';


class UnverifiedResponders extends Component{

    render(){
        return(
            <div>
                <div className="VerticalMenu">
                    <VerticalMenu/>
                </div>
                
                <div className="UnverifiedMobileUsers">
                    {/* <h1>UnverifiedResponders!</h1> */}
                    <VerifyResponder/>
                    
                </div>
            </div>
        )
    }



}

export default UnverifiedResponders