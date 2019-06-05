import React from 'react';
import Auxx from '../../hoc/Auxx';

const Layout = (props) => {
 
     return (
      <Auxx>
            <div className="p-4 bg-secondary">Toolbar,Sidedrawer,Backdrop
            </div>
            <main className="p-3 bg-light">                 {props.children} 
            </main>
            <footer className="p-4 bg-secondary">Footer
            </footer>   
      </Auxx>
      );
}
 
export default Layout;