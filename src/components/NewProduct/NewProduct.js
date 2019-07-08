import React, {Component} from 'react';
import Auxx from '../../hoc/Auxx';
import classes from './NewProduct.module.css';

class NewProduct extends Component {
 
    constructor(props){
        super(props)
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
        
    }
    }
componentDidMount(){
  console.log(this.props.lan,"DID MOUNT newProduct")
  
  this.clearHandler()
}

 newProductInputHandler = (e) =>{
   const prod = {
     ...this.state.product,
     subcategory:[...this.state.product.subcategory]
  }
   
   
  switch(e.target.id){
    
    case "prodName":
      prod.name= e.target.value
      this.setState({product:prod});
      break;
      case "prodCID":
          prod.cid= e.target.value
          prod.id= e.target.value
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
 
  clearHandler = () => {
     this.setState({
      product:{  
          name:"",
          id:'',
          cid:'',
          url:'',
          description:'',
          subcategory:[
            {
              name:'',
              url:''
            }
          ] 
      },
      notification:false,
      message:"",
     
  })
}

notificationHandler = (message) => {
 this.setState({ message:message, notification:true })
}

submitHandler = (e) => {
    e.preventDefault();
    const prod = this.state.product
    console.log(prod,this.props.lan,"NEWPRODUCT SUBMIT")
    this.notificationHandler(`${prod.cid}`); 
    setTimeout(()=>{
      this.props.newProductSubmitHandler(prod, this.props.lan);
      this.props.closedModal()
      this.clearHandler();
 },3000)  
 
  }

render(){
  let message = this.state.message
  
  let options;
  if(this.props.lan==="German"){
   
   options= (<select 
   id="prodLan" 
   style={{width:"300px"}} 
   className="form-control" 
   onChange=  {this.newProductInputHandler}
   value={this.props.lan}
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
     onChange=  {this.newProductInputHandler}
     value={this.props.lan}
     disabled
     >
       <option  value="English">English</option>
       <option  value="German" >German</option>
     </select>)
  }
     return (
      <Auxx className="card">
        <form>
            <div className="form-group d-flex justify-content-end ml-5">
              {
                this.state.notification ? <div className={classes.Notification + " d-flex justify-content-center align-items-center"} >Product <span className="font-weight-bold" > &nbsp;{` ${message} `}&nbsp; </span> added</div>:null
              }
            <span onClick={this.props.closedModal}><i style={{color:"red"}} className="fas fa-times fa-2x"></i></span>
            </div>
            <div className="form-group d-flex flex-column align-items-start">
              <label htmlFor="prodLan">Language version</label>
              {options}
              
            </div>
            <div className="form-group d-flex flex-column align-items-start">
              <label htmlFor="prodName">Product name</label>
              <input onChange={this.newProductInputHandler} value={this.state.product.name} type="text" className="form-control" id="prodName" required / >
              
            </div>
          
            <div className="form-group d-flex flex-column align-items-start">
              <label htmlFor="prodCID">Product CID</label>
              <input onChange={this.newProductInputHandler} type="text" className="form-control" id="prodCID"  value={this.state.product.cid} required / >
            </div>
            <div className="form-group d-flex flex-column align-items-start">
              <label htmlFor="prodUrl">Product url</label>
              <input onChange={this.newProductInputHandler} type="text" className="form-control" id="prodUrl" value={this.state.product.url} required / >
            </div>
            <div className="form-group d-flex flex-column align-items-start">
              <label htmlFor="prodDescription">Product description</label>
              <input onChange={this.newProductInputHandler} type="text" className="form-control" id="prodDescription" value={this.state.product.description} required / >
            </div>
            <div className="form-group d-flex flex-column align-items-start">
              <label htmlFor="catName">Category name</label>
              <input onChange={this.newProductInputHandler} type="text" className="form-control" id="catName" value={this.state.product.subcategory[0].name}  required / >
            </div>
            <div className="form-group d-flex flex-column align-items-start">
              <label htmlFor="categoryUrl">Category url</label>
              <input onChange={this.newProductInputHandler} type="text" className="form-control" id="categoryUrl"  value={this.state.product.subcategory[0].url}  required/ >
            </div>
            <div className="form-group d-flex justify-content-around">
              <button onClick={this.submitHandler} type="submit" className="btn btn-success">Add</button>
              <button onClick={this.clearHandler} className="btn btn-danger">Clear</button>
            </div>
</form>
      </Auxx>
      );
 }
}
 
export default NewProduct;

