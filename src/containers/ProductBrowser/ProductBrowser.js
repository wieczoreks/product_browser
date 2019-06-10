import React, {Component} from 'react';
import Auxx from '../../hoc/Auxx'; 
import Pagination from "../../components/Pagination/Pagination";
import Products from "../../components/Products/Products";
import Search from "../../components/Search/Search";
import Modal from "../../UI/Modal/Modal";
import ProductSummary from "../../components/ProductSummary/ProductSummary";
import NewProduct from "../../components/NewProduct/NewProduct";
import axios from '../../axios-products';
import Spinner from '../../UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class ProductBrowser extends Component {

    constructor(props){
        super(props)
        this.state = {
            prodArr: [],
            lan:null,
            product:null,
            modalClicked:false,
            newProdClicked:false,
            searchName:'',
            searchType:'',
            loading:true,
            error: false
        } 
    }
   
    componentDidMount() {
      axios.get("/en.json").then((res)=>{
       
        let recArr = [];
        for(let key in res.data.products){
          recArr.push(res.data.products[key])
        }

      this.setState({
          prodArr:recArr,
          lan:res.data.lan,
          loading:false,
          
        })
      }).catch(err=>{
        this.setState({error:true})
      })
    }

    modalClosedNewProductHandler = () => {
        
        this.setState({newProdClicked:false});
    }
    modalClosedProductSummaryHandler = () => {
        
      this.setState({modalClicked:false});
  }
    productEditHandler = (el) => {
        console.log(el,"element")
        this.setState({product:el, modalClicked:true})
    }

    newProdHandler = () => {
        this.setState({ newProdClicked:true})
    }
   

    newProductSubmitHandler = (prod) =>{
       const LasteArrElem = this.state.prodArr[this.state.prodArr.length-1] 

        const newProd = {
          "id":LasteArrElem.id+1,
            "name": prod.prodName,
            "cid":prod.prodCID,   
            "url":prod.prodUrl, 
            "description": prod.prodDescription, 
            "subcategory": [
              { "name": prod.catName, "url": prod.categoryUrl }
            ]
        } 
        const copyArr =[...this.state.prodArr];
        copyArr.push(newProd);

             this.setState({
                prodArr:copyArr
             });
             
         axios.post("/en/products.json", newProd ).then(resp=>{
           
         }).catch(err => {
           this.setState({error:true})
         })    
    }
    deleteProductHandler = (prod) =>{

        const copyArr = [...this.state.prodArr];
        console.log(prod,"deleteProductHandler")
        console.log(copyArr,"deleteProductHandler")
   
        copyArr.forEach( el => {
            if(el.id===prod.id){
                copyArr.splice(copyArr.indexOf(el),1)
            }                
        })
        console.log("array",copyArr);
        this.setState({prodArr:copyArr})
        axios.put('/en/products.json',copyArr).then(resp=>
          {
 
          } ).catch(err=>{
            this.setState({error:true})
          })
        
    } 
    
    updateProductSubmitHandler = (prod) => {
       
       const copyArr = [...this.state.prodArr];
       const updatedProd = {
         "id":prod.prodId,
        "name": prod.prodName,
        "cid":prod.prodCID,   
        "url":prod.prodUrl, 
        "description": prod.prodDescription, 
        "subcategory": [
          { "name": prod.catName, "url": prod.categoryUrl }
        ]
        } 
        
        copyArr.forEach( el => {
            if(el.id===prod.prodId){
               
                copyArr.splice(copyArr.indexOf(el),1);
                copyArr.push(updatedProd);
            }                
        })
        this.setState({prodArr:copyArr})
        axios.put('/en/products.json',copyArr).then(resp=>
         {

         } ).catch(err=>{
           this.setState({error:true})
         })
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
              break;
              default:
                break;
              
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
                {this.state.loading ? this.state.error?<p>Server error. Please refresh the page</p>:<Spinner /> :
                  <Auxx>
                    <Products 
                      productEditHandler={this.productEditHandler}
                      prodArr={filteredProducts}/>
                    <Pagination />
                  </Auxx>}

      </Auxx>
      );
    }
}
 
export default withErrorHandler(ProductBrowser,axios);