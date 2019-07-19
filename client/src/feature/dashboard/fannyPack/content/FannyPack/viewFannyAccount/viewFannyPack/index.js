import React, { Component } from 'react'
// viewAccounts
class viewAccounts extends Component {
    constructor(props) {
      super(props)
      this.state = { Content: "Content"}
    }
  // Raaar
  render() {
    return (
      <div class="col s12 m8 offset-m2 l6 offset-l3">
        <div class="card-panel grey lighten-5 z-depth-1">
          <div class="row valign-wrapper">
            <div class="col s2">
              asd
              </div>
            <div class="col s10">
              <span class="black-text">
                <p> {this.props.activeUser} _ {this.props.activeFannyPackName} _ {this.props.activeFannyPack} </p>
              </span>

              <button onClick={this.props.activeShowAccount} name="action"
                className="btn waves-effect waves-light">
                activeShowAccount
              </button>
              <button onClick={this.props.activeShowFannyPack} name="action"
                className="btn waves-effect waves-light">
                activeShowFannyPack
              </button>

            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default viewAccounts;
