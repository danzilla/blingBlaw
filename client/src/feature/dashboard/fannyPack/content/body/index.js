import React, { Component } from 'react';
import ViewAccount from './viewAccount';
// Content
class Content extends Component {
  // props
  constructor(props) {
    super(props)
    this.state = { 
      accountPage: {
        overViewPage: true,
        accountOverview: false,
        accountSerial: "",
        pageLayout: "container"
      }
    }
  }
  // activeUsers
  activePage = (serial) => {
    this.setState({
      accountPage: {
        ...this.state.accountPage,
        overViewPage: false, accountOverview: false, 
        accountSerial: serial, pageLayout: "col s12 m12"
      }
    })
  }
  // Raaar
  render() {
    return (
      <div id="Content" className={this.state.accountPage.pageLayout}>
        {JSON.stringify(this.state.accountPage)}
        <ViewAccount />
        <ViewAccount />
        <ViewAccount />
        <ViewAccount />
      </div>
    );
  }
}
export default Content;
