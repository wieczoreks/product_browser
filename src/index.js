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
const reducer = combineReducers({
    reducerProd:reducerProd,
    rc:reducerCat
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


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
