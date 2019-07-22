import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { emojify } from 'react-emojione';
// viewAccounts
class viewAccounts extends Component {
  constructor(props) {
    super(props)
    this.state = { Content: "Content"}
  }

  // Fetch FannyPacks's Accounts
  getUserFannyPackAccounts = () => {
    axios.post('http://localhost:5000/fannypack/view', {
      userSerial: "sessionData.user_serial"
    })
    // if any response
    .then((response) => {
      console.log("JSON-response: " + JSON.stringify(response));
    })
    // catch error
    .catch((error) => {
      console.log("JSON-error: " + JSON.stringify(error));
    });
  }
  // componentDidMount
  componentDidMount() {
    // Fetch userFannyPackAccounts
    this.getUserFannyPackAccounts();
  }
  // Raaar
  render() {
    return (
      <Fragment>

        <p>SELECT * FROM Fanny_{this.props.fannyPack.activeFannyPackSerial}.account_record_table</p>
        <p>activeFannyPack: {JSON.stringify(this.props.fannyPack.activeFannyPackSerial)}</p>
        <p>activeUserData-user_serial: {JSON.stringify(this.props.fannyPack.activeUserData.user_serial)}</p>
        
        
        <div className="row">
          <div className="btn-large col m2 s2 pink lighten-3">
            <span id={this.props.fannyPack.activeFannyPackSerial}>
              Type {this.props.fannyPack.activeFannyPackName}
            </span>
            
          </div>
          <div className="btn-large col m8 s8 pink lighten-3">

            view_transaction_table get - account_serial
            
            <span id={this.props.fannyPack.activeFannyPackSerial}>
              Add new account to 
            </span>
            {this.props.fannyPack.activeFannyPackName}
          </div>
          <button onClick={this.props.activeShowAccount} name="action"
            className="blue-text text-darken-4 transparent btn-large waves-effect waves-dark z-depth-4">
            {emojify(':purse:')}
          </button>
        </div>

      </Fragment>
    );
  }
}
export default viewAccounts;
