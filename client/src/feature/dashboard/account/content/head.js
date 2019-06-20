import React, { Component } from 'react'
// NewStatement
import NewStatement from '../../../../component/addNewStatement'
// Head
class Head extends Component {
    constructor(props) {
      super(props)
      this.state = { Content: "Content"}
    }
  // Raaar
  render() {
    return (
      <div className="col">
          <h1> {this.props.pageName} 
            <a className="mx-1 waves-effect waves-light btn modal-trigger" href="#NewStatement">
              <i className="material-icons">add</i>
            </a>
          </h1>
          <NewStatement />
      </div>
    );
  }
}
export default Head;
