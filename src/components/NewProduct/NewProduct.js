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
        prodLan:""
    }
    }
componentDidMount(){
  console.log("Component Did Mount [New Product]")
}

 newProductInputHandler = (e) =>{
   const prod = {
     ...this.state.product,
     subcategory:[...this.state.product.subcategory]
  }
   
   
  switch(e.target.id){
    case "prodLan":
      this.setState({prodLan:e.target.value});
      break;
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
          prodLan:"",
          name:"",
          cid:'',
          id:'',
          url:'',
          description:'',
          subcategory:[
            {name:'',url:''}
          ]
          
      },
      notification:false,
      message:""
  })
}

notificationHandler = (message) => {
 this.setState({ message:message, notification:true })
}

submitHandler = (e) => {
    e.preventDefault();
    const prod = this.state.product
    
    this.notificationHandler(`${this.state.product.cid}`); 
    setTimeout(()=>{
      this.props.newProductSubmitHandler(prod, this.state.prodLan);
      this.props.closedModal()
      this.clearHandler();
 },3000)  
 
  }

render(){
  let message = this.state.message
  console.log("Render [New Product]")
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
              <select 
              id="prodLan" 
              style={{width:"300px"}} 
              className="form-control" onChange=  {this.newProductInputHandler}>
                <option value="English" className="selected">English</option>
                <option value="German" >German</option>
              </select>
              
            </div>
            <div className="form-group d-flex flex-column align-items-start">
              <label htmlFor="prodName">Product name</label>
              <input onChange={this.newProductInputHandler} value={this.state.product.prodName} type="text" className="form-control" id="prodName" required / >
              
            </div>
          
            <div className="form-group d-flex flex-column align-items-start">
              <label htmlFor="prodCID">Product CID</label>
              <input onChange={this.newProductInputHandler} type="text" className="form-control" id="prodCID"  value={this.state.product.prodCID} required / >
            </div>
            <div className="form-group d-flex flex-column align-items-start">
              <label htmlFor="prodUrl">Product url</label>
              <input onChange={this.newProductInputHandler} type="text" className="form-control" id="prodUrl" value={this.state.product.prodUrl} required / >
            </div>
            <div className="form-group d-flex flex-column align-items-start">
              <label htmlFor="prodDescription">Product description</label>
              <input onChange={this.newProductInputHandler} type="text" className="form-control" id="prodDescription" value={this.state.product.prodDescription} required / >
            </div>
            <div className="form-group d-flex flex-column align-items-start">
              <label htmlFor="catName">Category name</label>
              <input onChange={this.newProductInputHandler} type="text" className="form-control" id="catName" value={this.state.product.catName}  required / >
            </div>
            <div className="form-group d-flex flex-column align-items-start">
              <label htmlFor="categoryUrl">Category url</label>
              <input onChange={this.newProductInputHandler} type="text" className="form-control" id="categoryUrl"  value={this.state.product.categoryUrl}  required/ >
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

