import React, { Component } from 'react';

export class BwmFileUpload extends Component {
    constructor() {
        super();
    
        this.setupReader()
    
        this.state = {
            selectedFile: undefined,
            imageBase64: '',
            initialImageBase64: '',
            croppedImage: {},
            pending: false,
            status: 'INIT',
            crop: {}
        }
    
        this.onChange = this.onChange.bind(this);
    }

    setupReader() {
        this.reader = new FileReader();
    
        this.reader.addEventListener('load', (event) => {
            const { initialImageBase64 } = this.state;
        
            const imageBase64 = event.target.result;
        
            if (initialImageBase64) {
                this.setState({imageBase64});
            } else {
                this.setState({imageBase64, initialImageBase64: imageBase64});
            }
        });
    }

    onChange(event) {
        const {input: {onChange}} = this.props
        onChange('https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/13/image.jpeg')
    }

    render() {
        const {label, meta: {touched,error}} = this.props
        return(
            <div className='form-group'>
                <label>{label}</label>
                <div className='input-group'>
                    <input type='file' 
                           accept='.jpg, .png, .jpeg'
                           onClick={this.onChange} />
                </div>
                     {touched &&
                        ((error && <div className='alert alert-danger'>{error}</div>))}
            </div>
        )
    }
}