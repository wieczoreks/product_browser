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
export const addProdEN = (prod)=>{
    return {
        type:actionTypes.ADD_NEW_PRODUCT,
        prod:prod
    }
}

export const syncProdEN = () => {
    console.log("syncProdEN")
    return (dispatch) => {
        axios.get("/en.json").then((res)=>{
            let recArr = [];
            for(let key in res.data.products){
              recArr.push(res.data.products[key])
            }  
            console.log("syncProdEN AXIOS",recArr )
              dispatch(setProdStateEN({
                prodArr:recArr, 
                prodArrEN:recArr, 
                loading:false,
                
                }))
          }).catch(err=>{
              dispatch(syncProdState_FAILED())
          })  
    }
}
const setProdStateDE = (res) => {
    return {
        type:actionTypes.SET_PROD_DE,
        res:res
    }
}

export const syncProdDE = () => {
    console.log("syncProdDE")
    return (dispatch) => {
        console.log("syncProdDE AXIOS")
        axios.get("/de.json").then((res)=>{
            
            let recArr = [];
            for(let key in res.data.products){
              recArr.push(res.data.products[key])
            }  
              dispatch(setProdStateDE({
                prodArr:recArr, 
                prodArrDE:recArr, 
                loading:false,
               
                }))
          }).catch(err=>{
            dispatch(syncProdState_FAILED())
        })     
    }
}