import React, {Component} from 'react';
import Auxx from '../../hoc/Auxx';
import ToolbarAlt from '../../components/Navigation/ToolbarAlt/ToolbarAlt';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';
import classes from './Layout.module.css'

class Layout extends Component {
      constructor(props){
            super(props)
            this.state = {
                 showSideDrawer:false
            }
      }

      sideDrawerClosedHandler = () => {
            this.setState({showSideDrawer:false})

      }
      expandToolbarMenuHandler = () => {
            this.setState((prevState)=>{
                  return {showSideDrawer:!prevState.showSideDrawer}})
      }
      render(){
            
            return (
            <Auxx>
                  <div className="bg-secondary">
                        <ToolbarAlt 
                              authFlag={this.props.auth}
                              clicked={this.expandToolbarMenuHandler} />
                        <SideDrawer 
                              authFlag={this.props.auth}
                              open={this.state.showSideDrawer} 
                              closed ={this.sideDrawerClosedHandler} />
                  </div>
                  <main className="p-3 bg-light my-5" id="test" >
                        {this.props.children} 
                  </main>
                 
                  <footer id="footer" className={["bg-secondary",classes.Footer].join(" ")} ><a href="https://github.com/productbrowserteam/product_browser"><i className="fab fa-github fa-2x"></i></a><a href="https://codepen.io/wieczors/"><i className="fab fa-codepen fa-2x"></i></a></footer>  
               
            </Auxx>
            );
      }
}
 
const mapStateToProps = (state) => {
      return {
            auth:state.reducerAuth.idToken !== null
      }
}

export default connect(mapStateToProps)(Layout);