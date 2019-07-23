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

    console.log("account/props: \n" + JSON.stringify(this.props.fannyPack));

    axios.post('http://localhost:5000/account/view', {
      userSerial: this.props.fannyPack.activeUser,
      fannyPackSerial: this.props.fannyPack.activeFannyPackSerial
      })
      // if any response
      .then((response) => {
        console.log("account/view: \n" + JSON.stringify(response));
      })
      // catch error
      .catch((error) => {
        console.log("account/view: \n" + JSON.stringify(error));
      });
  }


  // Fetch FannyPacks's Accounts
  addUserFannyPackAccounts = () => {
    axios.post('http://localhost:5000/account/add', {
      userSerial: "this.props.fannyPack.activeUser",
      fannyPackSerial: "this.props.fannyPack.activeFannyPackSerial"
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

    console.log(JSON.stringify(this.props.fannyPack));
    
    // Fetch userFannyPackAccounts
    this.getUserFannyPackAccounts()
  }
  // Raaar
  render() {
    return (
      <Fragment>

        {JSON.stringify(this.props.fannyPack)}

        <a className="btn-large" onClick={this.addUserFannyPackAccounts}>onClick add</a>

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
