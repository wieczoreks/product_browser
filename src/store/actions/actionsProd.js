import * as actionTypes from './actionTypes';
import axios from '../../axios-products';

const  setProdStateEN = (res) => {
    return {
        type:actionTypes.SET_PROD_EN,
        res:res
    }
}
export const syncProdState_FAILED = () => {
    return {
        type:actionTypes.SYNC_PROD_FAILED,
        error:true
    }
}


export const syncProdEN = () => {
   
    return (dispatch) => {
        axios.get("/en.json").then((res)=>{
            let recArr = [];
            for(let key in res.data.products){
              recArr.push(res.data.products[key])
            }  
              dispatch(setProdStateEN({
                prodArrEN:recArr, 
                loading:false,
                }))
                
          }).catch(err=>{
              dispatch(syncProdState_FAILED())
          })  
    }
}

export const addNewProdEN = (arr)=>{
    return {
        type:actionTypes.UPDATE_NEW_PRODUCT_EN,
        prodArrEN:arr.prodArrEN
    }
}
export const syncUpdateProdArrEN = (arr) => {
   
    return (dispatch) => {
        axios.put("/en/products.json", arr ).then(resp=>{
            dispatch(addNewProdEN({
                prodArrEN:arr
                }))

        }).catch(err=>{
              dispatch(syncProdState_FAILED())
          })  
    }
}

///////////////////DE/////////////////////////////

const setProdStateDE = (res) => {
    return {
        type:actionTypes.SET_PROD_DE,
        res:res
    }
}

export const syncProdDE = () => {
    
    return (dispatch) => {
        
        axios.get("/de.json").then((res)=>{
            
            let recArr = [];
            for(let key in res.data.products){
              recArr.push(res.data.products[key])
            }  
              dispatch(setProdStateDE({
                 
                prodArrDE:recArr, 
                loading:false,
               
                }))
          }).catch(err=>{
            dispatch(syncProdState_FAILED())
        })     
    }
}
export const addNewProdDE = (arr)=>{
    return {
        type:actionTypes.UPDATE_NEW_PRODUCT_DE,
        prodArrDE:arr.prodArrDE
    }
}
export const syncUpdateProdArrDE = (arr) => {
   
    return (dispatch) => {
        axios.put("/de/products.json", arr ).then(resp=>{
            dispatch(addNewProdDE({
                prodArrDE:arr
                }))

        }).catch(err=>{
              dispatch(syncProdState_FAILED())
          })  
    }
}