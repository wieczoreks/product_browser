import React, {Component} from 'react';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';

class Auth extends Component {
 
    constructor(props){
 
      super(props)
        this.state = {
            loginEmail:null,
            loginPassword:null
        }
    }
    inputDataHandler = (e) => {
        switch(e.target.id){
            case "loginEmail":
                this.setState({loginEmail:e.target.value})
                break;
            case "loginPassword":
                this.setState({loginPassword:e.target.value})
                break;
        }
    }
    submitFormHandler = (e) => {
        e.preventDefault();
        this.props.authSync(this.state.loginEmail, this.state.loginPassword)
    }

    render(){ 
        console.log("render Auth", this.state.loginPassword,this.state.loginEmail)
     return (
         <div className="w-100 d-flex justify-content-center text-primary">
            <form className="w-50 shadow p-5 m-5 " onSubmit={this.submitFormHandler}> 
                <div className="form-group">
                    <label htmlFor="loginEmai">Email address</label>
                    <input 
                    onChange = {this.inputDataHandler} 
                    type="email" 
                    className="form-control" 
                    id="loginEmail" aria-describedby="emailHelp" />
                    
                </div>
                <div className="form-group">
                    <label htmlFor="loginPassword">Password</label>
                    <input type="password" className="form-control" id="loginPassword"  />
                </div>
                <span>{this.state.loginPassword}</span><span>{this.state.loginEmail}</span>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
      </div>
      );
    }
}
 

  const mapDispatchToProps = (dispatch) => {
    return {
      authSync:(email, password) => dispatch(actions.authSync(email, password))
    }
  }
  
  export default connect(null,mapDispatchToProps )(Auth);