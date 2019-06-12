import React, { Component } from 'react'
// Content
class Content extends Component {
    constructor(props) {
      super(props)
      this.state = {
        Content: "Content"
      }
    }
    render() {
      return (
        <div className="h-100 overflowN">
          <div className="row h-50">
            <div className="col m6 s6 h-100 overflowN black">
              <div className="valign-wrapper w-100 h-100">
                <div className="valign w-100 center-align">
                  <img class="responsive-img" src="https://i.imgur.com/j19RRPa.gif" />
                </div>
              </div>
            </div>
            <div className="col m6 s6 h-100 overflowY">
              User Record 
            </div>
          </div>
          <div className="row h-50">
            <div className="col m12 s12 h-100 overflowY">
              User List
            </div>
          </div>
        </div>
      );
    }
  }
export default Content;
