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
    this.getLeftNav = this.getLeftNav.bind(this)
    this.getRightNav = this.getRightNav.bind(this)

    this.state = {
      newArray: "",
      textTest: "hahahah",
      testTestUpdate: "no-updated...",
      displaySettings: {
        div_A: {
          width: "div_A",
          height: "div_A",
          options: "div_A"
        },
        div_B: {
          width: "div_B",
          height: "div_B",
          options: "div_B"
        },
        div_C: {
          width: "div_C",
          height: "div_C",
          options: "div_C"
        },
        div_D: {
          width: "div_D",
          height: "div_D",
          options: "div_D"
        }
      }
    }
  }

  getLeftNav(text){
    this.setState({
      testTestUpdate: text
    })
  }
  getRightNav() {
    this.setState({
      textTest: "adsasdasdasdasd!!!!!"
    })
  }

  render() {
    return (
      <div className="row h-100 w-100">
        {/* Init Materializecss */}
        <Materialize />
        {/* Navigation */}
        <div className="my-1">
            <TopNav />

            <LeftNav 
              hah={this.state.textTest} 
              update={this.state.testTestUpdate}
              getLeftNav={this.getLeftNav}
              getRightNav={this.getRightNav}  />
        
            <RightNav />
        </div>

        {/* Content */}
        <div className="row w-100 h-100 overflowN">
          <div className="col w-100 h-90 overflowN">

            {/* Content FULL MAX h-88 | MIN h-50 */}
            <div className="row h-100 overflowN">

              <div className="col m3 h-100">
                  <div className="col m12 h-50">
                    <div className="card z-depth-2 h-90 valign-wrapper ">
                      <Chart />
                    </div>
                  </div>
                <div className="col m12 h-50">
                    <div className="card z-depth-2 h-90 valign-wrapper ">
                      <Chart />
                    </div>
                  </div>
                </div>

                <div className="col m9 h-100">
                  <div className="card z-depth-2 col m12 h-95 overflowY">
                    <Table />
                  </div>
                </div>

                {/* Side Navigation */}
                <div id="div_A" className="col m3 purple lighten-1 h-50 overflowY">
                  <Chart />
                </div>
                {/* Side Navigation */}
                <div id="div_B" className="col m9 purple lighten-4 h-50 overflowY">
                  <Table />
                </div>

                {/* Graph */}
                <div id="div_C" className="col m3 purple lighten-3 h-50 overflowY">
                  Overall Graph {this.state.displaySettings.div_C.width}
                  <Chart />
                </div>

                {/* Overall Graph */}
                <div id="div_D" className="col m9 purple lighten-2 h-50 overflowY">
                  <Chart />
                </div>

            </div>

          </div>
        </div>
      </div>
    );
  }
}


export default Dashboard;



