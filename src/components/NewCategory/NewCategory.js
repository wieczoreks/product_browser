import React, {Component} from 'react';
import Auxx from '../../hoc/Auxx';
import classes from './NewCategory.module.css';

class NewCategory extends Component {
 
    constructor(props){
        super(props)
      this.state={
        category:{
            name:"",
            cid:'',
            id:'',
            url:'',
            collapse:false
            },
        notification:false,
        message:"",
        
    }
    }


 newCategoryInputHandler = (e) =>{
   const cat = {...this.state.category}
   
  switch(e.target.id){

    case "catName":
          cat.name= e.target.value
          this.setState({category:cat});
          break;
      case "catCID":
          cat.cid= e.target.value;
          cat.id= e.target.value
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
 
  clearHandler = () => {
    
     this.setState({
        category:{
          name:'',
          cid:'',
          id:'',
          url:'',
          collapse:false
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
    
    this.notificationHandler(`${cat.cid}`); 
    setTimeout(()=>{
      this.props.newCategorySubmitHandler(cat,this.props.str,this.props.lan);
      this.props.closedModal()
      this.clearHandler();
 },3000)  
 
  }

render(){
  let message = this.state.message
 

  
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
                className="form-control" 
                onChange=  {this.newCategoryInputHandler}
                value={this.props.lan}
                disabled
              >
        <option  value="English">English</option>
        <option  value="German" >German</option>
      </select>
              
            </div>
            <div className="form-group d-flex flex-column align-items-start">
              <label htmlFor="catName">Category name</label>
              <input onChange={this.newCategoryInputHandler} value={this.state.category.name} type="text" className="form-control" id="catName" required / >
              
            </div>
          
            <div className="form-group d-flex flex-column align-items-start">
              <label htmlFor="catCID">Category CID</label>
              <input onChange={this.newCategoryInputHandler} type="text" className="form-control" id="catCID"  value={this.state.category.cid} required / >
            </div>
            <div className="form-group d-flex flex-column align-items-start">
              <label htmlFor="catUrl">Category url</label>
              <input onChange={this.newCategoryInputHandler} type="text" className="form-control" id="catUrl" value={this.state.category.url} required / >
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

