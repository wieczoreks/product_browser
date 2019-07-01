import React, {Component} from 'react';
 
class MicroTool extends Component {
 
    constructor(props){
 
      super(props)
        this.state = {
            files:[]
        }
    }
 
    fileHandler = (e) =>{
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            let files = e.target.files;
            let copyStateFilesArr = [...this.state.files]
            copyStateFilesArr.push(files)
            console.log(copyStateFilesArr,"AFTER PUSH")
            this.setState({files:files})
          } else {
            alert('The File APIs are not fully supported in this browser.');
          } 
    }

    render(){ 
        console.log(this.state.files)
    let files = [this.state.files].map(el=>{
        console.log(el)
        return (
            
        <div>
            <output>{el.lastModifiedDate}</output>
        </div>)
    })
     return (
      <div> 
          <input onChange={this.fileHandler} type="file" />
          {this.state.files.length===0 ? null:files}
      </div>
      );
    }
}
 
export default MicroTool;