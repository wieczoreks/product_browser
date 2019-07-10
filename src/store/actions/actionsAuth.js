import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type:actionTypes.AUTH_START
    }
}

export const authSuccess = (authData) => {
    return {
        type:actionTypes.AUTH_SUCCESS,
        authData:authData
    }
}

export const authFail = (error) => {
    return {
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}

export const authSync = (email,password) => {
    
    return dispatch => {
        const authData={
            email:email,
            password:password,
            returnSecureToken:true
        }
        console.log(authData)
        axios.post("https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCcJyKQYyA3YbqT_OFDiElncIAtzIuRodU",authData )
        .then(res=>{
            console.log(res)
            dispatch(authSuccess(res.data));
        })
        .catch(err => {
            console.log(err)
            dispatch(authFail(err))
        })

        
        
    }
}