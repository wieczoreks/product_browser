import React from 'react';
import classes from "./ToolbarAlt.module.css";
import Logo from '../Logo/Logo';
import ToolItem from './ToolItem/ToolItem';
const ToolbarAlt = (props) => {
 
return (
<header className={["d-flex bg-secondary fixed justify-content-between align-items-center",classes.ToolbarAlt].join(" ")}>
        <div>Menu</div>
        <Logo width="50px" height="100%"/>
        <nav >
            <ul className={classes.uList}>
                <ToolItem link="/" active>Home</ToolItem>
                <ToolItem link="/">Products</ToolItem>
                <ToolItem link="/">Categories</ToolItem>
                <ToolItem link="/">Data</ToolItem>
            </ul>
        </nav>
    </header>    
);
}
 
export default ToolbarAlt;