import React, { Component } from 'react'

// Navigation
import TopNav from '../../component/Navigation/topNav/topNav'
import LeftNav from '../../component/Navigation/sideNav/leftNav'
import RightNav from '../../component/Navigation/sideNav/rightNav'

// Charts and Tables
import Table from '../../component/Charts/table'
import Chart from '../../component/Charts/chart'

import ViewStatements from '../../component/Contents/viewStatements'
import ViewTransaction from '../../component/Contents/viewTransaction'

// Global-Style Materialize
import Materialize from '../../util/Materialize'

// Dashboard
class Dashboard extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      newArray: "",
      textTest: "hahahah",
      testTestUpdate: "no-updated..."
    }
  }

  render() {
    return (
      <div className="row h-100 w-100 overflowN">
        <div className="container h-100">
          {/* Navigation */}
          <div className="my-1 px-0">
            <TopNav />
          </div>
          {/* Content */}
          <div className="card z-depth-2 h-90 overflowN">
            <ViewStatements />
          </div>
        </div>
        {/* Init Materializecss */}
        <Materialize />
      </div>
    );
  }
}

export default Dashboard;



