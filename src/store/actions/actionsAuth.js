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
        token:authData.idToken,
        user:authData.localId
    }
}

export const authFail = (error) => {
    return {
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}

export const authSync = (email, password, authentication) => {
    console.log(email, password, authentication)
    return dispatch => {
        let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCcJyKQYyA3YbqT_OFDiElncIAtzIuRodU";
        const authData={
            email:email,
            password:password,
            returnSecureToken:true
        }
        if(authentication === "signIn"){
            url="https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCcJyKQYyA3YbqT_OFDiElncIAtzIuRodU";
            
        }
            axios.post(url,authData )
            .then(res=>{
                console.log(res)
                dispatch(authStart())
                setTimeout(()=>{dispatch(authSuccess(res.data))},1000);
            })
            .catch(err => {
                console.log(err)
                dispatch(authFail(err.response.data.error))
            })
    }
}