/*  
  Head - FannyPack info 
  Body - Account Info 
  FannyPack contains Multiple Accounts
  Pass userSerial on change from Head to Body
*/
// React
import React, { Component } from 'react'
// Head and Body
import HeadContent from './head'
import BodyContent from './body'
// Content
class Content extends Component {
  // constructor
  constructor(props) {
    super(props)
    this.state = {
      activeFannyPackUser: "",
      activeFannyPack: "",
      userFannyPackz: ""
    }
  }
  // Raaar
  render() {
    return (
      <div className="row h-100 overflowN">
        <div className="col m12 s12 h-100 overflowY">
          {/* Head - Add FannyPack and Select FannyPack */}
          <div className="row card-1">
            <HeadContent
              changeActiveFannyPack={this.props.changeActiveFannyPack}
              userFannyPackz={this.props.userFannyPackz}
              activeFannyPackName={this.props.activeFannyPackName}
              activeFannyPack={this.props.activeFannyPack}
              activeUser={this.props.activeUser}
              pageName={this.props.pageName} />
          </div>
          {/* Body - Add and View Fanny's Accounts */}
          <div className="row">
            <BodyContent
              activeFannyPackName={this.props.activeFannyPackName}
              userFannyPackz={this.props.userFannyPackz}
              activeFannyPack={this.props.activeFannyPack}
              activeUser={this.props.activeUser}
              pageName={this.props.pageName} />
          </div>
        </div>
      </div>
    );
  }
}
export default Content;
