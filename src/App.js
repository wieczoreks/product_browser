import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Layout from "./components/Layout/Layout";
import ProductBrowser from "./containers/ProductBrowser/ProductBrowser";
import { BrowserRouter } from 'react-router-dom';
import {Route} from 'react-router-dom';
import About from './components/About/About';

function App() {
  return (
  <BrowserRouter>
    <div className=" container-fluid text-center">
     <Layout>
      
        <Route path="/about" exact component={About} />
        <Route path="/products" exact component={ProductBrowser} />
       
     </Layout>
    </div>
  </BrowserRouter>
  ); 
}

export default App;
