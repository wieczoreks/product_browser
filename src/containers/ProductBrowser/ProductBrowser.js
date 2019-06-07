import React, {Component} from 'react';
import Auxx from '../../hoc/Auxx'; 
import {products} from '../../assets/products';
import Pagination from "../../components/Pagination/Pagination";
import Products from "../../components/Products/Products";
import Search from "../../components/Search/Search";
import Modal from "../../UI/Modal/Modal";
import ProductSummary from "../../components/ProductSummary/ProductSummary";
import NewProduct from "../../components/NewProduct/NewProduct";
import axios from 'axios'

class ProductBrowser extends Component {
 
    constructor(props){
        super(props)
        this.state = {
            prodArr: products,
            product:null,
            modalClicked:false,
            newProdClicked:false,
            searchName:'',
            searchType:''
        } 
    }
   
    componentDidMount(){
      axios.get("https://jsonplaceholder.typicode.com/users").then((data)=>console.log(data.data))
    }

    modalClosedNewProductHandler = () => {
        
        this.setState({newProdClicked:false});
    }
    modalClosedProductSummaryHandler = () => {
        
      this.setState({modalClicked:false});
  }
    productEditHandler = (el) => {

        this.setState({product:el, modalClicked:true})
    }

    newProdHandler = () => {
        this.setState({ newProdClicked:true})
    }

    newProductSubmitHandler = (prod) =>{
       
        const newProd = {
            "name": prod.prodName,
            "cid":prod.prodCID,   
            "url":prod.prodUrl, 
            "description": prod.prodDescription, 
            "subcategory": [
              { "name": prod.catName, "url": prod.categoryUrl }
            ]
        } 
        const copyArr =[...this.state.prodArr];
        copyArr.push(newProd)
             this.setState({
                prodArr:copyArr
             })
             
    }
    deleteProductHandler = (cid) =>{
        this.backdropModalTimesHandler()
        const copyArr = [...this.state.prodArr];
      
        copyArr.forEach( el => {
            if(el.cid==cid){
                copyArr.splice(copyArr.indexOf(el),1)
            }                
        })
        this.setState({prodArr:copyArr})
    } 
    
    updateProductSubmitHandler=(prod) => {
       console.log("update in progress, prod; ", prod);
       const copyArr = [...this.state.prodArr];
       const updatedProd = {
        "name": prod.prodName,
        "cid":prod.prodCID,   
        "url":prod.prodUrl, 
        "description": prod.prodDescription, 
        "subcategory": [
          { "name": prod.catName, "url": prod.categoryUrl }
        ]
        } 
        console.log("update in progress, prod; ", prod);
        copyArr.forEach( el => {
            if(el.cid==prod.prodCID){
                console.log("inside if")
                copyArr.splice(copyArr.indexOf(el),1);
                copyArr.push(updatedProd);
            }                
        })
        this.setState({prodArr:copyArr})
    }
    searchProdHandler = (name,type) => {
       
        this.setState({searchName:name,searchBy:type})
       
    }

    render(){ 
        const {prodArr,searchName } = this.state;
        let filteredProducts = prodArr
        
        if(searchName.length>0){
           switch(this.state.searchBy){
              case "name":
              filteredProducts = prodArr.filter( el => {
                return el.name.toLowerCase().includes(searchName.toLowerCase())      
              });
              break;
              case "cid":
              filteredProducts = prodArr.filter( el => {
                return el.cid.toLowerCase().includes(searchName.toLowerCase())      
              });
              break;
              case "category":
              filteredProducts = prodArr.filter( el => {
                return el.subcategory[0].name.toLowerCase().includes(searchName.toLowerCase())      
              });
              
           }
            
          }
     return (
      <Auxx> 
            
            <Modal show={this.state.newProdClicked} clicked={this.modalClosedNewProductHandler}>
                    <NewProduct 
                        newProductSubmitHandler={this.newProductSubmitHandler}
                        closedModal={this.modalClosedNewProductHandler}
                        />
                </Modal>

                <Modal show={this.state.modalClicked} clicked={this.modalClosedProductSummaryHandler}>
                    {this.state.modalClicked ?
                    <ProductSummary 
                        product={this.state.product}
                        timesHandler={this.modalClosedProductSummaryHandler}
                        deleteProductHandler={this.deleteProductHandler}
                        updateProductSubmitHandler={this.updateProductSubmitHandler}
                        />
                    :null}
                </Modal>
                
                
                <Search 
                    newProdHandler={this.newProdHandler}
                    searchProdHandler={this.searchProdHandler}
                    />
                <Products 
                productEditHandler={this.productEditHandler} 
                prodArr={filteredProducts}/>

                < Pagination /> 

      </Auxx>
      );
    }
}
 
export default ProductBrowser;