import React, { Component } from 'react'
import { emojify } from 'react-emojione';
import Table from '../../../../component/Charts/table'

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
        <div className="row h-100 overflowY green accent-2 p-0">
          <h3 className=""> {emojify('💓')} </h3>
          <Table />
        </div>
      );
    }
  }
export default viewUserInfo;
