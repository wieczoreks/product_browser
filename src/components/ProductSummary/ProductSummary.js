import React, {Component} from 'react';
import Auxx from '../../hoc/Auxx';
import classes from "./ProductSummary.module.css"

class ProductSummary extends Component {
 constructor(props){
   super(props);
   this.state={
    product:{
        prodLan:this.props.lan,
        prodId:this.props.product.id,
        prodName:this.props.product.name,
        prodCID:this.props.product.cid,
        prodUrl:this.props.product.url,
        prodDescription:this.props.product.description,
        catName:this.props.product.subcategory[0].name,
        categoryUrl:this.props.product.subcategory[0].url
    },
    notification:false,
    message:"",
  }
 }
 productUpdateHandler = (e) =>{
  const prod = {...this.state.product}
  
 switch(e.target.id){
  
    case "prodLan":
     prod.prodLan= e.target.value
     this.setState({product:prod});
     break;
    case "prodName":
     prod.prodName= e.target.value
     this.setState({product:prod});
     break;
     case "prodCID":
         prod.prodCID= e.target.value
         this.setState({product:prod});
     break;
     case "prodUrl":
         prod.prodUrl= e.target.value
         this.setState({product:prod});
     break;
     case "prodDescription":
         prod.prodDescription= e.target.value
         this.setState({product:prod});
     break;
     case "catName":
         prod.catName= e.target.value
         this.setState({product:prod});
     break;
     case "categoryUrl":
         prod.categoryUrl= e.target.value
         this.setState({product:prod});
     break;
     default:
     return null
 }
}
 notificationHandler = (message) => {
  this.setState({ message:message, notification:true })
 }
 
 submitHandler = (e) => {
     e.preventDefault();
     const prod = this.state.product
     this.notificationHandler(`${this.state.product.prodCID} updated`); 
     setTimeout(()=>{
       this.props.updateProductSubmitHandler(prod);
       this.props.timesHandler()
       
  },3000)  
  
   }
deleteProduct = ()=>{
  const prod = this.state.product
  
  this.notificationHandler(`${prod.prodCID} deleted`);
  setTimeout(() => {
  this.props.deleteProductHandler(prod)
  this.props.timesHandler()
  
},3000)  

}

 render(){
  console.log("Render [Products Summary]")
   let options;
   if(this.state.product.prodLan==="German"){
    
    options= (<select 
    id="prodLan" 
    style={{width:"300px"}} 
    className="form-control" 
    onChange=  {this.productUpdateHandler}
    value={this.state.product.prodLan}
    >
      <option value="English" >English</option>
      <option value="German" >German</option>
    </select>)
   } else if(this.state.product.prodLan==="English") {
    
    options= (<select 
      id="prodLan" 
      style={{width:"300px"}} 
      className="form-control" 
      onChange=  {this.productUpdateHandler}
      value={this.state.product.prodLan}
      >
        <option value="English">English</option>
        <option value="German" >German</option>
      </select>)
   }

  let message = this.state.message
     return (
      <Auxx className="card">
        <div>
        <div className="form-group d-flex justify-content-end">
              {
                this.state.notification ? <div className={classes.Notification + " d-flex justify-content-center align-items-center"} >Product <span className="font-weight-bold" > &nbsp;{` ${message} `}&nbsp; </span></div>:null
              }
            <span onClick={this.props.timesHandler}><i style={{color:"red"}} className="fas fa-times fa-2x"></i></span>
            </div>
  <div className="form-group d-flex flex-column align-items-start">
              <label htmlFor="prodLan">Language version</label>
              {options}
              
  </div>
  <div className="form-group d-flex flex-column align-items-start">
    <label htmlFor="prodName">Product name</label>
    <input onChange={this.productUpdateHandler} type="text" className="form-control" id="prodName"  value={this.state.product.prodName} / >
    
  </div>
  <div className="form-group d-flex flex-column align-items-start">
    <label htmlFor="prodCID">Product CID</label>
    <input onChange={this.productUpdateHandler} type="text" className="form-control" id="prodCID"  value={this.state.product.prodCID} / >
  </div>
  <div className="form-group d-flex flex-column align-items-start">
    <label htmlFor="prodUrl">Product url</label>
    <input onChange={this.productUpdateHandler} type="text" className="form-control" id="prodUrl"  value={this.state.product.prodUrl} / >
  </div>
  <div className="form-group d-flex flex-column align-items-start">
    <label htmlFor="prodDescription">Product description</label>
    <input onChange={this.productUpdateHandler} type="text" className="form-control" id="prodDescription"  value={this.state.product.prodDescription} / >
  </div>
  <div className="form-group d-flex flex-column align-items-start">
    <label htmlFor="catName">Category name</label>
    <input onChange={this.productUpdateHandler} type="text" className="form-control" id="catName" value={this.state.product.catName} / >
  </div>
  <div className="form-group d-flex flex-column align-items-start">
    <label htmlFor="catUrl">Category url</label>
    <input onChange={this.productUpdateHandler} type="text" className="form-control" id="catUrl"  value={this.state.product.categoryUrl} / >
  </div>
  <div className="form-group d-flex justify-content-around">
    <button onClick={this.submitHandler} type="submit" className="btn btn-success">Update</button>
    <button onClick={this.deleteProduct} type="submit" className="btn btn-danger">Delete</button>
  </div>
</div>
      </Auxx>
      );
 }
}
export default ProductSummary;
