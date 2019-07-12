import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index'
import {Redirect} from 'react-router';

class Logout extends Component {
 
    constructor(props){
 
      super(props)
 
    }
    
    componentDidMount(){
        this.props.logout()
    }

    render(){ 
 
     return <Redirect to="/seeyousoon" />
      
    }
}
 
const mapDispatchToProps  = (dispatch) => {
    return {
        logout:()=>{dispatch(actions.logout())}
    }
}

export default connect(null, mapDispatchToProps)(Logout);