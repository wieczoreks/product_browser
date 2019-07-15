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

export const syncCatEN = (token) => {
   
    return (dispatch) => {
        axios.get("/en.json?auth="+token).then((res)=>{
               let recArr = [];
                for(let key in res.data.category){
                 recArr.push(res.data.category[key])
                 }
                 let newcidArr=[];
                 
                 recArr.forEach(el=>{
                    newcidArr.push(el.cid);
                
                    if(el.hasOwnProperty("cat1")){
                         el.cat1.forEach(elcat1=>{
                            newcidArr.push(elcat1.cid);
                            
                            if(elcat1.hasOwnProperty("cat2")){
                                
                                elcat1.cat2.forEach(elcat2=>{
                                    newcidArr.push(elcat2.cid);
                                    
                                    if(elcat2.hasOwnProperty("cat3")){
                                        elcat2.cat3.forEach(elcat3=>{
                                            newcidArr.push(elcat3.cid)
                                           
                                        })
                                    }
                                })
                            } 
                        })
                    }
                })
                
                 dispatch(setCatStateEN({              
                    catEN:recArr, 
                    loading:false,
                    cidArrEN:newcidArr
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

export const syncUpdateCatEN = (arr, token) => {
   
    return (dispatch) => {
        axios.put("/en/category.json?auth="+token, arr ).then(resp=>{
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

export const syncCatDE = (token) => {
   
    return (dispatch) => {
        axios.get("/de.json?auth="+token).then((res)=>{
               let recArr = [];
                for(let key in res.data.category){
                 recArr.push(res.data.category[key])
                 }
                 let newcidArr=[];
                 
                 recArr.forEach(el=>{
                    newcidArr.push(el.cid);
                
                    if(el.hasOwnProperty("cat1")){
                         el.cat1.forEach(elcat1=>{
                            newcidArr.push(elcat1.cid);
                            
                            if(elcat1.hasOwnProperty("cat2")){
                                
                                elcat1.cat2.forEach(elcat2=>{
                                    newcidArr.push(elcat2.cid);
                                    
                                    if(elcat2.hasOwnProperty("cat3")){
                                        elcat2.cat3.forEach(elcat3=>{
                                            newcidArr.push(elcat3.cid)
                                           
                                        })
                                    }
                                })
                            } 
                        })
                    }
                })
                 dispatch(setCatStateDE({              
                    catDE:recArr, 
                    cidArrDE:newcidArr,
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

export const syncUpdateCatDE = (arr, token) => {
  
   return (dispatch) => {
       axios.put("/de/category.json?auth="+token, arr ).then(resp=>{
           dispatch(updateCatDE({
              catDE:arr
               }))

       }).catch(err=>{
             dispatch(syncCatState_FAILED())
         })  
   }
}