import React, {Component} from 'react';
import Auxx from '../../hoc/Auxx';
import ToolbarAlt from '../../components/Navigation/ToolbarAlt/ToolbarAlt';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';


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
                  <div className="bg-secondary ">
                        <ToolbarAlt 
                              authFlag={this.props.auth}
                              clicked={this.expandToolbarMenuHandler} />
                        <SideDrawer 
                              authFlag={this.props.auth}
                              open={this.state.showSideDrawer} 
                              closed ={this.sideDrawerClosedHandler} />
                  </div>
                  <main className="p-3 bg-light mt-5" test="test" style={{height:"100vh"}}>
                        {this.props.children} 
                  </main>
                 
                  <footer className="bg-secondary footer " >Footer</footer>  
               
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