import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import _ from 'lodash';
import errorIC from './icons/ic-error.svg';
import successIC from './icons/ic-success.svg';
import removeIC from './icons/ic-remove.svg';
import './index.css';

class UploadImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentText: 'Drag and drop photos here',
      files: [],
    };
  }

  componentDidUpdate(prevProps, prevState) {
    this.props.onChange(prevState.files);
  }

  onDrop(files) {
    const updateFiles = _.reduce(
      files,
      (result, file) => {
        if (
          _.find(this.state.files, fileState => {
            return fileState.name === file.name;
          })
        ) {
          return result;
        }
        return [...result, file];
      },
      [],
    );
    this.setState({
      files: _.concat(this.state.files, updateFiles),
    });
  }

  removeImg(nameImg) {
    console.log(nameImg);
    const updateFiles = _.reduce(
      this.state.files,
      (result, file) => {
        if (file.name === nameImg) {
          return result;
        }
        return [...result, file];
      },
      [],
    );
    this.setState({
      files: updateFiles,
    });
  }

  previewImg() {
    return this.state.files.map(file => {
      return (
        <div
          className="preview-img"
          style={{
            backgroundImage: 'url(' + file.preview + ')',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
          }}
          key={file.name}
        >
          <div className="preview-img-hover">
            <label
              className="preview-img-hover-remove-bg"
              onClick={() => this.removeImg(file.name)}
            >
              <img
                src={removeIC}
                className="preview-img-hover-remove-icon"
                alt="remove"
              />
            </label>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="react-upload-img-component">
        <Dropzone
          accept="image/jpeg, image/png"
          onDrop={this.onDrop.bind(this)}
          className="react-upload-img"
        >
          {({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
            if (isDragActive) {
              return (
                <div className="react-upload-img-content-full">
                  <img
                    src={successIC}
                    className="react-upload-img-content-full-icon"
                    alt="success"
                  />
                </div>
              );
            }
            if (isDragReject) {
              return (
                <div className="react-upload-img-content-full">
                  <img
                    src={errorIC}
                    className="react-upload-img-content-full-icon"
                    alt="error"
                  />
                </div>
              );
            }
            return (
              <div className="react-upload-img-content">
                <div className="react-upload-img-content-text">
                  {this.state.contentText}
                </div>
                <div className="react-upload-img-content-or">or</div>
                <label htmlFor="file">Add photos</label>
              </div>
            );
          }}
        </Dropzone>
        {this.previewImg()}
      </div>
    );
  }
}

UploadImage.propTypes = {
  onChange: PropTypes.func,
};

export default UploadImage;
