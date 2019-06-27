import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Layout from "./components/Layout/Layout";
import ProductBrowser from "./containers/ProductBrowser/ProductBrowser";
import { BrowserRouter } from 'react-router-dom';
import {Route} from 'react-router-dom';
import About from './components/About/About';
import ProductDetails from './components/ProductDetails/ProductDetails'
import CategoryBrowser from './containers/CartegoryBrowser/CategoryBrowser';
import Data from './containers/Data/Data'

function App() {
  return (
  <BrowserRouter>
    <div className=" container-fluid text-center">
     <Layout>
        <Route path="/" exact component={About} />
        <Route path="/about" exact component={About} />
        <Route path="/data" exact component={Data} />
        <Route path="/products" exact component={ProductBrowser} />
        <Route path="/categories" exact component={CategoryBrowser} />
        <Route path="/en/products/:id/" exact component={ProductDetails} />
        <Route path="/de/products/:id/" exact component={ProductDetails} />
     </Layout>
    </div>
  </BrowserRouter>
  ); 
}

export default App;
