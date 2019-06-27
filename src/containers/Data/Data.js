import React, {Component} from 'react';
import Spinner from '../../UI/Spinner/Spinner';
import Auxx from '../../hoc/Auxx'; 
import axios from '../../axios-products';

class Data extends Component {
 
    constructor(props){
 
      super(props)
      this.state = {
        
        cat:[],
        catEN:[],
        catDE:[],
        prod: [],
        prodEN:[],
        prodDE:[],
        loading:true
        }
    }
    componentDidMount() {
        console.log(this.props,"DATA DID mount ")
        axios.get("/en.json").then((res)=>{
          
          let recArr = [];
          for(let key in res.data.products){
            recArr.push(res.data.products[key])
          }
          this.setState({
            prod:recArr, 
            prodEN:recArr,
            loading:false
          })
        
        })
        axios.get("/de.json").then((res)=>{
        let recArr = [];
        for(let key in res.data.products){
          recArr.push(res.data.products[key])
        }
        this.setState({
          prodDE:recArr,
        })
      
    })
    }
   
    copyTextHandler = (containerid)=>{
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

    render(){ 
        let newArr = this.state.prod.map(el=>{
            return (<div className="text-left" key={el.id}>
              &#123;<br /> 
              <span>&#34;name&#34;</span>:<span>&#34;{el.name}&#34;</span><br />
              <span>&#34;url&#34;</span>:<span>&#34;{el.url}&#34;</span>
              <span>&#34;cid&#34;</span>:<span>&#34;{el.cid}&#34;</span><br />
              <span>&#34;description&#34;</span>:<span>&#34;{el.description}&#34;</span><br />
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
                      <button className="btn btn-primary" onClick={()=>this.copyTextHandler("prodcat")}>Copy</button>
                        <div className="text-left bg-light border p-1 mt-2" id="prodcat">
                            var products1 = &#123;<br />
                            "header": "Products",<br />
                            "products":&#91;<br />
                            {newArr}<br />
                            &#93;&#125;
                        </div>
                  
              
                  </Auxx>}
 
         
      </div>
      );
    }
}
 
export default Data;