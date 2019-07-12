import React from 'react';
import classes from "./ToolbarAlt.module.css";
import Logo from '../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigatonItems';
import Hamburger from '../SideDrawer/Hamburger/Hamburger';

const ToolbarAlt = (props) => {
 
return (
<header className={classes.ToolbarAlt}>
            <Hamburger clicked={props.clicked} />
            <div className={classes.DesktopOnly} >
                <Logo width="50px" height="100%" />
            </div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems authFlag={props.authFlag} />
            </nav>
    </header>    
);
}
 
export default ToolbarAlt;