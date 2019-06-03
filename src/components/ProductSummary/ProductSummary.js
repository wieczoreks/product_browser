import React from 'react';
import Aux from '../../hoc/Aux';

const ProductSummary = (props) => {
 
     return (
      <Aux className="card">
        <form>
            <div className="form-group d-flex justify-content-end">
            <a href="#" onClick={props.timesHandler}><i style={{color:"red"}} className="fas fa-times fa-2x"></i></a>
            </div>
  <div className="form-group d-flex flex-column align-items-start">
    <label htmlFor="prodName">Product name</label>
    <input type="text" className="form-control" id="prodName"  value={props.product.name} / >
    
  </div>
  <div className="form-group d-flex flex-column align-items-start">
    <label htmlFor="prodCID">Product CID</label>
    <input type="text" className="form-control" id="prodCID"  value={props.product.cid} / >
  </div>
  <div className="form-group d-flex flex-column align-items-start">
    <label htmlFor="prodUrl">Product url</label>
    <input type="text" className="form-control" id="prodUrl"  value={props.product.url} / >
  </div>
  <div className="form-group d-flex flex-column align-items-start">
    <label htmlFor="prodDescription">Product description</label>
    <input type="text" className="form-control" id="prodDescription"  value={props.product.description} / >
  </div>
  <div className="form-group d-flex flex-column align-items-start">
    <label htmlFor="catName">Category name</label>
    <input type="text" className="form-control" id="catName" value={props.product.subcategory[0].name} / >
  </div>
  <div className="form-group d-flex flex-column align-items-start">
    <label htmlFor="catUrl">Category url</label>
    <input type="text" className="form-control" id="catUrl"  value={props.product.subcategory[0].url} / >
  </div>
  <div className="form-group d-flex justify-content-around">
    <button type="submit" className="btn btn-success">Save</button>
    <button type="submit" className="btn btn-danger">Delete</button>
  </div>
</form>
      </Aux>
      );
}
 
export default ProductSummary;

 //{props.product.name}
 //props.propduct.id