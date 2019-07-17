import React, { Component } from 'react';
// Charts 
import Chart from '../../../component/Charts/chart';
import Bubble from '../../../component/Charts/bubble';
// Content
import Content from './content';
// FannyPackz
class FannyPackz extends Component {
  // state
  constructor(props) {
    super(props);
    this.state = { 
      pageDisplay: "pageDisplay",
      lola: ""
    };
  }
  // componentDidMount
  componentDidMount() {
    this.props.updateAlertMessage({ pageMessage: "FannyPackz page loaded" });
    this.setState({ lola: JSON.parse(localStorage.getItem('sessionData'))})
  }
  // Rrrr
  render() {
    let lol = this.state.lola;
    // Bling
    return (
      // FannyPackz
      <div className="row w-100 h-85">
        {/* Logs and Category - hide-on-med-and-down */}
        <div className="col s12 m12 l4 h-100 overflowN hide-on-med-and-down">
          <div className="row h-100 p-1">
            {/* Feature - Profile */}
            <div className="col s12 m12 l12 h-50 card-1 z-depth-3 overflowN my-1">
              <h1 className="center-align">{this.props.pageName}</h1>
              {JSON.stringify(lol)}
              <Bubble />
            </div>
            {/* Feature - Most spended */}
            <div className="col s12 m12 l12 h-45 card-1 z-depth-3 overflowN">
              <Chart />
            </div>
          </div>
        </div>
        {/* Contents */}
        <div className="col s12 m12 l8 h-100 overflowN">
          <div className="row h-100 p-2">
            {/* Feature - Profile */}
            <div className="col s12 m12 l12 h-100 card-1 z-depth-3 overflowN">
              <Content pageName={this.props.pageName} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// Bling
export default FannyPackz;



