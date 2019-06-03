import React from 'react';
 
const Search = (props) => {
 
     return (
        <div className=" d-flex justify-content-between align-items-center w-100 bg-light">
        <div>
          <form className="form-inline ml-2">
              <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-secondary ml-1" type="submit">Search</button>
          </form>
        </div>
        <button onClick={props.newProdHandler} className="btn btn-secondary m-2 " type="submit">Add new</button>
      </div>
      );
}
 
export default Search;