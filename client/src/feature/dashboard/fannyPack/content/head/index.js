import React, { Component, Fragment } from 'react';
// NewFannyPack
import AddFannyPack from './addFannyPack';
// Head
class Head extends Component {
    constructor(props) {
      super(props)
      this.state = { showAddAccount: false}
    }
  // Raaar
  render() {
    let fannyData = [];
    let data = this.props.userFannyPackz;
    for (let i = 0; i < data.length; i++) {
      let pushD = {
        fannypack_name: data[i].fannypack_name,
        fannypack_serial: data[i].fannypack_serial
      }; fannyData.push(pushD);
    }
    // brrrrrr
    return (
      <Fragment>
        <div className="container center-align py-3">
          <a className="dropdown-trigger btn-large" data-target="DropDrip1">
            {this.props.activeFannyPackName} - {this.props.activeFannyPack}
          </a>
          {/* FannyPack list */}
          <ul id="DropDrip1" className="dropdown-content">
            {fannyData.map(data => (
            <li key={data.fannypack_serial}>
              <a onClick={() => this.props.changeActiveFannyPack(data.fannypack_serial, data.fannypack_name)}>
                {data.fannypack_name} - {data.fannypack_serial}
              </a>
            </li>
            ))}
          </ul>
          <AddFannyPack
            getUserFannyPack={this.props.getUserFannyPack}
            updateAlertMessage={this.props.updateAlertMessage}
            changeActiveFannyPack={this.props.changeActiveFannyPack}
            userFannyPackz={this.props.userFannyPackz}
            activeFannyPack={this.props.activeFannyPack}
            activeUser={this.props.activeUser}
            pageName={this.props.pageName} />
        </div>
      </Fragment>
    );
  }
}
export default Head;
