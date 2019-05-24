import React, { Component } from 'react'

// Navigation
import TopNav from '../../component/Navigation/topNav/topNav'

// Charts and Tables
import Table from '../../component/Charts/table'
import Chart from '../../component/Charts/chart'

import ViewStatements from '../../component/Contents/viewStatements'
import ViewTransaction from '../../component/Contents/viewTransaction'
import ViewDashboard from '../../component/Contents/viewDashboard'

// Global-Style Materialize
import Materialize from '../../util/Materialize'

// Dashboard
class Dashboard extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      dashboardPage: true,
      statementPage: false,
      transactionPage: false,
      transStatmentId: "123",
      theposition: window.pageYOffset
    }
  }

  // isDashboardPage == GET from props
  isDashboardPage = (pageInfo) => {
    this.setState({
      dashboardPage: pageInfo
    })
  }
  // isDashboardPage == GET from props
  isTransactionPage = (isTrue) => {
    this.setState({
      transactionPage: isTrue
    })
  }
  // isDashboardPage == GET from props
  isStatementPage = (isTrue) => {
    this.setState({
      statementPage: isTrue
    })
  }
  // Get Transaction-Statement Serial
  getTranStateSerial = (getSerial) => {
    this.setState({
      transStatmentId: getSerial
    })
  }

  render() {

    // render Dashboard or Statement 
    let dashboardPage;
    // Dashboard 
    if (this.state.dashboardPage === true) {
      dashboardPage = <ViewDashboard
        isDashboardPage={this.isDashboardPage}
        isTransactionPage={this.isTransactionPage}
        isStatementPage={this.isStatementPage} />;
    }
    // Statement 
    if (this.state.statementPage === true) {
      dashboardPage = <ViewStatements
        isDashboardPage={this.isDashboardPage}
        isTransactionPage={this.isTransactionPage}
        isStatementPage={this.isStatementPage} />;
    }
    // Transaction 
    if (this.state.transactionPage === true) {
      dashboardPage = <ViewTransaction
        isDashboardPage={this.isDashboardPage}
        isTransactionPage={this.isTransactionPage}
        isStatementPage={this.isStatementPage} />;
    }

    return (
      <div className="row h-100 w-100 overflowN">
        {/* Navigation */}
        <div className="container my-1 px-0">
          <TopNav
            isDashboardPage={this.isDashboardPage} 
            isTransactionPage={this.isTransactionPage} 
            isStatementPage={this.isStatementPage} />
        </div>
        {/* Content */}
        <div className="col m12 h-100">
          <div className="h-90 overflowN">
            {dashboardPage}
          </div>
        </div>
        {/* Init Materializecss */}
        <Materialize />
      </div>
    );
  }
}

export default Dashboard;



