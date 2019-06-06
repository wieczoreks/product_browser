import React from 'react';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';
import classes from "./NavigationItems.module.css";

const NavigationItems = (props) => {
 
return (
    
        <ul className={classes.NavigationItemsUL}>
            <NavigationItem link="/" active>Home</NavigationItem>
            <NavigationItem link="/">Products</NavigationItem>
            <NavigationItem link="/">Categories</NavigationItem>
            <NavigationItem link="/">Data</NavigationItem>
        </ul>
    
);
}
 
export default NavigationItems;