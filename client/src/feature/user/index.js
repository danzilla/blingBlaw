import React, { Component } from 'react'

// Navigation
import TopNav from '../../component/Navigation/topNav/topNav'

// Global-Style Materialize
import Materialize from '../../util/Materialize'

// User
class User extends Component {
  // state
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
  // Rrrr
  render() {
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
            User : {this.state.theposition}
          </div>
        </div>
        {/* Init Materializecss */}
        <Materialize />
      </div>
    );
  }
}
// Bling
export default User;
