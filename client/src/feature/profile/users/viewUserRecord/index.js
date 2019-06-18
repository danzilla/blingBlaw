import React, { Component } from 'react'
import { emojify } from 'react-emojione';

import Chart from '../../../../component/Charts/chart'

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
        <div className="m-1 card card-1 z-depth-3 light-blue lighten-5">
          <Chart />
        </div>
      );
    }
  }
export default viewUserInfo;
