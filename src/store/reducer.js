import * as actionTypes from "./actions"

const init = { 
    counter:0
}

const  reducer  = (state = init, action) => {
    switch(action.type){
        case actionTypes.ACTION1:
            return state

    }

    return state;
}

export default reducer