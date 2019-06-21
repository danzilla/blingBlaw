// Dashboard 
// Page-Redirect
import React, { Component } from 'react'
// Global-Style Materialize
import Materialize from '../../util/Materialize'
// Navigation and Messages
import Navigation from '../../component/Navigation'
import MessageAlert from '../../component/MessageAlert'
// Contents 
import Account from './account'
import Category from './category'
import Search from './search'
import Settings from './settings'
import User from './users'
// Dashboard
class Dashboard extends Component {
  // constructor
  constructor(props) {
    super(props);
    // Page-Display Setting
    const pageDisplay = {
      accountPage: false,
      categoryPage: false,
      searchPage: false,
      settingPage: false,
      userPage: true
    };
    const alertMessage = { accountPage: "accountPage"};
    this.state = {
      pageDisplay: pageDisplay,
      alertMessage: alertMessage
    };
  }

  // Alert Message 
  // updateAlertMessage
  updateAlertMessage = (msg) => {
    this.setState({
      alertMessage: msg
    })
  }


  // Pages
  // - Account | Category | Search | Settings | Users
  // - 3 Depth - Props -> nav > navBar
  // 
  // activeAccount 
  activeAccount = () => {
    this.setState({
      pageDisplay: { ...this.state.pageDisplay, 
        accountPage: true, categoryPage: false, searchPage: false, settingPage: false, userPage: false
      }
    })
  }
  // activeCategory 
  activeCategory = () => {
    this.setState({
      pageDisplay: { ...this.state.pageDisplay, 
        accountPage: false, categoryPage: true, searchPage: false, settingPage: false, userPage: false
      }
    })
  }
  // activeSearch 
  activeSearch = () => {
    this.setState({
      pageDisplay: { ...this.state.pageDisplay, 
        accountPage: false, categoryPage: false, searchPage: true, settingPage: false, userPage: false
      }
    })
  }
  // activeSettings 
  activeSettings = () => {
    this.setState({
      pageDisplay: { ...this.state.pageDisplay, 
        accountPage: false, categoryPage: false, searchPage: false, settingPage: true, userPage: false
      }
    })
  }
  // activeUsers
  activeUsers = () => {
    this.setState({
      pageDisplay: { ...this.state.pageDisplay, 
        accountPage: false, categoryPage: false, searchPage: false, settingPage: false, userPage: true
      }
    })
  }
  //
  // blaze contents
  render() {
    // Which content to show
    let showPage, pageName;
    if (this.state.pageDisplay.accountPage === true) {
      // Account page
      pageName = "Account page";
      showPage = <Account
        pageName={pageName}
        updateAlertMessage={this.updateAlertMessage}
        pageDisplay={this.state.pageDisplay} />;
    } else if (this.state.pageDisplay.categoryPage === true) {
      // Category page
      pageName = "Labels and Category page";
      showPage = <Category
        pageName={pageName}
        updateAlertMessage={this.updateAlertMessage}
        pageDisplay={this.state.pageDisplay} />;
    } else if (this.state.pageDisplay.searchPage === true) {
      // Search page
      pageName = "Search page";
      showPage = <Search
        pageName={pageName}
        updateAlertMessage={this.updateAlertMessage}
        pageDisplay={this.state.pageDisplay} />;
    } else if (this.state.pageDisplay.settingPage === true) {
      // Settings page
      pageName = "Settings page";
      showPage = <Settings
        pageName={pageName}
        updateAlertMessage={this.updateAlertMessage}
        pageDisplay={this.state.pageDisplay} />;
    } else if (this.state.pageDisplay.userPage === true) {
      // User page
      pageName = "User page";
      showPage = <User
        pageName={pageName}
        updateAlertMessage={this.updateAlertMessage}
        pageDisplay={this.state.pageDisplay} />;
    } else {
      // Account page
      pageName = "Account page";
      showPage = <Account
        pageName={pageName}
        updateAlertMessage={this.updateAlertMessage}
        pageDisplay={this.state.pageDisplay} />;
    }
    // 
    // #brrrrrom
    return (
      <div className="h-100 w-100">
        {/* Navigation */}
        <Navigation 
          activeAccount={this.activeAccount}
          activeCategory={this.activeCategory}
          activeSearch={this.activeSearch}
          activeSettings={this.activeSettings}
          activeUsers={this.activeUsers}
          pageName={pageName} />

        {/* Alert Message */}
        <MessageAlert 
          alertMessage={this.state.alertMessage}
          pageDisplay={this.state.pageDisplay} />

        {/* Page content */}
        {showPage}

        {/* Init Materializecss */}
        <Materialize />
      </div>
    );
  }
}
// Bling
export default Dashboard;



