import React, {Component} from 'react';
import Auxx from '../../hoc/Auxx';
import classes from "./ProductSummary.module.css"

class ProductSummary extends Component {
 constructor(props){
   super(props);
   this.state={
    product:{
        
        name:"",
        id:'',
        cid:'',
        url:'',
        description:'',
        subcategory:[
          {name:'',url:''}
        ]
        
    },
    notification:false,
    message:"",
    prodLan:""
}
 }

 componentDidMount(){
   this.setState({
    product:{
        
        id:this.props.product.id,
        name:this.props.product.name,
        cid:this.props.product.cid,
        url:this.props.product.url,
        description:this.props.product.description,
        subcategory:[{
            name:this.props.product.subcategory[0].name,
            url:this.props.product.subcategory[0].url
          }
        ]
    },
    notification:false,
    message:"",
    
  })
 }
 productUpdateHandler = (e) =>{
  const prod = {...this.state.product}
  
 switch(e.target.id){
  
    
    case "prodName":
     prod.name= e.target.value
     this.setState({product:prod});
     break;
     case "prodCID":
         prod.cid= e.target.value
         
         this.setState({product:prod});
     break;
     case "prodUrl":
         prod.url= e.target.value
         this.setState({product:prod});
     break;
     case "prodDescription":
         prod.description= e.target.value
         this.setState({product:prod});
     break;
     case "catName":
         prod.subcategory[0].name= e.target.value
         this.setState({product:prod});
     break;
     case "categoryUrl":
         prod.subcategory[0].url= e.target.value
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
     this.notificationHandler(`${this.state.product.cid} updated`); 
     setTimeout(()=>{
       this.props.updateProductSubmitHandler(prod,this.props.lan);
       this.props.timesHandler()
       
  },3000)  
  
   }
deleteProduct = ()=>{
  const prod = this.state.product
  
  this.notificationHandler(`${prod.cid} deleted`);
  setTimeout(() => {
  this.props.deleteProductHandler(prod, this.props.lan)
  this.props.timesHandler()
  
},3000)  

}

 render(){
  console.log("Render [Products Summary]")
   let options;
   if(this.props.lan==="German"){
    
    options= (<select 
    id="prodLan" 
    style={{width:"300px"}} 
    className="form-control" 
    onChange=  {this.productUpdateHandler}
    value={this.state.prodLan}
    disabled
    >
      <option value="English" >English</option>
      <option value="German" >German</option>
    </select>)
   } else if(this.props.lan==="English") {
    
    options= (<select 
      id="prodLan" 
      style={{width:"300px"}} 
      className="form-control" 
      onChange=  {this.productUpdateHandler}
      value={this.state.prodLan}
      disabled
      >
        <option  value="English">English</option>
        <option  value="German" >German</option>
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
    <input onChange={this.productUpdateHandler} type="text" className="form-control" id="prodName"  value={this.state.product.name} / >
    
  </div>
  <div className="form-group d-flex flex-column align-items-start">
    <label htmlFor="prodCID">Product CID</label>
    <input onChange={this.productUpdateHandler} type="text" className="form-control" id="prodCID"  value={this.state.product.cid} / >
  </div>
  <div className="form-group d-flex flex-column align-items-start">
    <label htmlFor="prodUrl">Product url</label>
    <input onChange={this.productUpdateHandler} type="text" className="form-control" id="prodUrl"  value={this.state.product.url} / >
  </div>
  <div className="form-group d-flex flex-column align-items-start">
    <label htmlFor="prodDescription">Product description</label>
    <input onChange={this.productUpdateHandler} type="text" className="form-control" id="prodDescription"  value={this.state.product.description} / >
  </div>
  <div className="form-group d-flex flex-column align-items-start">
    <label htmlFor="catName">Category name</label>
    <input onChange={this.productUpdateHandler} type="text" className="form-control" id="catName" value={this.state.product.subcategory[0].name} / >
  </div>
  <div className="form-group d-flex flex-column align-items-start">
    <label htmlFor="catUrl">Category url</label>
    <input onChange={this.productUpdateHandler} type="text" className="form-control" id="catUrl"  value={this.state.product.subcategory[0].url} / >
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
