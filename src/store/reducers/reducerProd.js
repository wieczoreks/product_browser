import * as actionTypes from "../actions/actionTypes"

const initProd = { 
            prodArr: [],
            prodArrEN:[],
            prodArrDE:[],
            loading:true,
            error:false,
}

const  reducerProd  = (state = initProd, action) => {
    switch(action.type){

        case actionTypes.SET_PROD_EN:
            console.log("INSIDE REEDUCER")
            return {
                ...state,
                prodArr: action.res.prodArr,
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
        default:    
            return state
    }

}

export default reducerProd