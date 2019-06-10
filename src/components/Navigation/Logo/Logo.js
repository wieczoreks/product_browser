import React from 'react';
import image from '../../../assets/abb_red.png';

const Logo = (props) => {
 
return (

<div className="ml-2">
    <img src={image} width={props.width} height={props.height} alt="logo"/>
</div>

);
}
 
export default Logo;