import React, {Component} from 'react';
import Auxx from '../../hoc/Auxx'; 
import DataControllers from '../../components/DataControllers/DataControllers' 
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import axios from '../../axios-products';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
//import Spinner from '../../UI/Spinner/Spinner';

class Data extends Component {
 
    constructor(props){
 
      super(props);

      this.state = {
        lan:"English",
        catEN:this.props.catEN,
        catDE:this.props.catDE,
        prodEN:this.props.prodArrEN,
        prodDE:this.props.prodArrDE,
        catprod:"catprodEN",
        loading:true,
        buttonArrList:[
          {lan:"EN", active:true, id:"catprodEN"},
          {lan:"DE", active:false, id:"catprodDE"}
          ],
        
        }

    }
    componentDidMount() {
   
     
       
  }
    copyTextHandler = (containerid)=>{
      
        if (document.selection) {
            let range = document.body.createTextRange();
            range.moveToElementText(document.getElementById(containerid));
            range.select().createTextRange();
            document.execCommand("copy");
        
          } else if (window.getSelection) {
            let range = document.createRange();
            range.selectNode(document.getElementById(containerid));
            window.getSelection().addRange(range);
            document.execCommand("copy");
            alert("TEXT COPIED")
          }
    }

    buttonLanChangeHandler = (bu) => {
      let buttonArrList = [...this.state.buttonArrList];
      switch(bu.lan){
        case "EN":
          buttonArrList=[
            {lan:"EN", active:true},
            {lan:"DE", active:false}
          ]
          this.setState({buttonArrList:buttonArrList, catEN:this.props.catEN, prodEN:this.props.prodEN, lan:"English" })
        break;
        case "DE":
          buttonArrList=[
          {lan:"EN", active:false},
          {lan:"DE", active:true}
          ]
          this.setState({buttonArrList:buttonArrList, catDE:this.props.catDE,  prodDE:this.props.prodDE, lan:"German" })
        break;
        default:
          break;
      }

    }
    syncDataHandler = () => {
     this.setState({loading:false})
      this.props.getCatDE(this.props.token);
      this.props.getProdDE(this.props.token);
      this.props.getCatEN(this.props.token);
      this.props.getProdEN(this.props.token);
      
    }

    render(){ 
        let cat;
        let prod;
        if(this.state.lan ==="English" && this.props.catEN && this.props.prodEN){
          
            cat = this.props.catEN;
            prod = this.props.prodEN;
        }
        else if(this.state.lan ==="German" && this.props.catDE && this.props.prodDE)  {
          cat = this.props.catDE;
          prod = this.props.prodDE;
        } else {
          cat = [];
          prod = [];
        }
        
           
        
        const catArr = cat.map((el,indexEl)=>{
            let cat1Let;
            let cat2Let;
            let cat3Let;
            if(el.hasOwnProperty("cat1")){
              cat1Let = el.cat1.map((cat1El,indexEl1)=>{
                if(cat1El.hasOwnProperty("cat2")){
                      cat2Let = cat1El.cat2.map((cat2El,indexEl2)=>{
                        if(cat2El.hasOwnProperty("cat3")){
                            cat3Let = cat2El.cat3.map((cat3El,indexEl3)=>{
                              return(
                                <div className="text-left" key={cat3El.id}>
                                  <span>&#123;&nbsp;&#34;name&#34;:</span><span>&#34;{cat3El.name}&#34;&#44;</span>
                                  <span>&nbsp;url:&nbsp;</span><span>&#34;{cat3El.url}&#34;</span>
                                  {indexEl3===cat2El.cat3.length-1?<span>&#125;</span> : <span>&#125;&nbsp;&#44;</span> }
                                </div>)
                            })
                            return(
                              <div className="text-left ml-4" key={cat2El.id}>
                                
                                <span>&#123;&nbsp; &#34;name&#34;</span>:<span>&#34;{cat2El.name}&#34;&#44;</span> 
                                <span>&nbsp;url:&nbsp;</span><span>&#34;{cat2El.url}&#34;&#44;</span><br />
                                "cat3"&nbsp;&#58; &#91; &nbsp;<br /> 
                                <span>{cat3Let}</span><span>&#93;</span>
                                {indexEl2===cat1El.cat2.length-1?<span>&#125;</span> : <span>&#125;&nbsp;&#44;</span> }
                              </div>)
                        } else {
                          return(
                            <div className="text-left ml-4" key={cat2El.id}>
                              <span>&#123;&nbsp; &#34;name&#34;</span>:<span>&#34;{cat2El.name}&#34;&#44;</span> 
                              <span>&nbsp;url:&nbsp;</span><span>&#34;{cat2El.url}&#34;</span>
                              {indexEl2===cat1El.cat2.length-1?<span>&#125;</span> : <span>&#125;&nbsp;&#44;</span> }
                            </div>)
                        }
                      })
                  return ( 
                    <div className="text-left ml-4" key={cat1El.id}>
                      <span>&#123;&nbsp; &#34;name&#34;</span>:
                      <span>&#34;{cat1El.name}&#34;&#44;</span> 
                      <span>&nbsp;url:&nbsp;</span><span>&#34;{cat1El.url}&#34;&#44;</span><br />
                      <span>"cat2"&nbsp;&#58;&nbsp;&#91;&nbsp;</span><br /> 
                      <span>{cat2Let}</span><span>&#93;</span>
                      {indexEl1===el.cat1.length-1?<span>&#125;</span>:<span>&#125;&nbsp;&#44;</span> }
                    </div>)
                } else {
                  return ( 
                    <div className="text-left ml-4" key={cat1El.id}>
                      <span>&#123;&nbsp; &#34;name&#34;</span>:<span>&#34;{cat1El.name}&#34;&#44;</span> 
                      <span>&nbsp;url:&nbsp;</span><span>&#34;{cat1El.url}&#34;</span>
                      {indexEl1===el.cat1.length-1?<span>&#125;</span>:<span>&#125;&nbsp;&#44;</span>}
                    </div>)
                }
                
              })
              return (
                <div className="text-left" key={el.id}>
                  <span>&#123;&nbsp;&#34;name&#34;&#58;</span><span>&#34;{el.name}&#34;&#44;</span>
                  <span>&nbsp;url&#58;&nbsp;</span><span>&#34;{el.url}&#34;&#44;</span><br />
                  <span>"cat1"&nbsp;&#58;&nbsp;&#91;&nbsp;</span><br /> 
                  <span>{cat1Let}</span><span>&#93;</span>
                  { indexEl === cat.length-1 ? <span>&#125;</span> : <span>&#125;&nbsp;&#44;</span> }
                </div>)
            } else {
              
              return (
                <div className="text-left" key={el.id}>
                  <span>&#123;&nbsp;&#34;name&#34;&#58;</span><span>&#34;{el.name}&#34;&#44;</span>
                  <span>&nbsp;url&nbsp;&#58;</span><span>&#34;{el.url}&#34;</span>
                  {indexEl === cat.length-1 ? <span>&#125;</span> : <span>&#125;&nbsp;&#44;</span> }
                </div>)
            }
            
        })

        const prodArr = prod.map((el,index)=>{
            return (<div className="text-left" key={el.id}>
              &#123;<br /> 
              <span>&#34;name&#34;</span>:<span>&#34;{el.name}&#34;&#44;</span><br />
              <span>&#34;url&#34;</span>:<span>&#34;{el.url}&#34;&#44;</span>
              <span>&#34;description&#34;</span>:<span>&#34;{el.description}&#34;&#44;</span><br />
              <span>&#34;subcategory&#34;&nbsp;</span>:&#91;<br />
                  <Auxx>{el.subcategory.map((sub,index)=>{
                      return (<div key={index} className="ml-4">
                        <span>&#123;&nbsp;&#34;name&#34;</span>:<span>&#34;{sub.name}&#34;</span><span>&#9;&#44;</span><span>&#34;url&#34;</span>:<span>&#34;{sub.url}&#34;&nbsp;&#125;</span>
                       </div>)})}     
                  </Auxx>
              &#93;
              {index===prod.length-1?<span>&#125;</span>:<span>&#125;&nbsp;&#44;</span>}
              
            </div>)
        })
       
    
     return (
         
      <div>
        
          { this.props.error ? <p>Server error. Please refresh the page</p> :
                  <Auxx>
                      <div className="d-flex justify-content-between">
                      <button className="btn btn-primary" onClick={()=>this.copyTextHandler(this.state.catprod)}>Copy</button>
                      <button className="btn btn-warning" onClick={()=>this.syncDataHandler()}><i className="fas fa-sync"></i></button>
                      <DataControllers 
                        buttonLanChangeHandler={this.buttonLanChangeHandler}
                        buttonArrList={this.state.buttonArrList} />
                      </div>
                        <div className="text-left bg-light border p-1 mt-2" id={this.state.catprod}>
                          <span>var category1 = &#123;</span><br />
                          <span>"header": "Categories",</span><br />
                          <span>"cat0":&nbsp;&#91;</span><br />
                            {catArr}
                            <span>&#93;&#125;&#59;</span><br />
                            <span>var products1 = &#123;</span><br />
                            <span>"header": "Products",</span><br />
                            <span>"products":&#91;</span><br />
                            {prodArr}<br />
                            &#93;&#125;
                        </div>
                  
              
                  </Auxx>}
 
         
      </div>
      );
    }
}


 
const mapStateToProps = (state) => {

  return {
   
    prodEN:state.reducerProd.prodArrEN,
    prodDE:state.reducerProd.prodArrDE,
    catEN:state.reducerCat.catEN,
    catDE:state.reducerCat.catDE,
    loadingProd:state.reducerProd.loading,
    loadingCat:state.reducerCat.loading,
    error:state.reducerProd.error,
    token:state.reducerAuth.idToken
    
  }

}
const mapDispatchToProps = (dispatch) => {

return {
    getProdEN: (token)=> dispatch(actions.syncProdEN(token)),
    getProdDE: (token)=> dispatch(actions.syncProdDE(token)),
    getCatEN:  (token)=> dispatch(actions.syncCatEN(token)),
    getCatDE:  (token)=> dispatch(actions.syncCatDE(token))
}

}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Data,axios));