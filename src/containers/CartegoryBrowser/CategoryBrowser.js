import React, {Component} from 'react';
import axios from '../../axios-products';
import Spinner from '../../UI/Spinner/Spinner';
import Auxx from '../../hoc/Auxx';
import Modal from '../../UI/Modal/Modal';
import CategorySummary from '../../components/CategorySummary/CategorySummary';
import Categories from "../../components/Categories/Categories";
//import CategoryControls from '../../components/CategoryControls/CategoryControls';
import NewCategory from '../../components/NewCategory/NewCategory';
//import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actionsCat from '../../store/actions/index';
import DataControllers from '../../components/DataControllers/DataControllers';

class CategoryBrowser extends Component {
    constructor(props){
        super(props);
        this.state = {
            cat:[], 
            firebaseLan:"English",
            curCategory:null,
            modalClicked:false,
            newCatClicked:false,
            str:"",
            buttonArrList:[
              {lan:"EN", active:true, id:"catprodEN"},
              {lan:"DE", active:false, id:"catprodDE"}
              ],    
        }
    }
    componentDidMount() {
        this.props.getArrEN();
        this.props.getArrDE();
        this.setState({cat:this.props.catEN})
    }
    
  
    rollDownHandler = (id, index) => {
      let newCatArr;
      if(this.state.firebaseLan==="English"){
        newCatArr = [...this.props.catEN];
      }
      else if (this.state.firebaseLan==="German"){
        newCatArr = [...this.props.catDE];
      }
      
        if(id){
          newCatArr[index].collapse=true;
            this.setState({cat:newCatArr});
      } 
    }

    rollUpHandler = (id, index) => {  
      let newCatArr
      if(this.state.firebaseLan==="English"){
        newCatArr = [...this.props.catEN];
      }
      else if (this.state.firebaseLan==="German"){
        newCatArr = [...this.props.catDE];
      }

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

      newCategorySubmitHandler = (cat,str,lan) => {
        let copyArr;
        switch(lan){
          case "English":
            copyArr = [...this.props.catEN];
            break;
          case "German":
            copyArr =[...this.props.catDE];
            break;
          default:
            break;
          }
      
        if(str === "main"){
          copyArr.push(cat);
          
        } else if ( str==="cat1" ){
          copyArr.forEach((el)=>{
          if(el.id === this.state.curCategory.id){
            
            if(el.hasOwnProperty("cat1")){
                 let copyElCat1 = [...el.cat1] 
                  el.cat1 = copyElCat1
                  el.cat1.push(cat);
                  
                  
                } else {
                  el.cat1 = [];
                  el.cat1.push(cat)
                  
                }
              }
              }) 
        } else if ( str === "cat2" ){
          copyArr.forEach(el=>{
            if(el.hasOwnProperty( "cat1" )){
              let copyElCat1 = [...el.cat1];
              el.cat1=copyElCat1
              el.cat1.forEach(cat1El=>{
                if( cat1El.id=== this.state.curCategory.id){
                  
                  if(cat1El.hasOwnProperty("cat2")){
                    let copyElCat2 = [...cat1El.cat2]
                    cat1El.cat2 = copyElCat2
                    cat1El.cat2.push(cat);
                    
                    
                  } else {
                    cat1El.cat2 = [];
                    cat1El.cat2.push(cat)
                    
                  }
                }
              })
            }
          })
        } else if (str === "cat3" ){
          copyArr.forEach(el=>{
            
            if(el.hasOwnProperty("cat1")){
            let copyElCat1 = [...el.cat1] 
            el.cat1 = copyElCat1 
              el.cat1.forEach(cat1El=>{

                if(cat1El.hasOwnProperty("cat2")){
                  let copyElCat2 = [...cat1El.cat2] 
                  cat1El.cat1 = copyElCat2 
                  cat1El.cat2.forEach(cat2El=>{
                    
                    if( cat2El.id=== this.state.curCategory.id){
                      if(cat2El.hasOwnProperty("cat3")){
                        let copyElCat3 = [...cat2El.cat3] 
                        copyElCat3.push(cat);
                        cat2El.cat3=copyElCat3
                        
                      } else {
                        cat2El.cat3 = [];
                        cat2El.cat3.push(cat)
                        
                      }
                    }

                  })
                }
              
              })
            }
          })
        }
        this.setState({cat:copyArr})
        if(lan==="English"){
            this.props.updateCatEN(copyArr);  
        } else if(lan==="German"){
            this.props.updateCatDE(copyArr);         
            
            
        }
      }

    modalClosedCategorySummaryHandler = () => {
        
      this.setState({modalClicked:false});
    }
    modalClosedNewCategoryHandler = () =>{
      this.setState({newCatClicked:false});
    }
    deleteCategoryHandler=(cat,str,lan)=>{
  
      let copyArr;
      switch(lan){
        case "English":
          copyArr = [...this.props.catEN];
          break;
        case "German":
          copyArr =[...this.props.catDE];
          break;
        default:
          break;
        }

      if(str==="main"){
          copyArr.forEach( el => {
            if(el.id===cat.id){
                copyArr.splice(copyArr.indexOf(el),1);
            }                
          })
      } else if (str==="cat1"){
        copyArr.forEach( el => {
          if(el.hasOwnProperty("cat1")){
            let copyElCat1 = [...el.cat1] 
            el.cat1 = copyElCat1
            el.cat1.forEach(cat1El=>{
               if(cat1El.id===cat.id){
                 el.cat1.splice(el.cat1.indexOf(cat1El),1);
                 if(el.cat1.length===0){
                  delete el.cat1
                 }
                  el.collapse=true;
                 }
             })  
          } 
                        
        })
      } else if ( str==="cat2"){
        copyArr.forEach(el=>{
          if(el.hasOwnProperty("cat1")){
            let copyElCat1 = [...el.cat1] 
            el.cat1 = copyElCat1
            el.cat1.forEach(cat1El=>{
              if(cat1El.hasOwnProperty("cat2")){
                let copyElCat2 = [...cat1El.cat2] 
                cat1El.cat2 = copyElCat2
                cat1El.cat2.forEach(cat2El=>{
                  if(cat2El.id===cat.id){
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
      } else if (str=== "cat3"){
        copyArr.forEach( el => {
          if(el.hasOwnProperty("cat1")){
            let copyElCat1 = [...el.cat1] 
            el.cat1 = copyElCat1
            el.cat1.forEach(cat1El=>{
              if(cat1El.hasOwnProperty("cat2")){
                let copyElCat2 = [...cat1El.cat2] 
                cat1El.cat2 = copyElCat2
                cat1El.cat2.forEach(cat2El=>{
                  if(cat2El.hasOwnProperty("cat3")){
                    let copyElCat3 = [...cat2El.cat3] 
                    cat2El.cat1 = copyElCat3
                    cat2El.cat3.forEach(cat3El=>{
                      if(cat3El.id===cat.id){
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
      this.setState({cat:copyArr});
        if(lan==="English"){
        this.props.updateCatEN(copyArr) 
      } else if(lan==="German"){
        this.props.updateCatDE(copyArr)  
      }
    }

    updateCategorySubmitHandler = (cat,str,lan) => {
      
      let copyArr;
      switch(lan){
        case "English":
          copyArr = [...this.props.catEN];
          break;
        case "German":
          copyArr =[...this.props.catDE];
          break;
        default:
          break;
        }

      if(str==="main"){
          copyArr.forEach( el => {
            if(el.id===cat.id){
                copyArr.splice(copyArr.indexOf(el),1);
                copyArr.push(cat)
            }                
          })
      } 
      else if (str==="cat1"){
        let cat2Copy
        copyArr.forEach( el => {
         if(el.hasOwnProperty("cat1")){
           let copyElCat1 = [...el.cat1] 
           el.cat1 = copyElCat1
           el.cat1.forEach(cat1El=>{
               if(cat1El.hasOwnProperty("cat2")){
                  cat2Copy = cat1El.cat2
                   if(cat1El.id===cat.id){
                   el.cat1.splice(el.cat1.indexOf(cat1El),1);
                   el.cat1.push(cat)
                   el.cat1[el.cat1.length-1].cat2 = cat2Copy
                   }
               }else{
                 if(cat1El.id===cat.id){
                   el.cat1.splice(el.cat1.indexOf(cat1El),1);
                   el.cat1.push(cat)
                   }
               }
            
            })  
         }               
       })
     }
     else if (str==="cat2"){
       let cat3Copy;
       copyArr.forEach( el => {
         if(el.hasOwnProperty("cat1")){
          let copyElCat1 = [...el.cat1] 
          el.cat1 = copyElCat1
           el.cat1.forEach(cat1El=>{
               if(cat1El.hasOwnProperty("cat2")){
                let copyElCat2 = [...cat1El.cat2] 
                cat1El.cat2 = copyElCat2
                 cat1El.cat2.forEach(cat2El=>{
                   if(cat2El.hasOwnProperty("cat3")){
                     cat3Copy = cat2El.cat3
                     if(cat2El.id===cat.id){
                       cat1El.cat2.splice(cat1El.cat2.indexOf(cat2El),1);
                       cat1El.cat2.push(cat)
                       cat2El.collapse=true;
                       cat1El.cat2[cat1El.cat2.length-1].cat3=cat3Copy
                       }
                   }else{
                     if(cat2El.id===cat.id){
                       cat1El.cat2.splice(cat1El.cat2.indexOf(cat2El),1);
                       cat1El.cat2.push(cat)
                       cat1El.collapse=true;
                      }
                   }
                 })
               }
            })  
         }               
       })
     }
     else if (str==="cat3"){
       
       copyArr.forEach( el => {
         if(el.hasOwnProperty("cat1")){
          let copyElCat1 = [...el.cat1] 
          el.cat1 = copyElCat1
           el.cat1.forEach(cat1El=>{
               if(cat1El.hasOwnProperty("cat2")){
                let copyElCat2 = [...cat1El.cat2] 
                cat1El.cat2 = copyElCat2
                 cat1El.cat2.forEach(cat2El=>{
                   if(cat2El.hasOwnProperty("cat3")){
                    let copyElCat3 = [...cat2El.cat3] 
                    cat2El.cat3 = copyElCat3
                     cat2El.cat3.forEach(cat3El=>{
                       if(cat3El.id===cat.id){
                         cat2El.cat3.splice(cat2El.cat3.indexOf(cat3El),1);
                         cat2El.cat3.push(cat)
                       }  
                     })
                     
                   }
                 })
               }
            })  
         }               
       })
     }
      this.setState({cat:copyArr});
      if(lan==="English"){
       this.props.updateCatEN(copyArr)
     } else if(lan==="German"){       
       this.props.updateCatDE(copyArr)
     }
    }

    buttonLanChangeHandler = (bu) => {
      
      this.setState({loading:true});

      let buttonArrList = [...this.state.buttonArrList];
     
      switch(bu.lan){
        case "EN":
          buttonArrList=[
            {lan:"EN", active:true},
            {lan:"DE", active:false}
          ]
          this.setState(
            {
              buttonArrList:buttonArrList, 
              loading:false,
              firebaseLan:"English"}
            )
          break;
        case "DE":
          buttonArrList=[ {lan:"EN", active:false}, {lan:"DE", active:true} ]
          this.setState({
            buttonArrList:buttonArrList,   
            loading:false, 
            firebaseLan:"German" 
          })
        break;
      }

    }
    render(){
     let categories;
      if(this.state.firebaseLan === "English"){
        categories = this.props.catEN
     } 
     if(this.state.firebaseLan === "German"){
        categories = this.props.catDE
   } 
    return (  
        <Auxx>
                <Modal show={this.state.newCatClicked} clicked={this.modalClosedNewCategoryHandler}>
                    <NewCategory
                        lan={this.state.firebaseLan}
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
                <div className="d-flex justify-content-between">
                <DataControllers 
                    buttonLanChangeHandler={this.buttonLanChangeHandler}
                    buttonArrList={this.state.buttonArrList} />   
                <span onClick={()=>this.addMainCatHandler("main")}><i className="fas fa-plus-circle fa-2x"></i></span>
                </div>   
        {this.state.loading ? this.state.error ? <p>Server error. Please refresh the page</p>:<Spinner /> :
            
            <Auxx>
              <Categories
                catArr={categories}
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

const mapStateToProps = (state) => {

  return {
   
    catEN:state.reducerCat.catEN,
    catDE:state.reducerCat.catDE,
    loading:state.reducerCat.loading,
    error:state.reducerCat.error
  }

}
const mapDispatchToProps = (dispatch) => {

return {
    getArrEN:     () => dispatch(actionsCat.syncCatEN()),
    getArrDE:     () => dispatch(actionsCat.syncCatDE()),
    updateCatEN: (arr) => dispatch(actionsCat.syncUpdateCatEN(arr) ),
    updateCatDE: (arr) => dispatch(actionsCat.syncUpdateCatDE(arr) )
}

}

export default connect(mapStateToProps,mapDispatchToProps )(CategoryBrowser);