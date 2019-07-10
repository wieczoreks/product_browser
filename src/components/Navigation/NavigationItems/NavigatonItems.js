import React from 'react';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';
import classes from "./NavigationItems.module.css";
    

const NavigationItems = (props) => {
 
return (
    
        <ul className={classes.NavigationItemsUL}>
            <NavigationItem link="/products">Products</NavigationItem>
            <NavigationItem link="/categories">Categories</NavigationItem>
            <NavigationItem link="/data">Data</NavigationItem>
            <NavigationItem link="/about">About</NavigationItem>
            <NavigationItem link="/auth">Authenticate</NavigationItem>
        </ul>
    
);
}
 
export default NavigationItems;