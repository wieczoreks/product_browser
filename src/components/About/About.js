import React from 'react';
 
const About = (props) => {
 console.log(props,"about")
     return (
      <div className="container"> 
        <h1>Main purpose</h1>
        <p className="lead">Application intended for Level of 3 Application Specialists. The goal of application is to simplify the process of updating products and categories for Measurement and Analytics. The assumption is to avoid using excells to update products and categories</p>
      </div>
      );
}
 
export default About;