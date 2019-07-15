import * as actionTypes from "../actions/actionTypes"

const initProd = { 
            
            catEN:[],
            catDE:[],
            cidCatArrEN:[],
            cidCatArrDE:[],
            loading:true,
            error:false,
}

const  reducerCat  = (state = initProd, action) => {
    switch(action.type){

        case actionTypes.SET_CAT_EN:
                return {
                    ...state,
                    catEN:action.res.catEN,
                    cidCatArrEN:action.res.cidArrEN,
                    loading:action.loading,
                    error:false
                }
            case actionTypes.SET_CAT_DE:
                return {
                    ...state,
                    catDE:action.res.catDE,
                    cidCatArrDE:action.res.cidArrDE,
                    loading:action.loading,
                    error:false
                }
            case actionTypes.SYNC_CAT_FAILED:
                return {
                    ...state,
                    error:true
                }
            case actionTypes.UPDATE_CAT_EN:
                    return  {
                        ...state,
                        catEN:action.catEN,
                        error:false
                    } 
            case actionTypes.UPDATE_CAT_DE:
                            return  {
                        ...state,
                        catDE:action.catDE,
                        error:false
                    }  
            default:    
                return state
    }

}

export default reducerCat