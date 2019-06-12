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
            prodArrEN:[],
            prodArrENLan:"",
            prodArrDE:[],
            prodArrDELan:"",
            lan:"English",
            firebaseLan:"English",
            product:null,
            modalClicked:false,
            newProdClicked:false,
            searchName:'',
            searchType:'',
            loading:true,
            error: false
        } 
    }

   componentDidUpdate(){
    
    if(this.state.loading===true && this.state.lan != this.state.firebaseLan){ 
      if(this.state.lan==="German"){
        this.setState({
          lan:this.state.firebaseLan, 
          loading:false, 
          prodArr:this.state.prodArrEN, 
          })

      }else if(this.state.lan==="English")
        this.setState({
          lan:this.state.firebaseLan, 
          loading:false, 
          prodArr:this.state.prodArrDE})
    }
   }

    componentDidMount() {
      
      axios.get("/en.json").then((res)=>{
        console.log(res.data,"CHECK")
        let recArr = [];
        for(let key in res.data.products){
          recArr.push(res.data.products[key])
        }
        this.setState({
          prodArr:recArr, 
          prodArrEN:recArr, 
          loading:false,
          prodArrENLan:res.data.lan})
      
      })
      axios.get("/de.json").then((res)=>{
      let recArr = [];
      for(let key in res.data.products){
        recArr.push(res.data.products[key])
      }
      this.setState({
        prodArrDE:recArr,
        loading:false,
        prodArrDELan:res.data.lan
      })
    
  })
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
      console.log(prod,prod.prodLan, "prod")
      const newProd = {
        "id":prod.prodCID,
        "name": prod.prodName,
        "cid":prod.prodCID,   
        "url":prod.prodUrl, 
        "description": prod.prodDescription, 
        "subcategory": [
          { "name": prod.catName, "url": prod.categoryUrl }
        ]
      } 
      let copyArr;
      if(prod.prodLan==="English"){
        copyArr = [...this.state.prodArrEN];
        copyArr.push(newProd);
        this.setState({prodArr:copyArr, prodArrEN:copyArr});
        axios.post("/en/products.json", newProd ).then(resp=>{
         }).catch(err => {
           this.setState({error:true})
         })    
      }

      else if(prod.prodLan=="German"){
        copyArr =[...this.state.prodArrDE];
        copyArr.push(newProd);
        this.setState({prodArr:copyArr, prodArrDE:copyArr});
        axios.post("/de/products.json", newProd ).then(resp=>{
         }).catch(err => {
           this.setState({error:true})
         })   
      }

        
    }
    deleteProductHandler = (prod) =>{

        const copyArr = [...this.state.prodArr];
        
   
        copyArr.forEach( el => {
            if(el.id===prod.prodId){
                copyArr.splice(copyArr.indexOf(el),1)
            }                
        })
      
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

         } ).catch( err => {
           this.setState({ error:true })
         })
    }
    searchProdHandler = (name,type) => {
       
        this.setState({searchName:name,searchBy:type})
           }
    passLanguageHandlar = (inputVal) => {
      this.setState({firebaseLan:inputVal, loading:true})
      console.log(inputVal,"lan passLanguageHandlar");
    }
    

    render(){ 
      console.log(this.state.prodArrDE,"render DE lan");
      console.log(this.state.prodArrEN,"render EN lan");
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
                    passLanguageHandlar={this.passLanguageHandlar}
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