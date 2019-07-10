import * as actionTypes from './actionTypes';
import axios from '../../axios-products';

export const syncCatState_FAILED = () => {
    return {
        type:actionTypes.SYNC_CAT_FAILED,
        error:true
    }
}

const  setCatStateEN = (res) => {
    return {
        type:actionTypes.SET_CAT_EN,
        res:res
    }
}

export const syncCatEN = () => {
   
    return (dispatch) => {
        axios.get("/en.json").then((res)=>{
               let recArr = [];
                for(let key in res.data.category){
                 recArr.push(res.data.category[key])
                 }
                 dispatch(setCatStateEN({              
                    catEN:recArr, 
                    loading:false,
                    }))
                 
                 }).catch(err=>{
                    dispatch(syncCatState_FAILED())
                 })
      
    }
}

 export const updateCatEN = (arr)=>{
     return {
         type:actionTypes.UPDATE_CAT_EN,
         catEN:arr.catEN
     }
 }

export const syncUpdateCatEN = (arr) => {
   
    return (dispatch) => {
        axios.put("/en/category.json", arr ).then(resp=>{
            dispatch(updateCatEN({
               catEN:arr
                }))

        }).catch(err=>{
              dispatch(syncCatState_FAILED())
          })  
    }
}
/////////////////////////////GERMAN//////////////////////////////////////////////////////////

const  setCatStateDE = (res) => {
    return {
        type:actionTypes.SET_CAT_DE,
        res:res
    }
}

export const syncCatDE = () => {
   
    return (dispatch) => {
        axios.get("/de.json").then((res)=>{
               let recArr = [];
                for(let key in res.data.category){
                 recArr.push(res.data.category[key])
                 }
                 dispatch(setCatStateDE({              
                    catDE:recArr, 
                    loading:false,
                    }))
                 
                 }).catch(err=>{
                    dispatch(syncCatState_FAILED())
                 })
      
    }
}

export const updateCatDE = (arr)=>{
    return {
        type:actionTypes.UPDATE_CAT_DE,
        catDE:arr.catDE
    }
}

export const syncUpdateCatDE = (arr) => {
  
   return (dispatch) => {
       axios.put("/de/category.json", arr ).then(resp=>{
           dispatch(updateCatDE({
              catDE:arr
               }))

       }).catch(err=>{
             dispatch(syncCatState_FAILED())
         })  
   }
}