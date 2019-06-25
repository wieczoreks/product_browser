import React, {Component} from 'react';
import Auxx from '../../hoc/Auxx';
import classes from "./CategorySummary.module.css"

class CategorySummary extends Component {
 constructor(props){
   super(props);
   
   this.state={
    
    category:{
        catStr:this.props.str,
        catLan:this.props.lan,
        catId:this.props.category.id,
        catName:this.props.category.name,
        catCID:this.props.category.cid,
        catUrl:this.props.category.url,
        
    },
    notification:false,
    message:"",
  }
 }
 categoryUpdateHandler = (e) =>{
  const cat = {...this.state.category}
  
 switch(e.target.id){
  
    case "catLan":
        cat.catLan= e.target.value
        this.setState({category:cat});
         break;
    case "catName":
        cat.catName= e.target.value
        this.setState({category:cat});
        break;
    case "catCID":
         cat.catCID= e.target.value
         this.setState({category:cat});
        break;
    case "catUrl":
         cat.catUrl= e.target.value
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
     
     this.notificationHandler(`${this.state.category.catCID} updated`); 
     setTimeout(()=>{
       this.props.updateCategorySubmitHandler(this.state.category);
       this.props.timesHandler()
       
  },3000)  
  
   }
deleteCategory = ()=>{
  const cat = this.state.category
  
  this.notificationHandler(`${cat.catCID} deleted`);
  setTimeout(() => {
  this.props.deleteCategoryHandler(cat)
  this.props.timesHandler()
  
},3000)  

}

 render(){
  
   let options;
   if(this.state.category.catLan==="German"){
    
    options= (<select 
    id="catLan" 
    style={{width:"300px"}} 
    className="form-control" 
    onChange=  {this.productUpdateHandler}
    value={this.state.category.catLan}
    disabled
    >
      <option value="English" >English</option>
      <option value="German" >German</option>
    </select>)
   } else if(this.state.category.catLan==="English") {
    
    options= (<select 
      id="catLan" 
      style={{width:"300px"}} 
      className="form-control" 
      onChange=  {this.categoryUpdateHandler}
      value={this.state.category.catLan}
      disabled
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
                this.state.notification ? <div className={classes.Notification + " d-flex justify-content-center align-items-center"} >Category <span className="font-weight-bold" > &nbsp;{` ${message} `}&nbsp; </span></div>:null
              }
            <span onClick={this.props.timesHandler}><i style={{color:"red"}} className="fas fa-times fa-2x"></i></span>
            </div>
            <div className="form-group d-flex flex-column align-items-start">
                        <label htmlFor="prodLan">Language version</label>
                        {options}
                        
            </div>
  <div className="form-group d-flex flex-column align-items-start">
    <label htmlFor="catName">Category name</label>
    <input onChange={this.categoryUpdateHandler} type="text" className="form-control" id="catName"  value={this.state.category.catName} / >
    
  </div>
  <div className="form-group d-flex flex-column align-items-start">
    <label htmlFor="catCID">Category CID</label>
    <input onChange={this.categoryUpdateHandler} type="text" className="form-control" id="catCID"  value={this.state.category.catCID} / >
  </div>
  <div className="form-group d-flex flex-column align-items-start">
    <label htmlFor="catUrl">Category url</label>
    <input onChange={this.categoryUpdateHandler} type="text" className="form-control" id="catUrl"  value={this.state.category.catUrl} / >
  </div>
  
  <div className="form-group d-flex justify-content-around">
    <button onClick={this.submitHandler} type="submit" className="btn btn-success">Update</button>
    <button onClick={this.deleteCategory} type="submit" className="btn btn-danger">Delete</button>
  </div>
</div>
      </Auxx>
      );
 }
}
export default CategorySummary;
