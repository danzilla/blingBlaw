import React, { Component } from 'react'
// NewStatement
import NewStatement from '../../../../component/addAccount'
// Head
class Head extends Component {
    constructor(props) {
      super(props)
      this.state = { Content: "Content"}
    }
  // Raaar
  render() {
    return (
      <div className="">
        <h3 className="container center-align py-1"> {this.props.pageName}
          {this.props.showAddAccount ?
            <button onClick={this.props.hideAccountAddButton}
              className=" mx-1 waves-effect waves-teal btn-flat">
              <i className="material-icons">arrow_drop_up</i>
            </button>
            :
            <button onClick={this.props.showAccountAddButton}
              className="mx-1 waves-effect waves-teal btn-flat">
              <i className="material-icons">arrow_drop_down</i>
            </button>
          }
        </h3>
        {this.props.showAddAccount === true &&
          <div className="container"> <NewStatement /> </div>
        }
      </div>
    );
  }
}
export default Head;
