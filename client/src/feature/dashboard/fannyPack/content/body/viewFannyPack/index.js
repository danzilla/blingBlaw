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
      <div className="col s12 m12 h-100">
        <div className="row valign-wrapper grey lighten-5 ">
          <div className="col s2 card-1 p-2">
            This
          </div>
          <div className="col s10 card-1 p-2">
            Fanny #1
              <p> {this.props.activeUser} _ {this.props.activeFannyPackName} _ {this.props.activeFannyPack} </p>
          </div>
        </div>
      </div>
    );
  }
}
export default viewAccounts;
