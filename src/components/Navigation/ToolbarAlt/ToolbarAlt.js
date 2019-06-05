import React from 'react';
import classes from "./ToolbarAlt.module.css";
import Logo from '../Logo/Logo';

const ToolbarAlt = (props) => {
 
return (
<header className={["d-flex bg-secondary fixed justify-content-between align-items-center",classes.ToolbarAlt].join(" ")}>
        <div>Menu</div>
        <Logo />
        <nav >
            <ul className={classes.uList}>
                <li className="">
                    <a href="#">Home</a>
                </li>
                <li>
                    <a href="#">Products</a>
                </li>
                <li>
                    <a href="#">Categories</a>
                </li>
                <li>
                    <a href="#">Data</a>
                </li>
            </ul>
        </nav>
    </header>    
);
}
 
export default ToolbarAlt;