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
      dashboardPage: "",
      dashboardPageState: ""
    }
  }


  render() {
    return (
      <div className="row h-100 w-100 overflowN">
        <div className="col m12 h-100">
          {/* Navigation */}
          <div className="my-1 px-0">
            <TopNav />
          </div>
          {/* Content */}
          <div className="h-90 overflowN">
            <ViewDashboard />
          </div>
        </div>
        {/* Init Materializecss */}
        <Materialize />
      </div>
    );
  }
}

export default Dashboard;



