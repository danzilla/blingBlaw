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
    // emojify - Font size
    const emojifyOptions = {
      style: {
        height: 85,
      }
    };
    return (
      <div className="row w-100 h-100">
        <div className="col s5 m5 l5 h-100">
          <div className="valign-wrapper w-100 h-100">
            <div className="valign w-100 center-align">
              <p>{emojify('💖', emojifyOptions)}</p>
              <a href="/">{emojify(':gear:')}</a>
            </div>
          </div>
        </div>
        <div className="col">
          <h1>Danzilla </h1>
          <h2>Danzilla </h2>
          <h3>Danzilla </h3>
          <h4>Danzilla </h4>
        </div>
      </div>
    );
  }
}
export default viewUserInfo;
