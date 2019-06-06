import React from 'react';
import classes from './Hamburger.module.css';

const Hamburger = (props) => {
 
return (
<div onClick={props.clicked} className={classes.Hamburger} >
     <div></div>
     <div></div>
     <div></div>
</div>
);
}
 
export default Hamburger;