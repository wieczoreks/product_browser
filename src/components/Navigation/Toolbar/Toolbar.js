import React from 'react';
import classes from './Toolbar.module.css';

const Toolbar = (props) => {
 
return (
    <header>
    <nav className="navbar navbar-expand-lg navbar-secondary bg-secondary">
        <div className="d-flex justify-content-center align-items-center">
            <a className={["nav-link", "navbar-brand", classes.Link].join(" ")} href="#">Logo</a>
            <span className="text-white">Product Browser</span>
        </div>
        
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a className={["nav-link", classes.Link].join(" ")} href="#">Home</a>
                </li>
                <li className="nav-item">
                    <a className={["nav-link", classes.Link].join(" ")} href="#">Products</a>
                </li>
                <li className="nav-item">
                    <a className={["nav-link", classes.Link].join(" ")} href="#">Categories</a>
                </li>
                <li className="nav-item">
                    <a className={["nav-link", classes.Link].join(" ")} href="#">Data</a>
                </li>
            </ul>
        </div>
    </nav>
    </header>
);
}
 
export default Toolbar;