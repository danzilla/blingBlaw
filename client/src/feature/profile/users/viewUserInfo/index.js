import React, { Component } from 'react'
import { emojify } from 'react-emojione';
import Bubble from '../../../../component/Charts/bubble'



// viewUserInfo
class viewUserInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Content: "Content"
        }
    }
    render() {
    // emojify - Font size
    const emojifyOptions = {
      style: {
        height: 85,
      }
    };
    return (
      <div className="row w-100 h-100">
        <Bubble />
      </div>
    );
  }
}
export default viewUserInfo;
