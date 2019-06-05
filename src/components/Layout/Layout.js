import React from 'react';
import Auxx from '../../hoc/Auxx';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import ToolbarAlt from '../../components/Navigation/ToolbarAlt/ToolbarAlt';

const Layout = (props) => {
 
     return (
      <Auxx>
            <div className="bg-secondary">
                  <ToolbarAlt />
            </div>
            <main className="p-3 bg-light mt-5">
                  {props.children} 
            </main>
            <footer className="p-4 bg-secondary">Footer</footer>   
      </Auxx>
      );
}
 
export default Layout;