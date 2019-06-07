import React, {Component} from 'react';
import classes from "./Modal.module.css"; 
import Backdrop from '../Backdrop/Backdrop';
import Auxx from '../../hoc/Auxx';

class Modal extends Component {
  constructor(props){
    super(props)
  }
  shouldComponentUpdate(nextProps){
    if(this.props.show!==nextProps.show){
      return true
    }else {
      return false
    }
  }

  render(){
     return (
      <Auxx>
        <div className={classes.Modal} style={{transform:this.props.show?"translateY(0)":"translateY(-100vh)", opacity:this.props.show?"1":"0"}}>
            {this.props.children} 
        </div>
        <Backdrop show={this.props.show} clicked={this.props.clicked} />
      </Auxx>
     );
}
}
export default Modal;