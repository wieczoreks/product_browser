import React, {Component} from 'react';
import Auxx from '../../hoc/Auxx'; 
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
            prodArr: [
                {
                  "name": "PME120",
                  "cid":"9AAC204083", 
                  "url": "http://new.abb.com/products/measurement-products/actuators/electrical-actuators/rotary-actuators/pme120-electrical-rotary-actuator", 
                  "description": "Rated torque 100 Nm (80 lbf-ft)", 
                  "subcategory": [
                    { "name": "Rotary Actuators<b></b>", "url": "http://new.abb.com/products/measurement-products/actuators/electrical-actuators/rotary-actuators" }
                  ]
                },
                {
                  "name": "RHD250",
                  "cid":"9AAC204314",  
                  "url": "http://new.abb.com/products/measurement-products/actuators/electrical-actuators/rotary-actuators/rhd250-electrical-rotary-actuator", 
                  "description": "Rated torque 250 Nm (200 lbf-ft)", 
                  "subcategory": [
                    { "name": "Rotary Actuators<b></b>", "url": "http://new.abb.com/products/measurement-products/actuators/electrical-actuators/rotary-actuators" }
                  ]
                },
                {
                  "name": "RHD500", 
                  "cid":"9AAC204317",  
                  "url": "http://new.abb.com/products/measurement-products/actuators/electrical-actuators/rotary-actuators/rhd500-rhd800-electrical-rotary-actuator", 
                  "description": "Rated torque 500 Nm (400 lbf-ft)", 
                  "subcategory": [
                    { "name": "Rotary Actuators<b></b>", "url": "http://new.abb.com/products/measurement-products/actuators/electrical-actuators/rotary-actuators" }
                  ]
                },
                {
                  "name": "RHD800", 
                  "cid":"9AAC204318",  
                  "url": "http://new.abb.com/products/measurement-products/actuators/electrical-actuators/rotary-actuators/rhd500-rhd800-electrical-rotary-actuator", 
                  "description": "Rated torque 800 Nm (600 lbf-ft)", 
                  "subcategory": [
                    { "name": "Rotary Actuators<b></b>", "url": "http://new.abb.com/products/measurement-products/actuators/electrical-actuators/rotary-actuators" }
                  ]
                },
                {
                  "name": "RHD1250", 
                  "cid":"9AAC204312",  
                  "url": "http://new.abb.com/products/measurement-products/actuators/electrical-actuators/rotary-actuators/rhd1250-rhd2500-electrical-rotary-actuator", 
                  "description": "Rated torque 1250 Nm (1000 lbf-ft)", 
                  "subcategory": [
                    { "name": "Rotary Actuators<b></b>", "url": "http://new.abb.com/products/measurement-products/actuators/electrical-actuators/rotary-actuators" }
                  ]
                },
                {
                  "name": "RHD2500",
                  "cid":"9AAC204315",   
                  "url": "http://new.abb.com/products/measurement-products/actuators/electrical-actuators/rotary-actuators/rhd1250-rhd2500-electrical-rotary-actuator", 
                  "description": "Rated torque 2500 Nm (1900 lbf-ft)", 
                  "subcategory": [
                    { "name": "Rotary Actuators<b></b>", "url": "http://new.abb.com/products/measurement-products/actuators/electrical-actuators/rotary-actuators" }
                  ]
                },
                {
                  "name": "RHD4000", 
                  "cid":"9AAC204316",  
                  "url": "http://new.abb.com/products/measurement-products/actuators/electrical-actuators/rotary-actuators/rhd4000-electrical-rotary-actuator", 
                  "description": "Rated torque 4000 Nm (3000 lbf-ft)", 
                  "subcategory": [
                    { "name": "Rotary Actuators<b></b>", "url": "http://new.abb.com/products/measurement-products/actuators/electrical-actuators/rotary-actuators" }
                  ]
                },
                {
                  "name": "RHD8000", 
                  "cid":"9AAC204319",  
                  "url": "http://new.abb.com/products/measurement-products/actuators/electrical-actuators/rotary-actuators/rhd8000-electrical-rotary-actuator", 
                  "description": "Rated torque 8000 Nm (6000 lbf-ft)", 
                  "subcategory": [
                    { "name": "Rotary Actuators<b></b>", "url": "http://new.abb.com/products/measurement-products/actuators/electrical-actuators/rotary-actuators" }
                  ]
                },
                {
                  "name": "RHD16000", 
                  "cid":"9AAC204313",  
                  "url": "http://new.abb.com/products/measurement-products/actuators/electrical-actuators/rotary-actuators/rhd16000-electrical-rotary-actuator", 
                  "description": "Rated torque 16000 Nm (12000 lbf-ft)", 
                  "subcategory": [
                    { "name": "Rotary Actuators<b></b>", "url": "http://new.abb.com/products/measurement-products/actuators/electrical-actuators/rotary-actuators" }
                  ]
                },
                {
                  "name": "RHDE250",
                  "cid":"9AAC210832",   
                  "url": "http://new.abb.com/products/measurement-products/actuators/electrical-actuators/rotary-actuators/rhde250-electrical-rotary-actuator", 
                  "description": "Rated torque 250 Nm (200 lbf-ft), Explosion-proof version", 
                  "subcategory": [
                    { "name": "Rotary Actuators<b></b>", "url": "http://new.abb.com/products/measurement-products/actuators/electrical-actuators/rotary-actuators" }
                  ]
                }
              ],
            product:null,
            modalClicked:false,
            newProdClicked:false,
            searchName:'',
            searchType:''
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
            
          <Modal show={this.state.modalClicked} clicked={this.backdropModalTimesHandler}>
                {this.state.modalClicked ?
                <ProductSummary 
                    product={this.state.product}
                    timesHandler={this.backdropModalTimesHandler}
                    deleteProductHandler={this.deleteProductHandler}
                    updateProductSubmitHandler={this.updateProductSubmitHandler}
                     />
                :null}

            </Modal>
            
            <Modal show={this.state.newProdClicked} clicked={this.backdropModalTimesHandler}>
                <NewProduct 
                    newProductSubmitHandler={this.newProductSubmitHandler}
                    timesNewProductHandler={this.backdropModalTimesHandler}
                     />
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