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
import * as actionsProd from '../../store/actions/index';
import DataControllers from '../../components/DataControllers/DataControllers';

class ProductBrowser extends Component {

    constructor(props){
        super(props)
        this.state = {
            firebaseLan:"English",
            product:null,
            modalClicked:false,
            newProdClicked:false,
            searchName:'',
            searchType:'',
            buttonArrList:[
              {lan:"EN", active:true, id:"catprodEN"},
              {lan:"DE", active:false, id:"catprodDE"}
              ],
        } 
    }

  //  componentDidUpdate(){
   
  //   if(this.state.loading===true && this.state.lan !== this.state.firebaseLan){ 
  //     if(this.state.lan==="German"){
  //       this.setState({
  //         lan:this.state.firebaseLan, 
  //         loading:false, 
  //         prodArr:this.props.prodArrDE, 
  //         })

  //     } else if(this.state.lan==="English"){
  //       this.setState({
  //         lan:this.state.firebaseLan, 
  //          loading:false, 
  //         prodArr:this.props.prodArrEN})
  //       }
  //   }
  //  }

    componentDidMount() {
      
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
   

    newProductSubmitHandler = (prod, lan) =>{
      let copyArr;
      if(lan==="English"){
        copyArr = [...this.props.prodArrEN];
        copyArr.push(prod);
        this.props.updateProductArrEN(copyArr);
           
      }
      else if(lan==="German"){
        copyArr =[...this.props.prodArrDE];
        copyArr.push(prod);
        this.props.updateProductArrDE(copyArr);
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
       this.props.updateProductArrEN(copyArr);
   
    }  else if(lan==="German"){
      copyArr = [...this.props.prodArrDE];
      copyArr.forEach( el => {
        if(el.id===prod.id){
            copyArr.splice(copyArr.indexOf(el),1);
        }                
    })
    this.props.updateProductArrDE(copyArr);
    }
  }
    
    updateProductSubmitHandler = (prod,lan) => {
       console.log(prod,lan," updateProductSubmitHandler")
       let copyArr;
        if(lan==="English"){
        copyArr = [...this.props.prodArrEN];
        copyArr.forEach( el => {
          if(el.id===prod.id){
              copyArr.splice(copyArr.indexOf(el),1);
              copyArr.push({...prod, id:prod.cid});
          }                
        })
        console.log( copyArr," copyArr updateProductSubmitHandler")
        this.props.updateProductArrEN(copyArr);
      }
      else if(lan==="German"){
        copyArr = [...this.props.prodArrDE];
        copyArr.forEach( el => {
          if(el.id===prod.id){
              copyArr.splice(copyArr.indexOf(el),1);
              copyArr.push({...prod, id:prod.cid});
          }                
      })
      this.props.updateProductArrDE(copyArr);
      }
        
       
    }
    searchProdHandler = (name,type) => {
        this.setState({searchName:name,searchBy:type})
    }

  
    
    buttonLanChangeHandler = (bu) => {
      
      this.setState({loading:true});

      let buttonArrList = [...this.state.buttonArrList];
     console.log(bu.lan,"bu.lan")
      switch(bu.lan){
        case "EN":
          buttonArrList=[
            {lan:"EN", active:true},
            {lan:"DE", active:false}
          ]
          this.setState(
            {
              buttonArrList:buttonArrList, 
              loading:false,
              firebaseLan:"English"}
            )
          break;
        case "DE":
          buttonArrList=[
          {lan:"EN", active:false},
          {lan:"DE", active:true}
          ]
          this.setState({
            buttonArrList:buttonArrList,   
            loading:false, 
            firebaseLan:"German" 
          })
        break;
      }

    }
  
    render(){ 
      console.log(this.state.firebaseLan,"firebaseLan",this.props.prodArrEN,"EN",this.props.prodArrDE,"DE");

        const {searchName } = this.state;
        let filteredProducts;

        if (this.state.firebaseLan==="English"){
          filteredProducts = this.props.prodArrEN;
        }else if (this.state.firebaseLan==="German"){
          filteredProducts = this.props.prodArrDE;
        }

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
                        lan={this.state.firebaseLan}
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
               
                <div className="d-flex flex-row">
                  <Search 
                      searchProdHandler={this.searchProdHandler}
                  />
                  <div className="d-flex justify-content-center align-items-center">
                  <DataControllers 
                    buttonLanChangeHandler={this.buttonLanChangeHandler}
                    buttonArrList={this.state.buttonArrList} />
                    <span onClick={this.newProdHandler} ><i className="fas fa-plus-circle fa-2x"></i></span>
                  </div>
                  
                </div>
                {this.props.loading ? this.props.error?<p>Server error. Please refresh the page</p>:<Spinner /> :
                  <Auxx>
                    <Products 
                      productEditHandler={this.productEditHandler}
                      lan={this.state.firebaseLan}
                      prodArr={filteredProducts}/>
                      
                    <Pagination />
                  </Auxx>}

      </Auxx>
      );
    }
}
 
const mapStateToProps = (state) => {

  return {
   
    prodArrEN:state.reducerProd.prodArrEN,
    prodArrDE:state.reducerProd.prodArrDE,
    loading:state.reducerProd.loading,
    error:state.reducerProd.error
  }

}
const mapDispatchToProps = (dispatch) => {

return {
    getArrEN:     ()=> dispatch(actionsProd.syncProdEN()),
    getArrDE:     ()=> dispatch(actionsProd.syncProdDE()),
    updateProductArrEN: (arr, prod) => dispatch(actionsProd.syncUpdateProdArrEN( arr, prod ) ),
    updateProductArrDE: (arr, prod) => dispatch(actionsProd.syncUpdateProdArrDE( arr, prod) )
}

}

export default connect(mapStateToProps,mapDispatchToProps )(withErrorHandler(ProductBrowser,axios));