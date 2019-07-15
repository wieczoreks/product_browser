import React, {Component} from 'react';
import Modal from '../../UI/Modal/Modal';
import Auxx from '../Auxx';


const withErrorHandler = (WrappedComponent, axios ) => {
    return class extends Component{
        constructor(props){
            super(props)
            this.reqInter = axios.interceptors.request.use(req=>{
                this.setState({error:null});
                return req
            })
            this.respInter = axios.interceptors.response.use(resp=>resp, (error)=>{
                this.setState({error:error});
            })
        }

        state = {
            error:null
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInter);
            axios.interceptors.response.eject(this.respInter);
        }

       // componentWillMount(){
         //   axios.interceptors.request.use(req=>{
           //     this.setState({error:null});
             //   return req
            //})
            //axios.interceptors.response.use(resp=>resp, (error)=>{
              //  this.setState({error:error});
            //})
        //}

        dissmissError = () => {
            this.setState({error:null}); 
        }
        
        render(){
            
            return (
            <Auxx>
                <Modal 
                    show={this.state.error}
                    clicked={this.dissmissError}>
                   {this.state.error ? this.state.error.message:null}
                </Modal>
                <WrappedComponent {...this.props} />  
            </Auxx>
            )
            ;

        }
    }
}

export default withErrorHandler;