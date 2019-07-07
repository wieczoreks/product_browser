import React,{Component, Suspense} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Layout from "./components/Layout/Layout";
//import ProductBrowser from "./containers/ProductBrowser/ProductBrowser";
import { BrowserRouter } from 'react-router-dom';
import {Route,Switch, Redirect} from 'react-router-dom';
import About from './components/About/About';
import ProductDetails from './components/ProductDetails/ProductDetails'
//import CategoryBrowser from './containers/CartegoryBrowser/CategoryBrowser';
import Data from './containers/Data/Data';
import FourOFour from './components/FourOFour/FourOFour';
//import MicroTool from './components/MicroTool/MicroTool';
import asyncComponent from './hoc/AsyncComponent/AsyncComponent';


const CategoryBrowser = React.lazy(()=>{
  return import("./containers/CartegoryBrowser/CategoryBrowser")
});

const AsyncNewProductBrowser = asyncComponent(()=>{
  return import("./containers/ProductBrowser/ProductBrowser")
})

function App() {
  return (
  <BrowserRouter>
    <div className=" container-fluid text-center">
     <Layout >
       <Switch>
          
          <Route path="/about" exact render={About} />
          <Route path="/data" exact component={Data} />
          <Route path="/products" exact component={AsyncNewProductBrowser} />
          <Route path="/categories" exact render={()=><Suspense fallback={<div>Loading...</div>}><CategoryBrowser /></Suspense>} />
          <Route path="/en/products/:id/" exact component={ProductDetails} />
          <Route path="/de/products/:id/" exact component={ProductDetails} />
          <Redirect from="/" to="/about" />
          <Route component={FourOFour} />
          {/*<Redirect from="/" to="/about" />*/}
        </Switch>
     </Layout>
    </div>
  </BrowserRouter>
  ); 
}

export default App;
