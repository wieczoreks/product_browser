import React, {Component} from 'react';
 
class Auth extends Component {
 
    constructor(props){
 
      super(props)
 
    }
 
    render(){ 
 
     return (
         <div className="w-100 d-flex justify-content-center text-primary">
            <form className="w-50 shadow p-5 m-5 "> 
                <div className="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1"  />
                </div>
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
      </div>
      );
    }
}
 
export default Auth;