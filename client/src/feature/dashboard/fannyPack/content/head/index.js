import React, { Component } from 'react'
// NewFannyPack
import AddFannyPack from './addFannyPack'
// ViewFannyPack
import ViewFannyPack from './viewFannyPack'


// Head
class Head extends Component {
    constructor(props) {
      super(props)
      this.state = { showAddAccount: false}
    }
  // show AddAccount button
  showAccountAddButton = () => {
    this.setState({ showAddAccount: true })
  }
  // Hide AddAccount button
  hideAccountAddButton = () => {
    this.setState({ showAddAccount: false })
  }




  // Raaar
  render() {
    return (
      <div className="">

        <ViewFannyPack userSerial={this.props.userSerial} />

        <h3 className="container center-align py-1"> 
          {this.props.userSerial}
          {this.props.pageName}
          <button onClick={() => this.props.changeFannyPackSerial("asdaddasda12313")}
            className="mx-1 blue-text text-darken-2 transparent btn waves-effect waves-dark z-depth-4">
            <i className="material-icons">clear</i>
          </button>

          {this.state.showAddAccount ?
            <button onClick={this.hideAccountAddButton}
              className="mx-1 blue-text text-darken-2 transparent btn waves-effect waves-dark z-depth-4">
              <i className="material-icons">clear</i>
            </button>
            :
            <button onClick={this.showAccountAddButton}
              className="mx-1 blue-text text-darken-2 transparent btn waves-effect waves-dark z-depth-4">
              <i className="material-icons">add</i>
            </button>
          }
          <button onClick={"this.props.fetchUsers"}
            className="blue-text text-darken-2 transparent btn waves-effect waves-dark z-depth-4">
            <i class="material-icons">sync</i>
          </button>
        </h3>

        {this.state.showAddAccount === true &&
          <div className="container center-align"> 
            <AddFannyPack />
          </div>
        }

      </div>
    );
  }
}
export default Head;
