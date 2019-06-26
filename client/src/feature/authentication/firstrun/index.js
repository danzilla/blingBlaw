import React, { Component } from 'react';
import { emojify } from 'react-emojione';
// CheckList
import FirstRunForm from './firstRunForm';
// FirstRun
class FirstRun extends Component {
  // states
  constructor(props) {
    super(props)
    this.state = { pageName: "FirstRun" }
  }
  // componentDidMount
  componentDidMount() {
    this.props.updateAlertMessage({ pageMessage: "First run - Inital Database pages" })
  }
  // First Run
  render() {
    return (
      <div className="valign-wrapper w-100 h-100">
        <div className="valign w-100">
          <div className="container">

            <div className="row">
              <div className="col m4 offset-m4 s8 offset-s2">
                <div className="card card-1 z-depth-4">
                  <div className="card-content">
                    
                    {/* contents */}
                    <div className="container">
                      {/* Heading */}
                      <h5 className="card-title black-text">
                        Initial app config {emojify(':hot_pepper:')}
                      </h5>
                      {/* assets config */}
                      <FirstRunForm 
                        updateAlertMessage={this.props.updateAlertMessage}
                        activeLoginPage={this.props.activeLoginPage}
                        activeRegisterPage={this.props.activeRegisterPage}
                        activFirstRunPage={this.props.activFirstRunPage} />
                    </div>
                    
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
export default FirstRun;
