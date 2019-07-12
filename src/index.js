import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import {createStore,combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducerProd from './store/reducers/reducerProd';
import reducerCat from './store/reducers/reducerCat';
import reducerAuth from './store/reducers/reducerAuth';

const reducer = combineReducers({
    reducerAuth:reducerAuth,
    reducerProd:reducerProd,
    reducerCat:reducerCat
})

const composeEnhancers = process.env.NODE_ENV==="development"? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:null || compose;


const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))



ReactDOM.render( <Provider store={store}><App /></Provider>, document.getElementById('root'));

//axios.interceptors.request.use(request=>{
 //   console.log(request)
 //   return request
//}, error=>{
 //   console.log(error)
 //   return Promise.reject(error)
//})
//axios.interceptors.response.use(response=>{
 //   console.log(response)
 //   return response
//}, error=>{
//    console.log(error)
//    return Promise.reject(error)
//})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
