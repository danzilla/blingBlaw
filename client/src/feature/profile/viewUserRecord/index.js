import React, { Component } from 'react'
import { emojify } from 'react-emojione';

import Chart from '../../../component/Charts/chart'

// viewUserInfo
class viewUserInfo extends Component {
    constructor(props) {
      super(props)
      this.state = {
        Content: "Content"
      }
    }
    render() {
      return (
        <div className="h-100 m-1 card card-1 z-depth-3 light-blue lighten-5">
          <div className="valign-wrapper w-100 h-100">
            <div className="valign w-100 h-100 center-align">
              <Chart />
            </div>
          </div>
        </div>
      );
    }
  }
export default viewUserInfo;
