/*  
    Head - FannyPack info 
    Body - Account Info 
    FannyPack contains Multiple Accounts
    Pass userSerial on change from Head to Body
*/
// React
import React, { Component } from 'react'
// Head and Body
import BodyContent from './body'
import HeadContent from './head'
// Content
class Content extends Component {
  // constructor
  constructor(props) {
    super(props)
    this.state = {
      activeFannyPackData: ""
    }
  }
  // Change FannyPack - callback
  changeFannyPackData = (fannyPackSerial) => {
    this.setState({ activeFannyPackSerial: fannyPackSerial })
  }
  // componentDidMount
  componentDidMount() {


    // Use - user_serial to get FannyPack info
    // fannyPack - user_fannyRecord 


    // If(serial) good - Set state for user_serial
    if (!this.props.userSerial) {
      this.setState({ activeFannyPackData: "No user info from sessionData" })
    } else if (this.props.userSerial) {
      this.setState({ activeFannyPackData: this.props.userSerial })
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
              changeFannyPackData={this.changeFannyPackData}
              activeFannyPackData={this.state.activeFannyPackData}
              userSerial={this.props.userSerial}
              pageName={this.props.pageName} />
          </div>
          {/* Body - Add and View Fanny's Accounts */}
          <div className="row">
            <BodyContent
              activeFannyPackData={this.state.activeFannyPackData}
              userSerial={this.props.userSerial}
              pageName={this.props.pageName} />
          </div>
        </div>
      </div>
    );
  }
}
export default Content;
