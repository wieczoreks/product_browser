import React, {Component} from 'react';
import  './MicroTool.css';


class MicroTool extends Component {
 
    constructor(props){
 
      super(props)
        this.state = {
            files:{
                lastModified:null,
                lastModifiedDate:null,
                name:null,
                size:null,
                type:null,

            },
            res:null
        }
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

    fileHandler = (evt) =>{
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            let result;
            let files = evt.target.files[0];
            let newObj={
                lastModified:files.lastModified,
                lastModifiedDate:files.lastModifiedDate.toLocaleDateString(),
                name:files.name,
                size:files.size,
                type:files.type,
           }
           let reader = new FileReader();
           let progress = document.querySelector('.percent');
           let progress_bar = document.querySelector('#progress_bar');
           reader.onprogress=function(evt){
            if (evt.lengthComputable) {
                let percentLoaded = Math.round(( evt.loaded / evt.total ) * 100);
                console.log(percentLoaded,"percentLoaded")
                if (percentLoaded < 100) {
                  progress.style.width = percentLoaded + 'px';
                  progress.textContent = percentLoaded + '%';
                }else if(percentLoaded===100){
                    progress.style.width = percentLoaded + '%';
                  progress.textContent = percentLoaded + '%';
                }
              }
           }
          
           reader.onload = (function(theFile){
               return function(e){
                    result = e.target.result
                    let el = document.createElement('pre')
                    el.innerHTML= result
                    document.getElementById("result").appendChild(el)
                    
                }
 
           })(files)
           reader.onloadstart = function(e) {
            document.getElementById('progress_bar').className = "loading";
          };
          reader.onloadend = function(evt){
                        progress_bar.style.opacity = 0;
              }
           
           reader.readAsText(files,"utf-8")
          
            this.setState({files:newObj})
          } else {
            alert('The File APIs are not fully supported in this browser.');
          } 
    }
    handleDragOver = (e) => {
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy'; 
        
    }
    handleFileSelect = (e) => {
        e.stopPropagation();
        e.preventDefault();
        
        let files = e.dataTransfer.files;
        
        let newObj={
            lastModified:files[0].lastModified,
            lastModifiedDate:files[0].lastModifiedDate.toLocaleDateString(),
            name:files[0].name,
            size:files[0].size,
            type:files[0].type,
           }

        this.setState({
            files:newObj
        })
    }

    render(){ 
      
        let date;        
        let newDate;
        let fileDetails;
        if(this.state.files.lastModified!==undefined){
            date = new Date(this.state.files.lastModified);
            date.setTime(this.state.files.lastModified);
            newDate = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`;
            fileDetails = (
            <div className="card m-2 w-50 text-left">
                <div className="card-body">
                    <div>Last Modified on: { date.getTime()===0 ? null:newDate } </div>
                    <div>Last Modified Date: { this.state.files.lastModifiedDate }</div>
                    <div>File name: { this.state.files.name }</div>
                    <div>File size: { this.state.files.size }</div>
                    <div>File type: { this.state.files.type }</div>
                </div>
            </div>)
        } else {
            date=null
            newDate=null;
            fileDetails=null;
        }

     return (
        <div className="text-left"> 
            <button className="btn btn-primary mr-2" onClick={()=>this.copyTextHandler("result")}>Copy</button>
            <div className="form-group m-2">
            <input className="input-form"
                onChange={this.fileHandler} 
                type="file" /></div>
            <div 
                onDrop={this.handleFileSelect}
                onDragOver={this.handleDragOver}  
                id="dragZone" style={{border:"1px dashed grey"}} 
                className="card w-100 m-2">
                <div className="card-body">
                Please drag file here
                </div>
            </div>
                {fileDetails}
            <div id="progress_bar"><div className="percent">0%</div></div>
            <div id="result"></div>
        </div>
      );
    }
}
 
export default MicroTool;