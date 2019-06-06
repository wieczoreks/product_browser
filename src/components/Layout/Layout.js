import React, {Component} from 'react';
import Auxx from '../../hoc/Auxx';
import ToolbarAlt from '../../components/Navigation/ToolbarAlt/ToolbarAlt';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

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
                        <ToolbarAlt clicked={this.expandToolbarMenuHandler} />
                        <SideDrawer 
                              open={this.state.showSideDrawer} 
                              closed ={this.sideDrawerClosedHandler} />
                  </div>
                  <main className="p-3 bg-light mt-5">
                        {this.props.children} 
                  </main>
                  <footer className="p-4 bg-secondary">Footer</footer>   
            </Auxx>
            );
      }
}
 
export default Layout;