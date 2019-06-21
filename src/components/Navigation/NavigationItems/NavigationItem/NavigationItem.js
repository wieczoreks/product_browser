import React from 'react';
import classes from './NavigationItem.module.css';
import {NavLink} from 'react-router-dom'

const NavigationItem = (props) => {
  
     return (
        <li className={classes.NavigationItem}>
        <NavLink 
        exact 
        activeClassName="my-active"
        activeStyle={{
          color: "white", boxSizing: "border-box", display: "block"
        }}
        to = {{
          pathname:props.link
        }}

        >{props.children}</NavLink>
        </li>
      );
}
 
export default NavigationItem;