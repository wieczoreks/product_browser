import * as actionTypes from "../actions/actionTypes"

const initProd = { 
            
            prodArrEN:[],
            prodArrDE:[],
            loading:true,
            error:false,
            prod:null
}

const  reducerProd  = (state = initProd, action) => {
    switch(action.type){

        case actionTypes.SET_PROD_EN:
                return {
                    ...state,
                    prodArrEN:action.res.prodArrEN,
                    loading:action.loading,
                    error:false
                }
            case actionTypes.SET_PROD_DE:
                return {
                    ...state,
                    prodArrDE:action.res.prodArrDE,
                    loading:action.loading,
                    error:false
                }
            case actionTypes.SYNC_PROD_FAILED:
                return {
                    ...state,
                    error:action.error
                }
            case actionTypes.UPDATE_NEW_PRODUCT_EN:
                return  {
                    ...state,
                    prodArrEN:action.prodArrEN,
                    error:false
                } 
            case actionTypes.UPDATE_NEW_PRODUCT_DE:
                        return  {
                    ...state,
                    prodArrDE:action.prodArrDE,
                    error:false
                } 
            case actionTypes.SET_CLICKED_PROD:
                        return  {
                    ...state,
                    prod:action.prod
            }  
            default:    
                return state
    }

}

export default reducerProd