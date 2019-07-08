import React from 'react';
import Auxx from '../../hoc/Auxx';

const DataController = (props) => {


    let butArr = props.buttonArrList.map(bu=>{
        let classButton;
        if(!bu.active){
            classButton="btn btn-secondary p-2 mr-2"
        } else{
            classButton="btn btn-danger p-2 mr-2"
        }
        return (<Auxx key={bu.lan}>
        <button onClick={()=>props.buttonLanChangeHandler(bu)} className={classButton}>{bu.lan}</button></Auxx>)
    })
    return (
        <div className="d-flex flex-row">
         {butArr} 
        </div>
    );
}

export default DataController;