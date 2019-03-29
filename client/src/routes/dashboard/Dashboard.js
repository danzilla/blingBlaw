import React, { Component } from 'react';

import Table from './table'
import Chart from './chart'

// Global-Style Materialize
import Materialize from '../../util/Materialize';

class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      minValueX: '15',
      maxValueX: '50',
      minValueY: '25',
      maxValueY: '75',
      valueY: '50',
      valueX: '25',
      widthX: "25%",
      widthXX: "75%",
      heightY: "50%",
      heightYY: "50%"
    };
  }
  handleChangeX(event) {
    this.setState({ 
      valueX: event.target.value,
      widthX: event.target.value + '%',
      widthXX: +100 - event.target.value + '%',
     });
  }
  handleChangeY(event) {
    this.setState({
      valueY: event.target.value,
      heightY: event.target.value + '%',
      heightYY: +100 - event.target.value + '%'
    });
  }


  render() {

    return (
      <div className="row h-100 w-100">
        <Materialize />

          <div id="slideout" class="sidenav">
            <div className="row">
              <div className="col">
                <p> Height-Top: {this.state.heightY} </p>
                <p> Height-Bottom: {this.state.heightYY} </p>
              </div>
              <div className="col">
                <p> Width-Nav : {this.state.widthX} </p>
                <p> Width-Content : {this.state.widthXX} </p>
              </div>
            </div>
            <div className="row">
              <p class="range-field center-align">
                <input
                  className="vranger pink lighten-1"
                  type="range"
                  min={this.state.minValueY} max={this.state.maxValueY}
                  value={this.state.valueY}
                  onChange={this.handleChangeY.bind(this)}
                  step="1" />
              </p>
              <p class="range-field center-align">
                <input
                  type="range"
                  min={this.state.minValueX} max={this.state.maxValueX}
                  value={this.state.valueX}
                  onChange={this.handleChangeX.bind(this)}
                  step="1" />
              </p>
            </div>
          </div>
          
          <a href="#" data-target="slideout" class="sidenav-trigger">
            <i class="material-icons">menu</i>
          </a>
        
          {/* Content | Default 80%*/}
          <div className="col h-96" style={{ width: this.state.widthX }}>
            
            <div style={{ height: "50%" }}>
              <div className="card z-depth-2 h-100 valign-wrapper ">
                asdasdsd
              </div>
            </div>
            <div style={{ height: "50%"}}>
              <div className="card z-depth-2 h-100 valign-wrapper">
                <div className="col">
                  asdasdasdasd
                </div>
              </div>
            </div>

          </div>

          {/* Content | Default 80%*/}
          <div className="col h-96" style={{ width: this.state.widthXX }}>
            <div style={{ height: this.state.heightY }}>
              <div className="card z-depth-2 h-100 overflowY">
                <Table />
              </div>
            </div>
            <div style={{ height: this.state.heightYY }}>
              <div className="card z-depth-2 h-100 overflowY">
                <Chart />
              </div>
            </div>
          </div>

      </div>
      
    );
  }
}

export default Dashboard;



