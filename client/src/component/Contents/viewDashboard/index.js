import React, { Component } from 'react'

import TopNav from '../../Navigation/topNav/topNav'
import Table from '../../Charts/table'
import Chart from '../../Charts/chart'

// Global-Style Materialize
import Materialize from '../../../util/Materialize'

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
      <div className="w-100 h-100">
        <div className="col m12 s12 w-100 h-100">
          <div className="row h-100 overflowN">

            <div className="col m3 h-100">
              <div className="row h-100 overflowN">
                <div className="col h-50 valign-wrapper">
                  <div className="z-depth-2 h-100">
                    <Chart />
                  </div>
                </div>
                <div className="col h-50 valign-wrapper">
                  <div className="z-depth-2 h-100">
                    <Chart />
                  </div>
                </div>
              </div>
            </div>

            <div className="col m9 h-100">
              <div className="card z-depth-2 col m12 h-95 overflowY">
                <Table />
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}


export default Dashboard;



