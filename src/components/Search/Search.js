import React, {Component} from 'react';
 
class Search extends Component {
 constructor(props){
    super(props)
    this.state = {
      searchBy:"name",
      lan:"English"
    }
}
componentDidMount(){
  console.log("Component DID MOUNT [Search]")
}
searchByHandler = (e) => {
this.setState({searchBy:e.target.value})
}

lanSelectorByHandler = (e) => {
  this.setState({lan:e.target.value})
  this.props.passLanguageHandlar(e.target.value)
}

searchChangeHandler = (e) => {
  let type = this.state.searchBy
  this.props.searchProdHandler(e.target.value,type)
}


 render(){
  console.log("Render [SEARCH]") 
  return (
      <div className=" d-flex justify-content-between align-items-center w-100 bg-light">
        <div>
          <div className="form-inline ml-2">
            <input onChange={this.searchChangeHandler} className="form-control" type="search" placeholder="Search" />
            <div className="input-group-prepend">
              <div className="input-group-text">by</div>
            </div>
            <select className="form-control" onChange={this.searchByHandler}>
                <option className="selected" value="name">name</option>
                <option value="cid">cid</option>
                <option value="category">category</option>
            </select>
          </div>
        </div>
   
        <select  style={{width:"300px"}} className="form-control" onChange={this.lanSelectorByHandler}>
                <option value="English" className="selected">English</option>
                <option value="German" >German</option>
                
        </select>
        <button style={{width:"200px"}} onClick={this.props.newProdHandler} className="btn btn-secondary m-2 " type="submit">Add new</button>
      
      </div>
      );
     }
}
 
export default Search;