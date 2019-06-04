import React, {Component} from 'react';
 
class Search extends Component {
 constructor(props){
  super(props)

}

searchChangeHandler = (e) => {
  this.props.searchProdHandler(e.target.value)


}

 render(){
     
  return (
      <div className=" d-flex justify-content-between align-items-center w-100 bg-light">
        <div>
          <div className="form-inline ml-2">
              <input onChange={this.searchChangeHandler} className="form-control" type="search"  />
             
          </div>
        </div>
        <button onClick={this.props.newProdHandler} className="btn btn-secondary m-2 " type="submit">Add new</button>
      </div>
      );
     }
}
 
export default Search;