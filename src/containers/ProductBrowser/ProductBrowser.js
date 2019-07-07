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
import {connect} from 'react-redux';
import * as actionsProd from '../../store/actions/index' 

class ProductBrowser extends Component {

    constructor(props){
        super(props)
        this.state = {
            
            lan:"English",
            firebaseLan:"English",
            product:null,
            modalClicked:false,
            newProdClicked:false,
            searchName:'',
            searchType:'',
            
        } 
    }

   componentDidUpdate(){
   
    if(this.state.loading===true && this.state.lan !== this.state.firebaseLan){ 
      if(this.state.lan==="German"){
        this.setState({
          lan:this.state.firebaseLan, 
          loading:false, 
          prodArr:this.props.prodArrEN, 
          })

      } else if(this.state.lan==="English"){
        this.setState({
          lan:this.state.firebaseLan, 
          loading:false, 
          prodArr:this.props.prodArrDE})
        }
    }
   }

    componentDidMount() {
      console.log("componentDidMount", "PRODUCT BROWSER")
      this.props.getArrEN();
      this.props.getArrDE();
    
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
   

    newProductSubmitHandler = (prod ,lan) =>{
    
      let copyArr;
      if(lan==="English"){
        copyArr = [...this.props.prodArrEN];
        copyArr.push(prod);
        this.setState({prodArr:copyArr, prodArrEN:copyArr});

        axios.post("/en/products.json", prod ).then(resp=>{
         }).catch(err => {
           this.setState({error:true})
         })    
      }

      else if(lan==="German"){
        copyArr =[...this.props.prodArrDE];
        copyArr.push(prod);
        this.setState({prodArr:copyArr, prodArrDE:copyArr});
        axios.post("/de/products.json", prod ).then(resp=>{
         }).catch(err => {
           this.setState({error:true})
         })   
      }

        
    }
    deleteProductHandler = (prod,lan) =>{

        let copyArr;
      
      if(lan==="English"){
        copyArr = [...this.props.prodArrEN];
        copyArr.forEach( el => {
          if(el.id===prod.id){
              copyArr.splice(copyArr.indexOf(el),1);
              
          }                
      })
   
        this.setState({prodArr:copyArr, prodArrEN:copyArr})
        axios.put('/en/products.json',copyArr).then(resp=>{
      }).catch( err => {
       this.setState({ error:true })
      })
   
    }  else if(lan==="German"){
      copyArr = [...this.props.prodArrDE];
      copyArr.forEach( el => {
        if(el.id===prod.id){
            copyArr.splice(copyArr.indexOf(el),1);
        }                
    })
    this.setState({prodArr:copyArr, prodArrDE:copyArr})
    axios.put('/de/products.json',copyArr).then(resp=>{
      } ).catch( err => {
        this.setState({ error:true })
      })
    }
  }
    
    updateProductSubmitHandler = (prod,lan) => {
       
       let copyArr = [...this.props.prodArr];
      if(lan==="English"){
        copyArr = [...this.props.prodArrEN];
        copyArr.forEach( el => {
          if(el.id===prod.id){
              copyArr.splice(copyArr.indexOf(el),1);
              copyArr.push(prod);
          }                
        })

      this.setState({prodArr:copyArr, prodArrEN:copyArr})
      axios.put('/en/products.json',copyArr).then(resp=>{
        } ).catch( err => {
          this.setState({ error:true })
        })
      }
      else if(lan==="German"){
        copyArr = [...this.props.prodArrDE];
        copyArr.forEach( el => {
          if(el.id===prod.id){
              copyArr.splice(copyArr.indexOf(el),1);
              copyArr.push(prod);
          }                
      })
      this.setState({prodArr:copyArr, prodArrDE:copyArr})
      axios.put('/de/products.json',copyArr).then(resp=>{
        } ).catch( err => {
          this.setState({ error:true })
        })
      }
        
       
    }
    searchProdHandler = (name,type) => {
        this.setState({searchName:name,searchBy:type})
    }

    passLanguageHandlar = (inputVal) => {
      
      this.setState({firebaseLan:inputVal, loading:true})
  
    }
    

    render(){ 
      
        const {searchName } = this.state;

        let filteredProducts = this.props.prodArr
        
        if(searchName.length>0){
           switch(this.state.searchBy){
              case "name":
              filteredProducts = filteredProducts.filter( el => {
                return el.name.toLowerCase().includes(searchName.toLowerCase())      
              });
              break;
              case "cid":
              filteredProducts = filteredProducts.filter( el => {
                return el.cid.toLowerCase().includes(searchName.toLowerCase())      
              });
              break;
              case "category":
              filteredProducts = filteredProducts.filter( el => {
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
                        lan={this.state.firebaseLan}
                        timesHandler={this.modalClosedProductSummaryHandler}
                        deleteProductHandler={this.deleteProductHandler}
                        updateProductSubmitHandler={this.updateProductSubmitHandler}
                        />
                    :null}
                </Modal>
                
                
                <Search 
                    newProdHandler={this.newProdHandler}
                    searchProdHandler={this.searchProdHandler}
                    passLanguageHandlar={this.passLanguageHandlar}
                    />
                {this.props.loading ? this.props.error?<p>Server error. Please refresh the page</p>:<Spinner /> :
                  <Auxx>
                    <Products 
                      productEditHandler={this.productEditHandler}
                      lan={this.state.lan}
                      prodArr={filteredProducts}/>
                      
                    <Pagination />
                  </Auxx>}

      </Auxx>
      );
    }
}
 
const mapStateToProps = (state) => {

  return {
    prodArr:state.reducerProd.prodArr,
    prodArrEN:state.reducerProd.prodArrEN,
    prodArrDE:state.reducerProd.prodArrDE,
    loading:state.reducerProd.loading,
    error:state.reducerProd.error
  }

}
const mapDispatchToProps = (dispatch) => {

return {
    getArrEN:()=> dispatch(actionsProd.syncProdEN()),
    getArrDE:()=> dispatch(actionsProd.syncProdDE()),
    addProdEN:(prod)=> dispatch(actionsProd.addProdEN(prod))
}

}

export default connect(mapStateToProps,mapDispatchToProps )(withErrorHandler(ProductBrowser,axios));