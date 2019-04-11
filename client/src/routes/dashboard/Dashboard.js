import React, { Component } from 'react'

// Navigation
import TopNav from '../../component/Navigation/topNav/topNav'
import LeftNav from '../../component/Navigation/sideNav/leftNav'
import RightNav from '../../component/Navigation/sideNav/rightNav'

// Charts and Tables
import Table from '../../component/Charts/table'
import Chart from '../../component/Charts/chart'

// Global-Style Materialize
import Materialize from '../../util/Materialize'

// Dashboard
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

        {
          /* 
            2 onClick hide Graphs and change Container -> ROW and  s12 m12 l12 -> Table
            3 onClick show Graph and change ROW -> CONTAINER

            onClick => SHOW 
              wrapper-content => "row w-100 h-100 overflowN"
              side-content => "col s12 m4 l3 h-100"
              body-content => "col s12 m8 l9 h-100"

            onClick => HIDE
              wrapper-content => "container w-100 h-100 overflowN"
              side-content => "hide"
              body-content => "col s12 m12 l12 h-100"

          */
        }

        {/* Content */}
        <div className="row w-100 h-100 overflowN">
          <div className="col w-100 h-90 overflowN">

            {/* Body */}
            <div id="wrapper-content" className="row w-100 h-100 overflowN">
              {/* Side Content */}
              <div id="side-content" className="col s12 m4 l3 h-100">
                <div className="col s6 m12 h-50">
                  <div className="card z-depth-2 h-90 valign-wrapper">
                    <Chart />
                  </div>
                </div>
                <div className="col s6 m12 h-50">
                  <div className="card z-depth-2 h-90 valign-wrapper ">
                    <Chart />
                  </div>
                </div>
              </div>
              {/* Body Content*/}
              <div id="body-content"  className="col s12 m8 l9 h-100">
                <div className="card z-depth-2 row h-95 overflowY">
                  <Table />
                </div>
              </div>
            </div>
          
          </div>
        </div>

      </div>
    );
  }
}


export default Dashboard;



