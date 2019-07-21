import React, { Component } from 'react'
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
      <div class="container">
          
          <nav className="transparent">
            <div class="nav-wrapper ">
              <a href="#"
                className="right blue-text text-darken-4 transparent btn-large waves-effect waves-dark z-depth-4">
                <i className="material-icons">add</i>
              </a>
              <a href="#" 
                class="brand-logo left blue-text text-darken-2">
                {this.props.fannyPack.activeFannyPackName} - {this.props.fannyPack.activeFannyPackSerial}
              </a>
            </div>
          </nav>


            <h1> ADD Accounts </h1>
            FannyPacks - Account - Record - 

            POST - Send with - user and fanny serial
          <div class="row valign-wrapper light-blue accent-3 z-depth-1">
            <div class="col s2 center-align">
              Account Type
            </div>
            <div class="col s8 center-align">
              <span class="black-text">
                <p> Account Name </p>
              </span>
            </div>
            <div class="col s2 center-align">
              <button onClick={this.props.activeShowAccount} name="action"
                className="btn waves-effect waves-light light-blue accent-2">
                {emojify(':purse:')}
              </button>
            </div>
          </div>
        
      </div>
    );
  }
}
export default viewAccounts;
