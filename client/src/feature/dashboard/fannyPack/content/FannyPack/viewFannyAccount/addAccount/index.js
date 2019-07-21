import React, { Component, Fragment } from 'react'
import { emojify } from 'react-emojione';
// viewAccounts
class viewAccounts extends Component {
    constructor(props) {
      super(props)
      this.state = { Content: "Content"}
    }
  // Raaar
  render() {
    return (
      <Fragment>

        <div className="container p-1">
          <div className="pink accent-2 btn-large col m10 s10">
            <span id={this.props.fannyPack.activeFannyPackSerial}>
              Add new account to 
            </span>
            {this.props.fannyPack.activeFannyPackName}
          </div>
          <button onClick={this.submitNewFannyPack} name="action"
            className="blue-text text-darken-4 transparent btn-large waves-effect waves-dark z-depth-4">
            <i className="material-icons center-align">add</i>
          </button>
        </div>

      </Fragment>
    );
  }
}
export default viewAccounts;
