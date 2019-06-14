import React, { Component } from 'react'
import { emojify } from 'react-emojione';
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
        <div className="h-100 m-1 card card-1 z-depth-3 deep-orange lighten-2">
          <div className="valign-wrapper w-100 h-100">
            <div className="valign w-100 center-align">

              <h3 className=""> Danzilla {emojify('💓')} </h3>
              <h5 className=""> FannyPack-name  </h5>
              <h5 className=""> Last logged-in: </h5>

            </div>
          </div>
        </div>
      );
    }
  }
export default viewUserInfo;
