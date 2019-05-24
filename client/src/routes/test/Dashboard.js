import React, { Component } from 'react'

import TopNav from '../../component/Navigation/topNav/topNav'
import LeftNav from '../../component/Navigation/sideNav/leftNav'
import RightNav from '../../component/Navigation/sideNav/rightNav'

import Table from '../../component/Charts/table'
import Chart from '../../component/Charts/chart'


// Global-Style Materialize
import Materialize from '../../util/Materialize'


class Dashboard extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      newArray: ""
    }
  }


  render() {
    return (
      <div className="row">

        <h1> Hello </h1>
        {/* Init Materializecss */}
        <Materialize />
      </div>
    );
  }
}


export default Dashboard;



