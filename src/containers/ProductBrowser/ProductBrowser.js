import React, {Component} from 'react';
import Aux from '../../hoc/Aux'; 
import {products} from '../../assets/products';
import Pagination from "../../components/Pagination/Pagination";
import Products from "../../components/Products/Products";
import Search from "../../components/Search/Search";
import Modal from "../../UI/Modal/Modal";
import ProductSummary from "../../components/ProductSummary/ProductSummary";
import NewProduct from "../../components/NewProduct/NewProduct";

class ProductBrowser extends Component {
 
    constructor(props){
        super(props)
        this.state = {
            prodObj: products,
            product:null,
            modalClicked:false,
            newProdClicked:false,
        } 
    }
    backdropModalTimesHandler = () => {
        
        this.setState({modalClicked:false, newProdClicked:false});
    }
   
    productEditHandler = (el) => {
      
        this.setState({product:el, modalClicked:true})
    }

    newProdHandler = () => {
       
        this.setState({ newProdClicked:true})
    }
    newProductSubmitHandler=(prod)=>{
        console.log(prod,"test")
        this.backdropModalTimesHandler()
    }
    render(){ 
      

     return (
      <Aux> 
            
          <Modal show={this.state.modalClicked} clicked={this.backdropModalTimesHandler}>
                {this.state.modalClicked?<ProductSummary 
                    product={this.state.product}
                    timesHandler={this.backdropModalTimesHandler}
                     />:null}
            </Modal>
             
            <Modal show={this.state.newProdClicked} clicked={this.backdropModalTimesHandler}>
                <NewProduct newProductSubmitHandler={this.newProductSubmitHandler}
                    timesNewProductHandler={this.backdropModalTimesHandler}
                     />
            </Modal>

                <Search newProdHandler={this.newProdHandler}/>
                <Products productEditHandler={this.productEditHandler} prodObj={this.state.prodObj}/>
                < Pagination /> 

      </Aux>
      );
    }
}
 
export default ProductBrowser;