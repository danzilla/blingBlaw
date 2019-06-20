import React, { Component } from 'react'

import Table from '../../../../component/Charts/table'

import NewUser from '../../../../component/addNewUsers'

// Content
class Content extends Component {
    constructor(props) {
      super(props)
      this.state = { Content: "Content"}
    }
  // Raaar
  render() {
    return (
      <div className="row h-100 overflowY green accent-1 p-0">
        <div className="container">


          <h1> {this.props.pageName} 
            <a className="mx-1 waves-effect waves-light btn modal-trigger" href="#NewUsers">
              <i className="material-icons">add</i>
            </a>
          </h1>
          <NewUser />


          <Table />
         </div>
      </div>
    );
  }
}
export default Content;
