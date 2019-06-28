import React, {Component} from 'react';
import Spinner from '../../UI/Spinner/Spinner';
import Auxx from '../../hoc/Auxx'; 
import axios from '../../axios-products';
import DataControllers from '../../components/DataControllers/DataControllers' 

class Data extends Component {
 
    constructor(props){
 
      super(props);

      this.state = {
        cat:[],
        catEN:[],
        catDE:[],
        prod: [],
        prodEN:[],
        prodDE:[],
        loading:true,
        catprod:"catprodEN",
        buttonArrList:[
          {lan:"EN", active:true, id:"catprodEN"},
          {lan:"DE", active:false, id:"catprodDE"}
          ],
          error:false
        }

    }
    componentDidMount() {
        axios.get("/en.json").then((res)=>{
          let recArr = [];
          for(let key in res.data.products){
            recArr.push(res.data.products[key])
          }
        this.setState({prod:recArr, prodEN:recArr, loading:false
          })
        }).catch(err=>{
          this.setState({error:true})
           })
        axios.get("/de.json").then((res)=>{
        let recArr = [];
        for(let key in res.data.products){
          recArr.push(res.data.products[key])
        }
        this.setState({prodDE:recArr})
        }).catch(err=>{
          this.setState({error:true})
           })
        axios.get("/en.json").then((res)=>{
          let recArr = [];
          for(let key in res.data.category){
           recArr.push(res.data.category[key])
           }
           this.setState({cat:recArr, loading:false, catEN:recArr})
           }).catch(err=>{
          this.setState({error:true})
           })
       axios.get("/de.json").then((res)=>{
           let recArr = [];
           for(let key in res.data.category){
             recArr.push(res.data.category[key])
           }
           this.setState({catDE:recArr})
         }).catch(err=>{
           this.setState({error:true})
         })
    }
   
    copyTextHandler = (containerid)=>{
      console.log(containerid,"containerid")
        if (document.selection) {
            var range = document.body.createTextRange();
            range.moveToElementText(document.getElementById(containerid));
            range.select().createTextRange();
            document.execCommand("copy");
        
          } else if (window.getSelection) {
            var range = document.createRange();
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
          this.setState({buttonArrList:buttonArrList,prod:this.state.prodEN, catprod:"catprodEN"})
        break;
        case "DE":
          buttonArrList=[
          {lan:"EN", active:false},
          {lan:"DE", active:true}
          ]
          this.setState({buttonArrList:buttonArrList,prod:this.state.prodDE, catprod:"catprodDE"})
        break;
      }

    }

    render(){ 
      console.log("RENDER", this.state.catprod);
        const catArr = this.state.cat.map((el,indexEl)=>{
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
                                  <span>&#123;&nbsp;&#34;name&#34;&#58;</span><span>&#34;{cat3El.name}&#34;&#8218;</span>
                                  <span>&nbsp;url&nbsp;&#58;</span><span>&#34;{cat3El.url}&#34;&#125;</span>
                                  {indexEl3===cat2El.cat3.length-1?<span>&#93;</span>:<span>&#8218;</span>}
                                </div>)
                            })
                            return(
                              <div className="text-left ml-4" key={cat2El.id}>
                                
                                <span>&#123;&nbsp; &#34;name&#34;</span>:<span>&#34;{cat2El.name}&#34;&#8218;</span> 
                                <span>&nbsp;url&nbsp;</span>:<span>&#34;{cat2El.url}&#34;&#8218;</span><br />
                                "cat3"&nbsp;&#58; &#91; &nbsp;<br /> 
                                <span>{cat3Let}</span>
                                {indexEl2===cat1El.cat2.length-1?<span>&#93;</span>:<span>&#8218;</span>}
                              </div>)
                        } else {
                          return(
                            <div className="text-left ml-4" key={cat2El.id}>
                              
                              <span>&#123;&nbsp; &#34;name&#34;</span>:<span>&#34;{cat2El.name}&#34;&#8218;</span> 
                              <span>&nbsp;url&nbsp;</span>:<span>&#34;{cat2El.url}&#34;&#125;</span>
                              {indexEl2===cat1El.cat2.length-1?<span>&#93;</span>:<span>&#8218;</span>}
                            </div>)
                        }
                      })
                  return ( 
                    <div className="text-left ml-4" key={cat1El.id}>
                      <span>&#123;&nbsp; &#34;name&#34;</span>:<span>&#34;{cat1El.name}&#34;&#8218;</span> 
                      <span>&nbsp;url&nbsp;</span>:<span>&#34;{cat1El.url}&#34;&#8218;</span><br />
                      "cat2"&nbsp;&#58; &#91; &nbsp;<br /> 
                      <span>{cat2Let}</span>
                      {indexEl1===el.cat1.length-1?<span>&#93;</span>:<span>&#8218;</span>}
                    </div>)
                } else {
                  return ( 
                    <div className="text-left ml-4" key={cat1El.id}>
                      <span>&#123;&nbsp; &#34;name&#34;</span>:<span>&#34;{cat1El.name}&#34;&#8218;</span> 
                      <span>&nbsp;url&nbsp;</span>:<span>&#34;{cat1El.url}&#34;&#125;</span>
                      {indexEl1===el.cat1.length-1?<span>&#93;</span>:<span>&#8218;</span>}
                    </div>)
                }
                
              })
              return (
                <div className="text-left" key={el.id}>
                  <span>&#123;&nbsp;&#34;name&#34;&#58;</span><span>&#34;{el.name}&#34;&#8218;</span>
                  <span>&nbsp;url&nbsp;&#58;</span><span>&#34;{el.url}&#34;&#8218;</span><br />
                  "cat1"&nbsp;&#58; &#91; &nbsp;<br /> <span>{cat1Let}</span>
                  {indexEl===this.state.cat.length-1?null:<span>&#8218;</span>}
                </div>)
            } else {
              
              return (
                <div className="text-left" key={el.id}>
                  <span>&#123;&nbsp;&#34;name&#34;&#58;</span><span>&#34;{el.name}&#34;&#8218;</span>
                  <span>&nbsp;url&nbsp;&#58;</span><span>&#34;{el.url}&#34;&#125;</span>
                  {indexEl===this.state.cat.length-1?null:<span>&#8218;</span>}
                </div>)
            }
            
        })

        const prodArr = this.state.prod.map(el=>{
            return (<div className="text-left" key={el.id}>
              &#123;<br /> 
              <span>&#34;name&#34;</span>:<span>&#34;{el.name}&#34;&#8218;</span><br />
              <span>&#34;url&#34;</span>:<span>&#34;{el.url}&#34;&#8218;</span>
              <span>&#34;cid&#34;</span>:<span>&#34;{el.cid}&#34;&#8218;</span><br />
              <span>&#34;description&#34;</span>:<span>&#34;{el.description}&#34;&#8218;</span><br />
              <span>&#34;subcategory&#34;&nbsp;</span>:&#91;<br />
              <Auxx>{el.subcategory.map((sub,index)=>{
                  return (<div key={index} className="ml-4">
                        <span>&#34;name&#34;</span>:<span>&#34;{sub.name}&#34;</span><span>&#9;&#8218;</span><span>&#34;url&#34;</span>:<span>&#34;{sub.url}&#34;</span>
                  </div>)
              })}</Auxx>
              &#93;
              &#125; &#8218;
              
            </div>)
        })
       
        
     return (
         
      <div>
        
          {this.state.loading ? this.state.error ? <p>Server error. Please refresh the page</p> :<Spinner /> :
                  <Auxx>
                      <div className="d-flex justify-content-between">
                      <button className="btn btn-primary" onClick={()=>this.copyTextHandler(this.state.catprod)}>Copy</button>
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
 
export default Data;