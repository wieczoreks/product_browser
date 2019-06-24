import React, {Component} from 'react';
 
class CategoryControls extends Component {
 
    constructor(props){
 
      super(props)
      this.state = {
        
        lan:"English"
      }
    }
    lanSelectorByHandler = (e) => {
        this.setState({lan:e.target.value})
        this.props.passLanguageHandler(e.target.value)
      }
    render(){ 
 
     return (
        <div className=" d-flex justify-content-between align-items-center w-100 bg-light">

        <select  style={{width:"300px"}} className="form-control" onChange={this.lanSelectorByHandler}>
                <option value="English" className="selected">English</option>
                <option value="German" >German</option>
        </select>
        <button style={{width:"200px"}} onClick={this.props.newCatHandler} className="btn btn-secondary m-2 " type="submit">Add new</button>
      
      </div>
      );
    }
}
 
export default CategoryControls;