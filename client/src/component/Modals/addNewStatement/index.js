import React, { Component } from 'react';
import { emojify } from 'react-emojione';

import Papa from './papaCSVReader'
import TableReview from './tableReviewCSV'

class NewStatement extends Component {
    // States
    constructor(props) {
        super(props);
        this.state = { 
            reviewData: [],
            contact: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getReviewData = this.getReviewData.bind(this)
    }
    // Submit 
    handleSubmit(event) {
        event.preventDefault();
        console.log("contact " + JSON.stringify(this.state.contact));
    }
    // ReviewData - callback
    getReviewData(reviewCSV){
        this.setState({
            reviewData: reviewCSV
        })
    }
    // Render
    render() {
        return (
        <div>
            <div id="NewStatement" className="container modal overflowN">
                {/* Header */}
                <h4 className="m-1"> Upload </h4>
                <hr className="hr black-text text-darken" />
                {/* Content */}
                <div className="modal-content">
                    <div class="row">
                        
                        <div class="col s12">
                            <div class="row">
                                <div class="input-field col m3 s12">
                                    <Papa
                                        btnText={"Select a CSV file"}
                                        reviewData={this.getReviewData}
                                        className="blue-text text-darken-2 card-1 col m12 s12 upload grey lighten-4 waves-effect waves-dark btn-large" />
                                </div>
                                <div class="input-field col m3 s12">
                                    <i class="material-icons prefix">unfold_more</i>
                                    <select name="staType">
                                        <option value="1">Option 1</option>
                                        <option value="2">Option 2</option>
                                        <option value="3">Option 3</option>
                                    </select>
                                    <label for="autocomplete-input">Type</label>
                                </div>
                                <div class="input-field col m3 s12">
                                    <i class="material-icons prefix">date_range</i>
                                    <input name="staDate" type="text" id="staDate" class="datepicker" />
                                    <label for="datepicker1">Date</label>
                                </div>
                                <div class="input-field col m3 s12">
                                    <i class="material-icons prefix">add_comment</i>
                                    <input type="text" id="staComment" name="staComment" />
                                    <label for="autocomplete-input">lalala... </label>
                                </div>
                            </div>
                        </div>
                        <div className={this.state.reviewData == "" ? "hide" : "col s12 m12"}>
                            
                            <div className="row ">
                                <div className="center-align">
                                    <button class="card-1 waves-effect waves-teal btn-flat card-panel blue lighten-5">
                                        Review and upload <i class="material-icons right">send</i>
                                    </button>
                                </div>
                                <div className="center-align">
                                    <TableReview
                                        reviewCSV={this.state.reviewData}
                                        className={"Table"} />
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default NewStatement;
