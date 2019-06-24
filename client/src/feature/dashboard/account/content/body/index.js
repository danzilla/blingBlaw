import React, { Component } from 'react'
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
        <div className="col s12 m12">
          <div className="row valign-wrapper grey lighten-5 ">
            <div className="col s2 card-1 p-2" onClick={(e) => this.activePage("asdasd")}>
              This
            </div>
            <div className="col s10 card-1 p-2">
                Account #1
            </div>
          </div>
        </div>
        <div className="col s12 m12">
          <div className="row valign-wrapper grey lighten-5 ">
            <div className="col s2 card-1 p-2" onClick={(e) => this.activePage("bbbb")}>
              This
            </div>
            <div className="col s10 card-1 p-2">
            Account #2
            </div>
          </div>
        </div>
        <div className="col s12 m12">
          <div className="row valign-wrapper grey lighten-5 ">
            <div className="col s2 card-1 p-2" onClick={(e) => this.activePage("123")}>
              This
            </div>
            <div className="col s10 card-1 p-2">
              Account #3
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Content;
