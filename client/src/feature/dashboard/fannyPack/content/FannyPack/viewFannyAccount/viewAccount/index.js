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
        - View account_records 
        - post fanny_serial, user_serial 
        - TO GET - transaction_table_informations 

        <p>activeFannyPack: {JSON.stringify(this.props.fannyPack.activeFannyPackSerial)}</p>
        <p>activeUserData: {JSON.stringify(this.props.fannyPack.activeUserData)}</p>
        <p>activeFannyPackData: {JSON.stringify(this.props.fannyPack.activeFannyPackData)}</p>

        <div className="row">
          <div className="btn-large col m2 s2 pink lighten-3">
            <span id={this.props.fannyPack.activeFannyPackSerial}>
              Type
            </span>
            {this.props.fannyPack.activeFannyPackName}
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
