import React from 'react';
import Auxx from '../../hoc/Auxx';


const Categories = (props) => {
    
    const catArrr = props.catArr.map((res,index)=>{
        return (
            <div key={res.id} className="d-flex flex-column p-1 align-items-start">
            <div className="d-flex flex-row justify-content-between shadow p-4 w-100">
              
              {res.collapse ?
              <span onClick={()=>props.rollUpHandler(res.id, index)}>
                <i className="fas fa-caret-square-down"></i>
              </span> :
              <span onClick={()=>props.rollDownHandler(res.id, index)}>
                <i className="fas fa-chevron-circle-up"></i>
              </span>}

              <a className="badge badge-secondary" target="_blank" href={`${res.url}`}>{`${res.name}`}</a>
              <div>
              <span className="p-1 m-1" onClick={()=>props.addCatHandler(res,"main")}><i className="fas fa-plus-circle"></i></span>
              <span className="p-1 m-1"   onClick={()=>props.editCategoryHandler(res,"main")}>
                <i className="fas fa-edit"></i>
              </span>
              </div>
            </div>
            {res.cat1 && res.collapse ? 
              <div className="w-100">{res.cat1.map((cat1El,cat1Index)=>{
                return(
                <div key={cat1El.id} className="p-0 ml-4">
                  <div  style={{color:"#007bff"}} className="d-flex flex-row justify-content-between shadow p-4 w-100">
                    {cat1El.collapse ?
                    <span onClick={()=>props.cat1RollUpHandler(cat1El.id, index, cat1Index)}>
                      <i className="fas fa-caret-square-down"></i>
                    </span>:
                    <span onClick={()=>props.cat1RollDownHandler(cat1El.id, index, cat1Index)}>
                      <i className="fas fa-chevron-circle-up"></i>
                    </span>}
                  
                    <a className="badge badge-primary" target="_blank" href={`${cat1El.url}`}> {`${cat1El.name}`} </a>
                    <div>
                      <span className="p-1 m-1" onClick={()=>props.addCatHandler(cat1El,"cat1")}><i className="fas fa-plus-circle"></i></span>
                      <span className="p-1 m-1" onClick={()=>props.editCategoryHandler(cat1El, "cat1")}>
                        <i className="fas fa-edit"></i>
                      </span>
                    </div>
                  </div>
                  {cat1El.cat2 && cat1El.collapse  ? 
                  <div className="w-100">{cat1El.cat2.map((cat2El,cat2Index)=>{
                      return(
                    <div key={cat2El.id} className="p-0 ml-4">
                      <div className="d-flex flex-row justify-content-between shadow p-4 w-100" style={{color:"#28a745"}}>
                        {cat2El.collapse?
                        <span onClick={()=>props.cat2RollUpHandler(cat2El.id, index, cat1Index, cat2Index)}>
                          <i className="fas fa-caret-square-down"></i>
                        </span>:
                        <span onClick={()=>props.cat2RollDownHandler(cat2El.id, index, cat1Index, cat2Index)}>
                        <i className="fas fa-chevron-circle-up"></i>
                        </span>}
                     
                      <a className="badge badge-success" target="_blank" href={`${cat2El.url}`}>{`${cat2El.name}`}</a>
                      <div>
                      <span className="p-1 m-1"  onClick={()=>props.addCatHandler(cat2El,"cat2")}><i className="fas fa-plus-circle"></i></span>
                      <span className="p-1 m-1"  onClick={()=>props.editCategoryHandler(cat2El, "cat2")}>
                        <i className="fas fa-edit"></i>
                      </span>
                      </div>
                      </div>
                              {cat2El.cat3 && cat2El.collapse  ? 
                              <div className="w-100">{cat2El.cat3.map((cat3El,cat3Index)=>{
                              return(
                            <div key={cat3El.id} className="p-0 ml-4">
                              <div className="d-flex flex-row justify-content-between shadow p-4 w-100" style={{color:"#dc3545"}}>
                                {cat3El.collapse?
                                <span onClick={()=>props.cat3RollUpHandler(cat3El.id, index, cat1Index, cat2Index, cat3Index)}>
                                  <i className="fas fa-caret-square-down"></i>
                                </span>:
                                <span onClick={()=>props.cat3RollDownHandler(cat3El.id, index, cat1Index, cat2Index, cat3Index)}>
                                <i className="fas fa-chevron-circle-up"></i>
                                </span>}
                              
                              <a className="badge badge-danger" target="_blank" href={`${cat3El.url}`}>{`${cat3El.name}`}</a>
                              <div>
                              
                              <span onClick={()=>props.editCategoryHandler(cat3El, "cat3")}>
                                <i className="fas fa-edit"></i>
                              </span>
                              </div>
                              </div>  
                            </div>)
                            })}</div>:null}  
                    </div>)
                    })}</div>:null}
               </div>)
            })}</div>:null}
            
        </div>
    );
    })
     
        return <Auxx> 
        {catArrr}
     </Auxx>
     
}
 
export default Categories;