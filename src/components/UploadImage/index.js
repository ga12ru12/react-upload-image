import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import errorIC from './icons/ic-error.svg';
import successIC from './icons/ic-success.svg';
import './index.css';

class UploadImage extends Component{
  constructor(props){
    super(props);
    this.state = {
      contentText: 'Drag and drop photos here',
      files: []
    }
  }
  onDrop(files) {
    this.setState({
      files
    });
  }
  render(){
    return (
        <div>
          <div className="dropzone">
            <Dropzone
              accept="image/jpeg, image/png"
              onDrop={this.onDrop.bind(this)}
              className="react-upload-img"
            >
              {({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
                if (isDragActive) {
                  return (
                    <div className="react-upload-img-content-full">
                      <img src={successIC} className="react-upload-img-content-full-icon" alt="success"/>
                    </div>
                  );
                }
                if (isDragReject) {
                  return (
                    <div className="react-upload-img-content-full">
                      <img src={errorIC} className="react-upload-img-content-full-icon" alt="error"/>
                    </div>
                  );
                }
                return (
                  <div className="react-upload-img-content">
                    <div className="react-upload-img-content-text">{this.state.contentText}</div>
                    <div className="react-upload-img-content-or">or</div>
                    <label htmlFor="file">Add photos</label>
                  </div>
                );
              }}
            </Dropzone>
          </div>
        </div>
    )
  }
}

export default UploadImage