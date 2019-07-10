import * as actionTypes from "../actions/actionTypes"

const initAuth = {         
            idToken:null,
            userId:null,
            error:null,
            loading:false
}

const  reducerAuth  = (state = initAuth, action) => {
    switch(action.type){

        case actionTypes.AUTH_START:
                return {
                    loading:true,
                    error:null
                }
        case actionTypes.AUTH_SUCCESS:
            
                return {
                    idToken:action.token,
                    userId:action.user,
                    loading:false,
                    error:null
                }
        case actionTypes.AUTH_FAIL:
                return {
                   
                    loading:false,
                    error:action.error
                }         
        default:    
                return state
    }

}

export default reducerAuth