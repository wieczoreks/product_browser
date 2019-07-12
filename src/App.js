import React,{Component, Suspense} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Layout from "./components/Layout/Layout";
import {Route,Switch, BrowserRouter} from 'react-router-dom';
import About from './components/About/About';
import ProductDetails from './components/ProductDetails/ProductDetails'
import Data from './containers/Data/Data';
import FourOFour from './components/FourOFour/FourOFour';
import asyncComponent from './hoc/AsyncComponent/AsyncComponent';
import Auth from "./containers/Auth/Auth"
import Logout from "./containers/Auth/Logout/Logout";
import Seeyousoon from "./components/Seeyousoon/Seeyousoon";
import {connect} from "react-redux";
import * as actions from "./store/actions/index";
import Login from './containers/Auth/Login/Login';
import Spinner from './UI/Spinner/Spinner';

const CategoryBrowser = React.lazy(()=>{
  return import("./containers/CartegoryBrowser/CategoryBrowser")
});

const AsyncNewProductBrowser = asyncComponent(()=>{
  return import("./containers/ProductBrowser/ProductBrowser")
})

class App extends Component {
  componentDidMount(){

    this.props.autoLogin();

  }
  
  render(){
   
  return (
  <BrowserRouter>
    <div className=" container-fluid text-center">
     <Layout >
     
       <Switch>
          <Route path="/" exact component={About} />
          <Route path="/about" exact component={About} />
          <Route path="/login" exact component={Auth} />
          <Route path="/seeyousoon" exact component={Seeyousoon} />
          {this.props.auth?<Route path="/data" exact component={Data} />:<Route component={Login}  />}
          {this.props.auth?<Route path="/products" exact component={AsyncNewProductBrowser} />:<Route component={Login}  />}
          {this.props.auth?<Route path="/categories" exact render={()=><Suspense fallback={<Spinner />}><CategoryBrowser /></Suspense>} />:<Route component={Login}  />}
          {this.props.auth?<Route path="/logout" exact component={Logout} />:<Route component={Login}  />}
         
          {this.props.auth?<Route path="/en/products/:id/" exact component={ProductDetails} />:<Route component={Login}  />}
          {this.props.auth?<Route path="/de/products/:id/" exact component={ProductDetails} />:<Route component={Login}  />}
          
          <Route component={FourOFour} />
          {/*<Redirect from="/" to="/about" />*/}
          
        </Switch>
    
     </Layout>
    </div>
  </BrowserRouter>
  ); 
}
}

const mapStateToPorps = (state) => {
  return {
    auth:state.reducerAuth.idToken !=null
  }
}

const mapDispatchToProps = (dispatch) => {
   return {
      autoLogin: ()=> {dispatch(actions.authCheckState())}
   }
}

export default connect(mapStateToPorps, mapDispatchToProps)(App);

//import MicroTool from './components/MicroTool/MicroTool';
//import ProductBrowser from "./containers/ProductBrowser/ProductBrowser";
//import CategoryBrowser from './containers/CartegoryBrowser/CategoryBrowser';
//import MicroTool from './components/MicroTool/MicroTool';