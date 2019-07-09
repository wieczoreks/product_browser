import React, {Component} from 'react';
import Auxx from '../../hoc/Auxx';
import classes from "./CategorySummary.module.css"

class CategorySummary extends Component {
 constructor(props){
   super(props);
   
   this.state={
    
    category:{
        
        id:this.props.category.id,
        name:this.props.category.name,
        cid:this.props.category.cid,
        url:this.props.category.url,
        
    },
    notification:false,
    message:"",
    
     
  }
 }
 categoryUpdateHandler = (e) =>{
  const cat = {...this.state.category}
  
 switch(e.target.id){
 
    case "catName":
        cat.name= e.target.value
        this.setState({category:cat});
        break;
    case "catCID":
         cat.cid= e.target.value
         this.setState({category:cat});
        break;
    case "catUrl":
         cat.url= e.target.value
         this.setState({category:cat});
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
     const cat = this.state.category
     this.notificationHandler(`${cat.cid} updated`); 
     setTimeout(()=>{
       this.props.updateCategorySubmitHandler(cat,this.props.str,this.props.lan);
       this.props.timesHandler()
       
  },3000)  
  
   }
deleteCategory = ()=>{
  const cat = this.state.category
  
  this.notificationHandler(`${cat.cid} deleted`);
  setTimeout(() => {
  this.props.deleteCategoryHandler(cat,this.props.str,this.props.lan)
  this.props.timesHandler()
  
},3000)  

}

 render(){
  
  

  let message = this.state.message
     return (
      <Auxx className="card">
        <div>
            <div className="form-group d-flex justify-content-end">
              {
                this.state.notification ? <div className={classes.Notification + " d-flex justify-content-center align-items-center"} >Category <span className="font-weight-bold" > &nbsp;{` ${message} `}&nbsp; </span></div>:null
              }
            <span onClick={this.props.timesHandler}><i style={{color:"red"}} className="fas fa-times fa-2x"></i></span>
            </div>
            <div className="form-group d-flex flex-column align-items-start">
                        <label htmlFor="prodLan">Language version</label>
                        <select 
                          id="catLan" 
                          style={{width:"300px"}} 
                          className="form-control" 
                          onChange=  {this.productUpdateHandler}
                          value={this.props.lan}
                          disabled
                          >
                            <option value="English" >English</option>
                            <option value="German" >German</option>
                          </select>
                        
            </div>
  <div className="form-group d-flex flex-column align-items-start">
    <label htmlFor="catName">Category name</label>
    <input onChange={this.categoryUpdateHandler} type="text" className="form-control" id="catName"  value={this.state.category.name} / >
    
  </div>
  <div className="form-group d-flex flex-column align-items-start">
    <label htmlFor="catCID">Category CID</label>
    <input onChange={this.categoryUpdateHandler} type="text" className="form-control" id="catCID"  value={this.state.category.cid} / >
  </div>
  <div className="form-group d-flex flex-column align-items-start">
    <label htmlFor="catUrl">Category url</label>
    <input onChange={this.categoryUpdateHandler} type="text" className="form-control" id="catUrl"  value={this.state.category.url} / >
  </div>
  
  <div className="form-group d-flex justify-content-around">
    <button onClick={this.submitHandler} type="submit" className="btn btn-success">Update</button>
    <button onClick={this.deleteCategory} type="submit" className="btn btn-danger"><span><i className="fas fa-trash-alt m-2"></i></span>Delete</button>
  </div>
</div>
      </Auxx>
      );
 }
}
export default CategorySummary;
