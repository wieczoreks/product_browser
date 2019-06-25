import React, {Component} from 'react';
import Auxx from '../../hoc/Auxx';
import classes from './NewCategory.module.css';

class NewCategory extends Component {
 
    constructor(props){
        super(props)
      this.state={
        category:{
            catLan:'English',
            catName:"",
            catCID:'',
            catUrl:''
            },
        notification:false,
        message:"",
        str:""
    }
    }
componentDidMount(){
  console.log("Component Did Mount [NewCategory]")
}

 newCategoryInputHandler = (e) =>{
   const cat = {...this.state.category}
   this.setState({str:this.props.str})
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
 
  clearHandler = () => {
    console.log("CLEAR")
     this.setState({
        category:{
          catLan:'English',
          catName:'',
          catCID:'',
          catUrl:'',
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
    const cat = this.state.category
    console.log(this.state.category,this.state.str,"submit HANDLER")
    this.notificationHandler(`${this.state.category.catCID}`); 
    setTimeout(()=>{
      this.props.newCategorySubmitHandler(cat,this.state.str);
      this.props.closedModal()
      this.clearHandler();
 },3000)  
 
  }

render(){
  let message = this.state.message
  console.log(this.state.str,"RENDER NEW CATEGORY",this.props.str,"PASSED")
     return (
      <Auxx className="card">
        <form>
            <div className="form-group d-flex justify-content-end ml-5">
              {
                this.state.notification ? <div className={classes.Notification + " d-flex justify-content-center align-items-center"} >Category <span className="font-weight-bold" > &nbsp;{` ${message} `}&nbsp; </span> added</div>:null
              }
            <span onClick={this.props.closedModal}><i style={{color:"red"}} className="fas fa-times fa-2x"></i></span>
            </div>
            <div className="form-group d-flex flex-column align-items-start">
              <label htmlFor="catLan">Language version</label>
              <select 
              id="catLan" 
              style={{width:"300px"}} 
              className="form-control" onChange={this.newCategoryInputHandler}>
                <option value="English" className="selected">English</option>
                <option value="German" >German</option>
              </select>
              
            </div>
            <div className="form-group d-flex flex-column align-items-start">
              <label htmlFor="catName">Category name</label>
              <input onChange={this.newCategoryInputHandler} value={this.state.category.catName} type="text" className="form-control" id="catName" required / >
              
            </div>
          
            <div className="form-group d-flex flex-column align-items-start">
              <label htmlFor="catCID">Category CID</label>
              <input onChange={this.newCategoryInputHandler} type="text" className="form-control" id="catCID"  value={this.state.category.catCID} required / >
            </div>
            <div className="form-group d-flex flex-column align-items-start">
              <label htmlFor="catUrl">Category url</label>
              <input onChange={this.newCategoryInputHandler} type="text" className="form-control" id="catUrl" value={this.state.category.catUrl} required / >
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
 
export default NewCategory;

