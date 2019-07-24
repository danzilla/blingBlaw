// FannyPackz
import React, { Component } from 'react';
// Charts 
import Chart from '../../../component/Charts/chart';
import Bubble from '../../../component/Charts/bubble';
// FannyPackz
class Charts extends Component {
  // state
  constructor(props) {
    super(props);
    this.state = {
      activeUser: "",
      activeFanyPack: "",
      userFannyPackz: ""
    };
  }
  // Rrrr
  render() {
    // Bling
    return (
      // FannyPackz
      <div className="row h-100 p-1">
        {/* Feature - Profile */}
        <div className="col s12 m12 l12 h-50 card-1 z-depth-3 overflowN my-1">
          <Bubble />
        </div>
        {/* Feature - Most spended */}
        <div className="col s12 m12 l12 h-45 card-1 z-depth-3 overflowN">
          <Chart />
        </div>
      </div>
    );
  }
}
// Bling
export default Charts;



