import React, { Component } from 'react'

import TopNav from '../../component/Navigation/topNav/topNav'
import LeftNav from '../../component/Navigation/sideNav/leftNav'
import RightNav from '../../component/Navigation/sideNav/rightNav'


import Table from '../../component/Charts/table'
import Chart from '../../component/Charts/chart'

// Global-Style Materialize
import Materialize from '../../util/Materialize'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import {actionName} from '../../store/action/action'

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
    let text = "12321321312321321321312"
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
          <div className="col w-100 h-95 overflowN">

              {/* Content FULL MAX */}
              <div className="row h-90">
                {/* Side Box */}
                {/* Width - col m3 s12 */}
                <div className="col m3 s12 h-100">
                  {/* Uno Box */}
                  {/* Width - col m12 s12*/}
                  <div className="col m12 s12 h-50 card z-depth-2">
                    <div className="h-100 valign-wrapper">
                      <Chart />
                    </div>
                  </div>
                  {/* Dos Box */}
                  {/* Width - col m12 s12*/}
                  <div className="col m12 s12 h-50 card z-depth-2">
                    <div className="h-100">
                      <Table />
                    </div>
                  </div>
                </div>
                
                {/* Dos Box */}
                {/* Width - col m9 s12*/}
                <div className="col m9 s12 h-100">
                  {/* Quo Box */}
                  {/* Width - col m12 */}
                  <div className="my-1 card z-depth-2 col m12 h-100">
                    <div className="h-100 overflowY">
                      {this.state.displaySettings.div_D.width}
                      {this.state.testTestUpdate}
                      {this.state.textTest}
                    </div>
                  </div>
                </div>

              </div>

              {

                // Hide 
                // View on Big Mscreen 
                // Main Template 

                // Max col row range - col m12 

                // If I want to View just the - Content Box - Taggle 
                  // Side Box - Class -
                  // Content Box - Class -
                // If I want to view side by side - Taggle 
                  // Side Box - Class -
                  // Content Box - Class -
                // If I want change settings - Range 
                  // Side Box - Class -
                  // Content Box - Class -
              }


              {/*
                button onClick={() => this.createNewArray()} >Button </button>
                {this.state.newArray}
              */}
          </div>
        </div>


      </div>
    );
  }
}


export default Dashboard;



