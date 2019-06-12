import React, { Component } from 'react'
import { emojify } from 'react-emojione';

import Table from '../../../component/Charts/table'

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
        <div className="h-100 m-1 card card-1 z-depth-3 overflowY green accent-2">
          <div className="valign-wrapper w-100 h-100">
            <div className="valign w-100 h-100 ">

              <h3 className=""> {emojify('💓')} </h3>
              <Table />

            </div>
          </div>
        </div>
      );
    }
  }
export default viewUserInfo;
