import React, {Component} from 'react';
import axios from '../../axios-products';
import {withRouter} from 'react-router-dom'
import Spinner from '../../UI/Spinner/Spinner';

class ProductDetails extends Component {
 
    constructor(props){
        super(props)
        this.state={
                errorDE:null,
                errorEN:null,
                loading:true,
                prodArrDE:null,
                prodArrEN:null,
                prodDE:{
                    cid: null,
                    description: null,
                    name: null,
                    url:null,
                    category: null,
                    categoryurl: null,
                },
                prodEN:{
                    cid: null,
                    description: null,
                    name: null,
                    url:null,
                    category: null,
                    categoryurl: null,
                }
        }
    }
    componentDidMount(){
        
        if(this.props.match.params.id)
           
            axios.get("/en.json").then(res=>{
            
            let recArr = [];

            for(let key in res.data.products){
            recArr.push(res.data.products[key])
            }

            let el = recArr.filter(item=>{
                return item.id == this.props.match.params.id
            })
            console.log("EN AXIOS",el)
           this.setState({
               
               loading:false,
               prodArrEN:recArr,
               prodEN:{
                cid: el[0].cid,
                description: el[0].description,
                name: el[0].name,
                url:el[0].url,
                category: el[0].subcategory[0].name,
                categoryurl: el[0].subcategory[0].url,
            }
           })
          }).catch(err=>{
              this.setState({errorEN:"English did not fetch"})
          })
          axios.get("/de.json").then(res=>{
            
            let recArr = [];

            for(let key in res.data.products){
            recArr.push(res.data.products[key])
            }

            let el = recArr.filter(item=>{
                return item.id == this.props.match.params.id
            })
            console.log("DE AXIOS",el)
           this.setState({
               loading:false,
               prodArrDE:recArr,
               prodDE:{
                    cid: el[0].cid,
                    description: el[0].description,
                    name: el[0].name,
                    url:el[0].url,
                    category: el[0].subcategory[0].name,
                    categoryurl: el[0].subcategory[0].url,
                }
           })
          }).catch(err=>{
            this.setState({errorDE:"German did not fetch"})
        })
    }


    render(){ 
        console.log(this.props.match.url,"this.props.match.params.url")
        console.log(this.state,"STATE")

        let prod; 
        let content = <Spinner />
        if(this.state.prodEN.cid || this.state.prodDE.cid){
            if(this.props.match.url.includes("/en")){
                prod = this.state.prodEN
                console.log(this.props.match.url.includes("/en"),prod,"INICLUDES EN")
            }
            if(this.props.match.url.includes("/de")){
                console.log(this.props.match.url.includes("/de"),prod,"INICLUDES DE")
                prod = this.state.prodDE
            }
            content = (<div>
            <div className="jumbotron mb-1 mt-1">
                <p className="lead text-info">CID</p> 
                <p>{prod.cid}</p>
            </div>
            <div className="jumbotron mb-1"> 
            <p className="lead text-info">Description</p> 
                <p>{prod.description}</p>
            </div>
            <div className="jumbotron mb-1"> 
            <p className="lead text-info">URL</p> 
            <p> {prod.url}</p>
            </div>
            <div className="jumbotron mb-1"> 
            <p className="lead text-info">Category</p> 
            <p> {prod.category}</p>
            </div>
            <div className="jumbotron mb-1"> 
            <p className="lead text-info">Category URL</p> 
            <p> {prod.categoryurl}</p>
            </div>
             </div>)
             
            
        }
      
        
     return   (<div>
     {content}
      </div>)
    
}
    }

 
export default withRouter(ProductDetails);