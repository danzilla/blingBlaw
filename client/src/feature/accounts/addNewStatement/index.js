// Content page
// 
// React 
import React, { Component } from 'react'
// Global-Style Materialize
import Materialize from '../../../util/Materialize'

import Papa from './papaCSVReader'
import TableReview from './tableReviewCSV'

// Content
class Content extends Component {
  // state
  constructor(props) {
    super(props)
      this.state = {
          reviewData: [],
          statementInfo: {
              staType: "",
              staComment: "",
              staDate: ""
          },
          pageMesage: ""
      }
  }
  // Handle Events 
  // On Event update the states for input
  handleChange = (propertyName, event) => {
    const statementInfo = this.state.statementInfo;
    statementInfo[propertyName] = event.target.value;
    this.setState({ statementInfo: statementInfo });
  }
  // ReviewData - callback
  // Get child-componets review-data  
  getReviewData = (reviewCSV) => {
    this.setState({
      reviewData: reviewCSV
    })
  }
  // Rrrr
  render() {
    return (
    <div>
      <ul class="collapsible popout">
        <li>
          <div class="collapsible-header">
            <i class="material-icons ">filter_drama</i>
            Upload a statement
            <i class="material-icons ">arrow_drop_down</i>
          </div>
          <div class="collapsible-body">
            {/* Header */}
            <h4 className="black-text text-darken"> Upload </h4>
            <hr className="hr black-text text-darken" />
            {/* Content */}
            <div className="row">
              
              <div className="col s12">
                <div className="input-field col m3 s12">
                  <Papa
                    btnText={"Select a CSV file"}
                    reviewData={this.getReviewData}
                    className="blue-text text-darken-2 card-1 col m12 s12 upload grey lighten-4 waves-effect waves-dark btn-large" />
                </div>
                <div className="input-field col m3 s12">
                  <i className="material-icons prefix">unfold_more</i>
                  <select name="staType" value={this.state.statementInfo.staType}
                    onChange={this.handleChange.bind(this, 'staType')}>
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
                    <option value="3">Option 3</option>
                  </select>
                  <label htmlFor="autocomplete-input">Type</label>
                </div>
                <div className="input-field col m3 s12">
                  <i className="material-icons prefix">date_range</i>
                  <input name="staDate" type="date" id="staDate"
                    value={this.state.statementInfo.staDate}
                    onChange={this.handleChange.bind(this, 'staDate')} />
                </div>
                <div className="input-field col m3 s12">
                  <i className="material-icons prefix">add_comment</i>
                  <input type="text" id="staComment" name="staComment"
                    value={this.state.statementInfo.staComment}
                    onChange={this.handleChange.bind(this, 'staComment')} />
                  <label htmlFor="autocomplete-input">lalala... </label>
                </div>
                {/* err */}
                <div className="center-align col s12 pink-text text-lighten-2">
                  {this.state.pageMesage}
                </div>
              </div>
              
              <div className={this.state.reviewData == "" ? "hide" : "col s12 m12 pink lighten-5"}>
                <div className="center-align">
                  {/*  onClick={this.submitReviewTransaction} */}
                  <button
                    className="card-1 waves-effect waves-teal btn-flat card-panel blue lighten-5">
                    Review and upload <i className="material-icons right">send</i>
                  </button>
                </div>
                <div className="center-align">
                  <TableReview
                    reviewCSV={this.state.reviewData}
                    className="Table" />
                </div>
              </div>

            </div>

          </div>
        </li>
      </ul>
    </div>
    );
  }
}
// Bling
export default Content;
