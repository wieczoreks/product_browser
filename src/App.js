import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Layout from "./components/Layout/Layout";
import ProductBrowser from "./containers/ProductBrowser/ProductBrowser";

function App() {
  return (
    <div className=" container-fluid text-center">
     <Layout>
       <ProductBrowser />
     </Layout>
    </div>
  ); 
}

export default App;
