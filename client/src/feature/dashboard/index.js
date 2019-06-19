import React, { Component } from 'react'
import { emojify } from 'react-emojione';

// Global-Style Materialize
import Materialize from '../../util/Materialize'


import Navigation from '../../component/Navigation/goodNav'
import MessageAlert from '../../component/MessageAlert'


import Account from './account'
import Category from './category'
import Test from './test'


// Dashboard
class Dashboard extends Component {

  // state
  constructor(props) {

    super(props);
    // Page-Display Setting
    const pageDisplay = {
      accountPage: false,
      labelPage: false,
      searchPage: false,
      settingPage: false,
      userPage: false
    };
    this.state = {
      pageDisplay: pageDisplay,
      lolMesg: "0"
    };
  }

  active = (aaa) => {
    this.setState({
      pageDisplay: { ...this.state.pageDisplay, 
        accountPage: false,
        labelPage: true,
        searchPage: false,
        settingPage: false,
        userPage: false
      } 
    })
    this.setState({ lolMesg: aaa})
  }

  // blaze
  render() {

    let showPage, pageName;
    if (this.state.pageDisplay.accountPage === true) {
      // Account page
      showPage = <Account
        active={this.active}
        pageDisplay={this.state.pageDisplay}
      />;
      pageName = "Account page";
    } else if (this.state.pageDisplay.labelPage === true) {
      // Category page
      showPage = <Category
        active={this.active}
        pageDisplay={this.state.pageDisplay}
      />;
      pageName = "Category page";

    } else {
      // Test page
      showPage = <Test
        active={this.active}
        pageDisplay={this.state.pageDisplay}
      />;
      pageName = "Test page";
    }

    return (
      <div className="h-100 w-100">

        <Navigation pageName={pageName} />
        <MessageAlert pageDisplay={this.state.pageDisplay} />
        {showPage}

        {/* Init Materializecss */}
        <Materialize />
      </div>
    );
  }
}
// Bling
export default Dashboard;



