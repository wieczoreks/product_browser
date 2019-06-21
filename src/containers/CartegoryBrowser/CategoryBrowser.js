import React, {Component} from 'react';
import axios from '../../axios-products';
import Spinner from '../../UI/Spinner/Spinner'
import Auxx from '../../hoc/Auxx'

class CategoryBrowser extends Component {
    constructor(props){
        super(props);
        this.state = {
            cat:[],
            catEN:[],
            catDE:[],
            firebaseLan:"English",
            loading:true,
          
        }
    }

    componentDidMount() {
       
        axios.get("/en.json").then((res)=>{
          
          let recArr = [];
          for(let key in res.data.category){
            recArr.push(res.data.category[key])
          }
          this.setState({cat:recArr, loading:false, catEN:recArr, firebaseLan:res.data.lan})
        }).catch(err=>{
          
        })
        axios.get("/de.json").then((res)=>{
           
            let recArr = [];

            for(let key in res.data.category){
              recArr.push(res.data.category[key])
            }

            this.setState({catDE:recArr})
          }).catch(err=>{
        
          })
    }
    rollDownHandler = (id, index) => {
        let newCatArr = [...this.state.cat];
        console.log("rollupHandler", this.state.firebaseLan,"lan", id,"id");
        if(id){
          newCatArr[index].collapse=true;
            this.setState({cat:newCatArr});
      } 
    }

    rollUpHandler = (id, index) => {
      console.log(id,"rollupHandler");
      let newCatArr = [...this.state.cat];
      if(id){ 
        newCatArr[index].collapse=false;
        this.setState({cat:newCatArr})
      }
      }
      cat1RollDownHandler = (id, index, cat1Index) => {
     
        console.log(id,index,cat1Index,"cat1RollDownHandler");
        let newCatArr = [...this.state.cat];
        
        if(id){
          newCatArr[index].cat1[cat1Index].collapse=true;
            this.setState({cat:newCatArr});
      } 
    }

    cat1RollUpHandler = (id, index, cat1Index) => {
      console.log(id,index,cat1Index,"cat1RollUpHandler");
      let newCatArr = [...this.state.cat];
      if(id){ 
        newCatArr[index].cat1[cat1Index].collapse=false;
        this.setState({cat:newCatArr})
      }
      }
      
      cat2RollDownHandler = (id, index, cat1Index,cat2Index) => {
     
        console.log(id,index,cat1Index,cat2Index,"cat2RollDownHandler");
        let newCatArr = [...this.state.cat];
        
        if(id){
          newCatArr[index].cat1[cat1Index].cat2[cat2Index].collapse=true;
            this.setState({cat:newCatArr});
      } 
    }

    cat2RollUpHandler = (id, index, cat1Index, cat2Index) => {
      console.log(id,index,cat1Index,cat2Index,"cat2RollUpHandler");
      let newCatArr = [...this.state.cat];
      if(id){ 
        newCatArr[index].cat1[cat1Index].cat2[cat2Index].collapse=false;
        this.setState({cat:newCatArr})
      }
      }
      
      cat3RollDownHandler = (id, index, cat1Index, cat2Index, cat3Index) => {
     
        console.log(id,index,cat1Index,cat2Index,"cat3RollDownHandler");
        let newCatArr = [...this.state.cat];
        
        if(id){
          newCatArr[index].cat1[cat1Index].cat2[cat2Index].cat3[cat3Index].collapse=true;
            this.setState({cat:newCatArr});
      } 
    }

    cat3RollUpHandler = (id, index, cat1Index, cat2Index, cat3Index) => {
      console.log(id,index,cat1Index,cat2Index,"cat3RollUpHandler");
      let newCatArr = [...this.state.cat];
      if(id){ 
        newCatArr[index].cat1[cat1Index].cat2[cat2Index].cat3[cat3Index].collapse=false;
        this.setState({cat:newCatArr})
      }
      }

    render(){
     
        console.log(this.state.cat,"CAT MAIN")
        const catArr = this.state.cat.map((res,index)=>{
            return (
            <div key={res.id} className="d-flex flex-column p-1 align-items-start">
                <div className="d-flex flex-row justify-content-between shadow p-4 w-100">
                  {res.collapse ?
                  <span onClick={()=>this.rollUpHandler(res.id, index)}>
                    <i className="fas fa-caret-square-down"></i>
                  </span> :
                  <span onClick={()=>this.rollDownHandler(res.id, index)}>
                    <i className="fas fa-chevron-circle-up"></i>
                  </span>}
                  {` ${res.name} | ${res.url}`}
                  <span 
                      style={{color:"lightgrey"}}>
                    <i 
                    className="fas fa-edit" 
                    >
                    </i>
                  </span>
                </div>
                {res.cat1 && res.collapse ? <div className="d-flex flex-column p-1 ml-3 align-items-start">{res.cat1.map((cat1El,cat1Index)=>{
                  return(
                    <Auxx key={cat1El.id}>
                      <div className="shadow p-3" style={{color:"blue"}}>
                        {cat1El.collapse ?
                        <span onClick={()=>this.cat1RollUpHandler(cat1El.id, index, cat1Index)}>
                          <i className="fas fa-caret-square-down"></i>
                        </span>:
                        <span onClick={()=>this.cat1RollDownHandler(cat1El.id, index, cat1Index)}>
                        <i className="fas fa-chevron-circle-up"></i>
                        </span>}
                      {` ${cat1El.name} | ${cat1El.url}`}
                      </div>
                      {cat1El.cat2 && cat1El.collapse  ? <div className="d-flex flex-column p-1 ml-3 align-items-start">{cat1El.cat2.map((cat2El,cat2Index)=>{
                          return(
                        <Auxx key={cat2El.id}>
                          <div className="shadow p-2" style={{color:"green"}}>
                            {cat2El.collapse?
                            <span onClick={()=>this.cat2RollUpHandler(cat2El.id, index, cat1Index, cat2Index)}>
                              <i className="fas fa-caret-square-down"></i>
                            </span>:
                            <span onClick={()=>this.cat2RollDownHandler(cat2El.id, index, cat1Index, cat2Index)}>
                            <i className="fas fa-chevron-circle-up"></i>
                            </span>}
                          {` ${cat2El.name} | ${cat2El.url}`}
                          </div>
                                  {cat2El.cat3 && cat2El.collapse  ? <div className="d-flex flex-column p-1 ml-3 align-items-start">{cat2El.cat3.map((cat3El,cat3Index)=>{
                                  return(
                                <Auxx key={cat3El.id}>
                                  <div className="shadow p-1" style={{color:"red"}}>
                                    {cat3El.collapse?
                                    <span onClick={()=>this.cat3RollUpHandler(cat3El.id, index, cat1Index, cat2Index, cat3Index)}>
                                      <i className="fas fa-caret-square-down"></i>
                                    </span>:
                                    <span onClick={()=>this.cat3RollDownHandler(cat3El.id, index, cat1Index, cat2Index, cat3Index)}>
                                    <i className="fas fa-chevron-circle-up"></i>
                                    </span>}
                                  {` ${cat3El.name} | ${cat3El.url}`}
                                  </div>
                                            
                                </Auxx>)
                                })}</div>:null}  
                        </Auxx>)
                        })}</div>:null}
                   </Auxx>)
                })}</div>:null}
                
            </div>);
        })
       
    return (  
        <Auxx>     
        {this.state.loading ? this.state.error ? <p>Server error. Please refresh the page</p>:<Spinner /> :
            <Auxx>
              {catArr}
            </Auxx>}
        </Auxx>
        );
    }
}
export default CategoryBrowser;