import React from 'react';
import Logo from '../Logo/Logo';
import ToolItem from '../ToolbarAlt/ToolItem/ToolItem';
import classes from './SideDrawer.module.css';


const SideDrawer = (props) => {
    


    return (
      <div className={[classes.SideDrawer,"bg-secondary"].join(" ")}> 
          <Logo width="50px" height="100%"/>
            <nav >
                <ul className={classes.uList}>
                    <ToolItem link="/" active>Home</ToolItem>
                    <ToolItem link="/">Products</ToolItem>
                    <ToolItem link="/">Categories</ToolItem>
                    <ToolItem link="/">Data</ToolItem>
                </ul>
            </nav>
      </div>
      );
}
 
export default SideDrawer;