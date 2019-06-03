import React from 'react';
import Aux from '../../hoc/Aux';

const Layout = (props) => {
 
     return (
      <Aux>
            <div className="p-4 bg-secondary">Toolbar,Sidedrawer,Backdrop</div>
            <main className="p-3 bg-light"> {props.children} </main>
            <footer className="p-4 bg-secondary">Footer</footer>   
      </Aux>
      );
}
 
export default Layout;