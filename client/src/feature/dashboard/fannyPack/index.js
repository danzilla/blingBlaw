// FannyPackz
import React, { Component } from 'react';
import axios from 'axios';
// Global-Style Materialize
import Materialize from '../../../util/Materialize';
// Charts 
import Charts from './charts';
// Content
import Content from './content';
// FannyPackz
class FannyPackz extends Component {
  // state
  constructor(props) {
    super(props);
    this.state = {
      activeUser: "",
      activeFannyPack: "",
      activeFannyPackName: "",
      userFannyPackz: ""
    };
  }
  // Change FannyPack - callback
  changeActiveFannyPack = (fannyPackSerial, fannyPackName) => {
    this.setState({ 
      activeFannyPack: fannyPackSerial,
      activeFannyPackName: fannyPackName
    });
  }
  // componentDidMount
  componentDidMount() {
    // Get and Parse - sessionData
    let sessionData = JSON.parse(localStorage.getItem('sessionData'));
    // If(serial) good - Set state for user_serial
    if (sessionData == null || !sessionData.user_serial || !sessionData) {
      this.setState({ activeUser: "No user info from sessionData" })
    } else if (sessionData.user_serial) {
      // Set ActiveUser
      // Get View_User_fannyPack
      // Axios - POST - fannypack/view
      axios.post('http://localhost:5000/fannypack/view', {
        userSerial: sessionData.user_serial
      })
      // if any response
      .then((response) => {
        this.setState({
          activeFannyPackName: response.data.pageMessage.results[0].fannypack_name,
          activeFannyPack: response.data.pageMessage.results[0].fannypack_serial,
          activeUser: sessionData.user_serial,
          userFannyPackz: response.data.pageMessage.results,
        })
      })
      // catch error
      .catch((error) => {
        this.setState({ userFannyPackz: error.message })
      });
    }
    this.props.updateAlertMessage({ pageMessage: "FannyPackz page loaded" });
  }
  // Rrrr
  render() {
    // Bling
    return (
      // FannyPackz
      <div className="row w-100 h-85">
        {/* Logs and Category - hide-on-med-and-down */}
        <div className="col s12 m12 l4 h-100 overflowN hide-on-med-and-down">
          <Charts />
        </div>
        {/* Contents */}
        <div className="col s12 m12 l8 h-100 overflowN">
          <div className="row h-100 p-2">
            {/* Feature - Profile */}
            <div className="col s12 m12 l12 h-100 card-1 z-depth-3 overflowN">
              <Content
                changeActiveFannyPack={this.changeActiveFannyPack}
                userFannyPackz={this.state.userFannyPackz}
                activeFannyPack={this.state.activeFannyPack}
                activeFannyPackName={this.state.activeFannyPackName}
                activeUser={this.state.activeUser}
                pageName={this.props.pageName} />
            </div>
          </div>
        </div>
        <Materialize />
      </div>
    );
  }
}
// Bling
export default FannyPackz;



