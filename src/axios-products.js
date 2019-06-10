import axios from 'axios';

const instance  = axios.create({
    baseURL:"https://measurement-products.firebaseio.com"
});

export default instance;


//import axios from 'axios';
//axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";


//const instance = axios.create({
 //   baseURL:"https://jsonplaceholder.typicode.com"
//})

//instance.defaults.headers.common['Authorization'];

//export default instance;