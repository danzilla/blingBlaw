import React, { Component, Fragment } from 'react';
// AddAccountForm
import AddAccountForm from './addAccountForm';
import Materialize from '../../../../../../util/Materialize';
// Head
class Head extends Component {
    constructor(props) {
      super(props)
      this.state = { showAddAccount: false}
    }
  // Raaar
  render() {
    // brrrrrr
    return (
      <Fragment>
        <div className="container center-align py-3">
          <a className="btn">
            {this.props.activeFannyPackName} - {this.props.activeFannyPack}
          </a>
          <AddAccountForm
            getUserFannyPack={this.props.getUserFannyPack}
            updateAlertMessage={this.props.updateAlertMessage}
            changeActiveFannyPack={this.props.changeActiveFannyPack}
            userFannyPackz={this.props.userFannyPackz}
            activeFannyPack={this.props.activeFannyPack}
            activeUser={this.props.activeUser}
            pageName={this.props.pageName} />
        </div>

        <Materialize/>
      </Fragment>
    );
  }
}
export default Head;
