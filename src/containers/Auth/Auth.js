import React, {Component} from 'react';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from "../../UI/Spinner/Spinner";
import {Redirect} from 'react-router';

class Auth extends Component {
 
    constructor(props){
 
      super(props)
        this.state = {
            loginEmail:null,
            loginPassword:null,
            signUpCode:null,
            signUpCodeFlag:false,
            onSignUp:false,
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
            case "signUpCode":
            this.setState({signUpCode:e.target.value})
            break;
        }
    }
    submitFormHandler = (e) => {
        e.preventDefault();
        let authentication;
        let signUpCode = this.state.signUpCode;
        let onSignUp = this.state.onSignUp
        if(signUpCode ==="123!@#" && onSignUp===true){
            authentication="signUp"
            this.props.authSync(this.state.loginEmail, this.state.loginPassword,authentication) 
        } else if (signUpCode !=="123!@#" && onSignUp===false){
            authentication="signIn"
            this.props.authSync(this.state.loginEmail, this.state.loginPassword,authentication) 
        } else {

            this.setState({signUpCodeFlag:true})
            setTimeout(()=>{
                this.setState({signUpCodeFlag:false})
            },3000)
        }
        
    }
    signInFormHandler = (e) => {
        
        e.preventDefault();
        this.setState((prevState)=>{
            
          return  {onSignUp:!prevState.onSignUp}
        })
    }
    render(){ 
       
        let errorMessage=null;
        if(this.props.error){
            errorMessage=<span className="text-danger">{this.props.error.message}</span>
         
        }
        let spinner;
        if(this.props.loading){
            spinner=<Spinner />
        }else{
            spinner=null
        }
        let redirectOnAuth;
        if(this.props.auth){
            redirectOnAuth= <Redirect to="/about" />
        }
     return (
         <div className="w-100 d-flex justify-content-center text-primary">
            {redirectOnAuth}
            <form  className="w-80 shadow  p-5 m-5 "> 
                <div style={{width:"100px",height:"10px",position:"absolute", top:0, right:0 }}>
                    {spinner}
                </div>
                {errorMessage}
                <h2>{this.state.onSignUp?"Create account":"Log in"}</h2>
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
                    <input 
                    type="password" 
                    className="form-control" 
                    id="loginPassword"
                    onChange = {this.inputDataHandler}  />
                </div>
                {this.state.onSignUp?(<div className="form-group">
                    <label htmlFor="signUpCode">Enter signup code</label>
                    <input 
                    type="text" 
                    className="form-control" 
                    id="signUpCode"
                    onChange = {this.inputDataHandler}  />
                    {this.state.signUpCodeFlag?<small className="text-danger">Wrong Code</small>:null}
                </div>):null}
                
                <button 
                onClick={this.submitFormHandler} 
                type="submit" 
                className="btn btn-primary mr-2">{this.state.onSignUp ? <span>Create</span>:"Log in"}</button>
                <span><i className="fas fa-arrows-alt-h"></i></span>
                <button 
                onClick={this.signInFormHandler} 
                type="submit" 
                className="btn btn-primary ml-2">{this.state.onSignUp ? <span><i className="fas fa-door-open"></i></span>:<span><i className="fas fa-user-plus pr-2"></i></span>}</button>
                
            </form>
      </div>
      );
    }
}
 

  const mapDispatchToProps = (dispatch) => {
    return {
      authSync:(email, password, authentication) => dispatch(actions.authSync(email, password, authentication))
    }
  }
  const mapStateToProps = (state) => {
    return {
      loading:state.reducerAuth.loading,
      error:state.reducerAuth.error,
      auth:state.reducerAuth.idToken !== null
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps )(Auth);