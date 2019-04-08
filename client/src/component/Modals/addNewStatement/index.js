import React, { Component } from 'react';
import { emojify } from 'react-emojione';

import CSVReader from 'react-csv-reader'

import Papa from './papa'


class NewStatement extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            value1: '',
            value2: '',
            value3: '',
            value4: '',
            contact: {},
            data: {}
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        console.log(this.state.value1)
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log("contact " + JSON.stringify(this.state.contact));
    }
    

    handleChange = (propertyName, event) => {
        const contact = this.state.contact;
        contact[propertyName] = event.target.value;
        this.setState({ contact: contact });
    }   

    handleForce = data => {

        this.setState({ data: data });

        console.log("Data: " + this.state.data);
    };
    
    
    render() {
        return (
            <div>
                <div id="NewStatement" className="w-50 modal card-1">
                   
                    <div className="">
                        <h4 className="p-1">
                            {emojify('💰')} Add CSV                           
                        </h4>
                        <hr className="hr black-text text-darken" />
                    </div>

                    <div className="modal-content ">
                        <form id="uploadStatement" onSubmit={this.handleSubmit}>
                           
                            <div className="row center-align">
                                <div className="input-field col s6 s6">
                                    <input type="text"
                                        name="value1"
                                        className="datepicker"
                                        onChange={this.handleChange} />
                                    <label>Date</label>
                                </div>
                                <div className="input-field col s6 s6">
                                    <select name="value2" onChange={this.handleChange}>                                        
                                        <option value="" disabled selected>Type</option>
                                        <option value="1">Option 1</option>
                                        <option value="2">Option 2</option>
                                        <option value="3">Option 3</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row center-align">
                                <div className="input-field col m6 s6">
                                    <textarea id="textarea2" 
                                        className="materialize-textarea"
                                        name="value3"
                                        onChange={this.handleChange}></textarea>
                                    <label for="textarea2">Note </label>
                                </div>
                                <div className="file-field input-field col m6 s6">
                                    <div className="btn waves-effect waves-light">
                                        <span>
                                            <i className="material-icons">file_upload</i>
                                        </span>
                                        <input type="file" 
                                            name="value4"
                                            onChange={this.handleChange} />
                                    </div>
                                    <div className="file-path-wrapper">
                                        <input className="file-path validate" type="text" />
                                        <label>Upload statement (.csv)</label>
                                    </div>
                                </div>
                            </div>

                            <Papa className="bg-info" />


                        </form>
                    </div>

                    <div className="modal-footer ">
                        <div className="center-align">
                            <button onClick={this.handleSubmit} type="submit" for="uploadStatement"
                                className="waves-effect waves-dark btn light-blue darken-3">
                              Review
                             </button> 
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default NewStatement;
