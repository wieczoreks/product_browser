import React, {Component} from 'react';
import axios from '../../axios-products';
import Spinner from '../../UI/Spinner/Spinner';
import Auxx from '../../hoc/Auxx';
import Modal from '../../UI/Modal/Modal';
import CategorySummary from '../../components/CategorySummary/CategorySummary';
import Categories from "../../components/Categories/Categories";
import CategoryControls from '../../components/CategoryControls/CategoryControls';
import NewCategory from '../../components/NewCategory/NewCategory';

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
            newCatClicked:false,
            str:"",
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
      
      if(this.state.loading===true && this.state.lan !== this.state.firebaseLan){ 
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
        if(id){
          newCatArr[index].collapse=true;
            this.setState({cat:newCatArr});
      } 
    }

    rollUpHandler = (id, index) => {  
      let newCatArr = [...this.state.cat];
      if(id){ 
        newCatArr[index].collapse=false;
        this.setState({cat:newCatArr})
      }
      }
      cat1RollDownHandler = (id, index, cat1Index) => {
        let newCatArr = [...this.state.cat]; 
        if(id){
          newCatArr[index].cat1[cat1Index].collapse=true;
            this.setState({cat:newCatArr});
      } 
    }

    cat1RollUpHandler = (id, index, cat1Index) => {
      let newCatArr = [...this.state.cat];
      if(id){ 
        newCatArr[index].cat1[cat1Index].collapse=false;
        this.setState({cat:newCatArr})
      }
      }
      
      cat2RollDownHandler = (id, index, cat1Index,cat2Index) => {
        let newCatArr = [...this.state.cat];
        
        if(id){
          newCatArr[index].cat1[cat1Index].cat2[cat2Index].collapse=true;
            this.setState({cat:newCatArr});
      } 
    }

    cat2RollUpHandler = (id, index, cat1Index, cat2Index) => {
      let newCatArr = [...this.state.cat];
      if(id){ 
        newCatArr[index].cat1[cat1Index].cat2[cat2Index].collapse=false;
        this.setState({cat:newCatArr})
      }
      }
      
      cat3RollDownHandler = (id, index, cat1Index, cat2Index, cat3Index) => {
        let newCatArr = [...this.state.cat];
        if(id){
          newCatArr[index].cat1[cat1Index].cat2[cat2Index].cat3[cat3Index].collapse=true;
            this.setState({cat:newCatArr});
      } 
    }

    cat3RollUpHandler = (id, index, cat1Index, cat2Index, cat3Index) => {
      let newCatArr = [...this.state.cat];
      if(id){ 
        newCatArr[index].cat1[cat1Index].cat2[cat2Index].cat3[cat3Index].collapse=false;
        this.setState({cat:newCatArr})
      }
      }
     
      editCategoryHandler = (el,str) => { 
          this.setState({curCategory:el, str:str, modalClicked:true})
      }

      addCatHandler = (el,str) => {
        this.setState({newCatClicked:true, str:str,curCategory:el})
      }

      addMainCatHandler= (str) => {
        this.setState({newCatClicked:true, str:str})
      }

      newCategorySubmitHandler = (cat,str) => {
        let copyArr;
        let newCat = {
          id:cat.catCID,
          cid:cat.catCID,
          name: cat.catName,
          url:cat.catUrl,
          collapse:false
        }

        switch(cat.catLan){
          case "English":
            copyArr = [...this.state.catEN];
            break;
          case "German":
            copyArr =[...this.state.catDE];
            break;
          default:
            break;
          }

        if(str === "main"){
          copyArr.push(newCat);
        } else if ( str==="cat1" ){
          copyArr.forEach((el)=>{
          if(el.id===this.state.curCategory.id){
              if(el.hasOwnProperty("cat1")){
                  el.cat1.push(newCat);
                  el.collapse=true
                } else {
                  el.cat1 = [];
                  el.cat1.push(newCat)
                  el.collapse=true
                }
              }
              }) 
        } else if (str === "cat2"){
          copyArr.forEach(el=>{
            if(el.hasOwnProperty("cat1")){
              el.cat1.forEach(cat1El=>{
                if( cat1El.id=== this.state.curCategory.id){
                  if(cat1El.hasOwnProperty("cat2")){
                    cat1El.cat2.push(newCat);
                    cat1El.collapse=true
                  } else {
                    cat1El.cat2 = [];
                    cat1El.cat2.push(newCat)
                    cat1El.collapse=true
                  }
                }
              })
            }
          })
        } else if (str === "cat3" ){
          copyArr.forEach(el=>{
            if(el.hasOwnProperty("cat1")){
              el.cat1.forEach(cat1El=>{
                if(cat1El.hasOwnProperty("cat2")){
                  cat1El.cat2.forEach(cat2El=>{

                    if( cat2El.id=== this.state.curCategory.id){
                      if(cat2El.hasOwnProperty("cat3")){
                        cat2El.cat3.push(newCat);
                        cat2El.collapse=true
                      } else {
                        cat2El.cat3 = [];
                        cat2El.cat3.push(newCat)
                        cat2El.collapse=true
                      }
                    }

                  })
                }
              
              })
            }
          })
        }
            
        if(cat.catLan==="English"){
           this.setState({cat:copyArr, catEN:copyArr});
          axios.put("/en/category.json", copyArr ).then(resp=>{
           }).catch(err => {
             this.setState({error:true})
           })    
        } else if(cat.catLan==="German"){
                   
          this.setState({cat:copyArr, catDE:copyArr});
          axios.put("/de/category.json", copyArr ).then(resp=>{
           }).catch(err => {
             this.setState({error:true})
           })   
        }
      }

    modalClosedCategorySummaryHandler = () => {
        
      this.setState({modalClicked:false});
    }
    modalClosedNewCategoryHandler = () =>{
      this.setState({newCatClicked:false});
    }
    deleteCategoryHandler=(cat)=>{
      console.log(cat,cat.catStr,"deleteCategoryHandler");
      let copyArr;
      switch(cat.catLan){
        case "English":
          copyArr = [...this.state.catEN];
          break;
        case "German":
          copyArr =[...this.state.catDE];
          break;
        default:
          break;
        }

      if(cat.catStr==="main"){
          copyArr.forEach( el => {
            if(el.id===cat.catId){
                copyArr.splice(copyArr.indexOf(el),1);
            }                
          })
      } else if (cat.catStr==="cat1"){
        copyArr.forEach( el => {
          if(el.hasOwnProperty("cat1")){
            el.cat1.forEach(cat1El=>{
               if(cat1El.id===cat.catId){
                 el.cat1.splice(el.cat1.indexOf(cat1El),1);
                 if(el.cat1.length===0){
                  delete el.cat1
                 }
                  el.collapse=true;
                 }
             })  
          } 
                        
        })
      } else if ( cat.catStr==="cat2"){
        copyArr.forEach(el=>{
          if(el.hasOwnProperty("cat1")){
            el.cat1.forEach(cat1El=>{
              if(cat1El.hasOwnProperty("cat2")){
                cat1El.cat2.forEach(cat2El=>{
                  if(cat2El.id===cat.catId){
                    cat1El.cat2.splice(cat1El.cat2.indexOf(cat2El),1);
                    if(cat1El.cat2.length===0){
                     delete cat1El.cat2;
                     cat1El.collapse=false;
                    }
                     cat1El.collapse=true;
                    }
                })
              }
            })
          }
        })
      } else if (cat.catStr=== "cat3"){
        copyArr.forEach( el => {
          if(el.hasOwnProperty("cat1")){
            el.cat1.forEach(cat1El=>{
              if(cat1El.hasOwnProperty("cat2")){
                cat1El.cat2.forEach(cat2El=>{
                  if(cat2El.hasOwnProperty("cat3")){
                    cat2El.cat3.forEach(cat3El=>{
                      if(cat3El.id===cat.catId){
                        cat2El.cat3.splice(cat2El.cat3.indexOf(cat3El),1);
                        if(cat2El.cat3.length===0){
                         delete cat2El.cat3;
                         cat2El.collapse=false;
                        }
                         cat2El.collapse=true;
                        }
                    })
                  }
                })
              }
            })
          }
        })
      }
      if(cat.catLan==="English"){
        this.setState({cat:copyArr, catEN:copyArr});
       axios.put("/en/category.json", copyArr ).then(resp=>{
        }).catch(err => {
          this.setState({error:true})
        })    
     } else if(cat.catLan==="German"){
                
       this.setState({cat:copyArr, catDE:copyArr});
       axios.put("/de/category.json", copyArr ).then(resp=>{
        }).catch(err => {
          this.setState({error:true})
        })   
     }
    }
    updateCategorySubmitHandler = (cat,str) => {
      console.log(cat,str,"updateCategorySubmitHandler");
      let catUpdate = {
        id:cat.catId,
        cid:cat.catCID,
        name:cat.catName,
        url:cat.catUrl,
        collapse:false
      }

      let copyArr;
      switch(cat.catLan){
        case "English":
          copyArr = [...this.state.catEN];
          break;
        case "German":
          copyArr =[...this.state.catDE];
          break;
        default:
          break;
        }

      if(cat.catStr==="main"){
          copyArr.forEach( el => {
            if(el.id===cat.catId){
                copyArr.splice(copyArr.indexOf(el),1);
                copyArr.push(catUpdate)
            }                
          })
      } 
      else if (cat.catStr==="cat1"){
        copyArr.forEach( el => {
          if(el.hasOwnProperty("cat1")){
            el.cat1.forEach(cat1El=>{
               if(cat1El.id===cat.catId){
                 el.cat1.splice(el.cat1.indexOf(cat1El),1);
                 if(el.cat1.length===0){
                  delete el.cat1
                 }
                  el.collapse=true;
                 }
             })  
          } 
                        
        })
      } else if ( cat.catStr==="cat2"){
        copyArr.forEach(el=>{
          if(el.hasOwnProperty("cat1")){
            el.cat1.forEach(cat1El=>{
              if(cat1El.hasOwnProperty("cat2")){
                cat1El.cat2.forEach(cat2El=>{
                  if(cat2El.id===cat.catId){
                    cat1El.cat2.splice(cat1El.cat2.indexOf(cat2El),1);
                    if(cat1El.cat2.length===0){
                     delete cat1El.cat2;
                     cat1El.collapse=false;
                    }
                     cat1El.collapse=true;
                    }
                })
              }
            })
          }
        })
      } else if (cat.catStr=== "cat3"){
        copyArr.forEach( el => {
          if(el.hasOwnProperty("cat1")){
            el.cat1.forEach(cat1El=>{
              if(cat1El.hasOwnProperty("cat2")){
                cat1El.cat2.forEach(cat2El=>{
                  if(cat2El.hasOwnProperty("cat3")){
                    cat2El.cat3.forEach(cat3El=>{
                      if(cat3El.id===cat.catId){
                        cat2El.cat3.splice(cat2El.cat3.indexOf(cat3El),1);
                        if(cat2El.cat3.length===0){
                         delete cat2El.cat3;
                         cat2El.collapse=false;
                        }
                         cat2El.collapse=true;
                        }
                    })
                  }
                })
              }
            })
          }
        })
      }
      if(cat.catLan==="English"){
        this.setState({cat:copyArr, catEN:copyArr});
       axios.put("/en/category.json", copyArr ).then(resp=>{
        }).catch(err => {
          this.setState({error:true})
        })    
     } else if(cat.catLan==="German"){
                
       this.setState({cat:copyArr, catDE:copyArr});
       axios.put("/de/category.json", copyArr ).then(resp=>{
        }).catch(err => {
          this.setState({error:true})
        })   
     }
    }
    passLanguageHandler=(inputVal)=>{
      console.log(inputVal,"passLanguageHandler");
      this.setState({firebaseLan:inputVal, loading:true})
    }
 
    
    render(){
      console.log("RENDER", this.state.str)
    return (  
        <Auxx>
                <Modal show={this.state.newCatClicked} clicked={this.modalClosedNewCategoryHandler}>
                    <NewCategory
                        str={this.state.str} 
                        newCategorySubmitHandler={this.newCategorySubmitHandler}
                        closedModal={this.modalClosedNewCategoryHandler}
                        />
                </Modal>
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
               addMainCatHandler={this.addMainCatHandler}
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
                editCategoryHandler={this.editCategoryHandler}
                addCatHandler={this.addCatHandler} />
            </Auxx>}
        </Auxx>
        );
    }
}
export default CategoryBrowser;