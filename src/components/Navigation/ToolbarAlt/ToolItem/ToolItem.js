import React from 'react';
import classes from './ToolItem.module.css';
const ToolItem = (props) => {
 
     return (
        <li className={classes.ToolItem}>
        <a 
        href={props.link}
        className={props.active ? classes.active:null}>{props.children}</a>
    </li>
      );
}
 
export default ToolItem;