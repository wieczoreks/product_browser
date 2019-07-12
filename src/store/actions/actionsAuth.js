import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type:actionTypes.AUTH_START
    }
}

export const authSuccess = (token, user) => {
    return {
        type:actionTypes.AUTH_SUCCESS,
        token:token,
        user:user
    }
}

export const authFail = (error) => {
    return {
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}
export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
    return {
        type:actionTypes.AUTH_LOGOUT

    }
}

export const checkAuthTimeout = (expiryTime) => {
    return dispatch=>{
        
        setTimeout(()=>{
            dispatch(logout())
        },expiryTime*1000)
    }

}

export const authSync = (email, password, authentication) => {
    
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
                const expiryDate = new Date(new Date().getTime()+res.data.expiresIn*1000);
                localStorage.setItem("token", res.data.idToken);
                localStorage.setItem("expiryDate", expiryDate);
                localStorage.setItem("userId", res.data.localId);
                dispatch(authStart());
                dispatch(authSuccess(res.data.idToken, res.data.localId));
                dispatch(checkAuthTimeout(res.data.expiresIn));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            })
    }
}

export const authCheckState = () => {
        return dispatch => {
            const token = localStorage.getItem("token");
            
            if(!token){
                dispatch(logout());
            } else {
                const expiryDate = new Date(localStorage.getItem("expiryDate")).getTime();
                
                if (expiryDate >new Date().getTime()){
                    
                    const user = localStorage.getItem("userId")
                    dispatch(authSuccess(token, user));
                  
                    dispatch(checkAuthTimeout( (expiryDate- new Date().getTime())/1000) );    
                } else {
                    dispatch(logout())
                }
                
            }

            
        }
    }