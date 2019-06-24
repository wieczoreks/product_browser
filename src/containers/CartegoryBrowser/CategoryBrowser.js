import React, {Component} from 'react';
import axios from '../../axios-products';
import Spinner from '../../UI/Spinner/Spinner';
import Auxx from '../../hoc/Auxx';
import Modal from '../../UI/Modal/Modal';
import CategorySummary from '../../components/CategorySummary/CategorySummary';
import Categories from "../../components/Categories/Categories";
import CategoryControls from '../../components/CategoryControls/CategoryControls';

class CategoryBrowser extends Component {
    constructor(props){
        super(props);
        this.state = {
            cat:[],
            catEN:[],
            catDE:[],
            firebaseLan:"English",
            lan:"English",
            loading:true,
            curCategory:null,
            modalClicked:false,
            str:null,
            error:false
        }
    }

    componentDidMount() {
       
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

    componentDidUpdate(){
      console.log(this.state.loading, "loading",this.state.lan,"lan",this.state.firebaseLan,"firebaseLan","COMPONENT DID UPDATE [Category browser]")
      if(this.state.loading===true && this.state.lan != this.state.firebaseLan){ 
        if(this.state.firebaseLan==="German"){
         
          this.setState({
            lan:this.state.firebaseLan, 
            loading:false, 
            cat:this.state.catDE 
            })
  
        }else if(this.state.firebaseLan==="English"){
        
          this.setState({
            lan:this.state.firebaseLan, 
            loading:false, 
            cat:this.state.catEN})
          }

      }
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
     
      editCategoryHandler = (el,str) => {
       
        this.setState({curCategory:el, str:str, modalClicked:true})
    }
   
    modalClosedCategorySummaryHandler = () => {
        
      this.setState({modalClicked:false});
    }
    deleteCategoryHandler=()=>{
      console.log("deleteCategoryHandler");
      
    }
    updateCategorySubmitHandler = () => {
      console.log("updateCategorySubmitHandler");
    }
    passLanguageHandler=(inputVal)=>{
      console.log(inputVal,"passLanguageHandler");
      this.setState({firebaseLan:inputVal, loading:true})
    }

    newCatHandler=()=>{
      console.log("newCatHandler")
    }

    render(){
console.log(this.state.lan,"RENDER LAN",this.state.firebaseLan,"firebaseLan")
    return (  
        <Auxx>
           <Modal show={this.state.modalClicked} clicked={this.modalClosedCategorySummaryHandler}>
                    {this.state.modalClicked ?
                    <CategorySummary
                        str={this.state.str}
                        category={this.state.curCategory}
                        timesHandler={this.modalClosedCategorySummaryHandler}
                        lan={this.state.firebaseLan}
                        deleteCategoryHandler={this.deleteCategoryHandler}
                        updateCategorySubmitHandler={this.updateCategorySubmitHandler}
                    />
                    :null}
              </Modal>
              <CategoryControls
               passLanguageHandler={this.passLanguageHandler}
               newCatHandler={this.newCatHandler}
               />      
        {this.state.loading ? this.state.error ? <p>Server error. Please refresh the page</p>:<Spinner /> :
            
            <Auxx>
             
              <Categories 
                catArr={this.state.cat}
                rollUpHandler={this.rollUpHandler}
                rollDownHandler={this.rollDownHandler}
                cat1RollUpHandler={this.cat1RollUpHandler}
                cat1RollDownHandler={this.cat1RollDownHandler}
                cat2RollUpHandler={this.cat2RollUpHandler}
                cat2RollDownHandler={this.cat2RollDownHandler}
                cat3RollUpHandler={this.cat3RollUpHandler}
                cat3RollDownHandler={this.cat3RollDownHandler}
                editCategoryHandler={this.editCategoryHandler} />
            </Auxx>}
        </Auxx>
        );
    }
}
export default CategoryBrowser;