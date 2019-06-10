import React from 'react';
import Logo from '../Logo/Logo';
import Backdrop from '../../../UI/Backdrop/Backdrop'
import NavigationItems from '../NavigationItems/NavigatonItems';
import classes from './SideDrawer.module.css';
import Auxx from '../../../hoc/Auxx';


const SideDrawer = (props) => {
    
    let attachedClasses = [classes.SideDrawer,"bg-secondary",classes.Close]
    
    if(props.open){
        attachedClasses = [classes.SideDrawer,"bg-secondary",classes.Open]
    }
   
    return (
        <Auxx>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(" ")}> 
                <div className="mb-4">
                    <Logo width="50px" height="100%" />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
      </Auxx>
      );
}
 
export default SideDrawer;