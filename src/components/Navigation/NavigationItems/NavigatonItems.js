import React from 'react';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';
import classes from "./NavigationItems.module.css";
    

const NavigationItems = (props) => {
 
return (
    
        <ul className={classes.NavigationItemsUL}>
            <NavigationItem link="/about">About</NavigationItem>
            {props.authFlag?<NavigationItem link="/products">Products</NavigationItem>:null}
            {props.authFlag?<NavigationItem link="/categories">Categories</NavigationItem>:null}
            {props.authFlag?<NavigationItem link="/data">Data</NavigationItem>:null}
             {props.authFlag
                ?<NavigationItem link="/logout">Log out</NavigationItem>
                :<NavigationItem link="/login">Login</NavigationItem>}
        </ul>
    
);
}
 
export default NavigationItems;