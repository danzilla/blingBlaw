import React, { Component } from 'react'

import TopNav from '../../component/Navigation/topNav/topNav'
import LeftNav from '../../component/Navigation/sideNav/leftNav'
import RightNav from '../../component/Navigation/sideNav/rightNav'

// Global-Style Materialize
import Materialize from '../../util/Materialize'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import {actionName} from '../../store/action/action'

class Dashboard extends Component {
  constructor(props){
    super(props)
    this.state = {
      newArray: ""
    }
  }

  componentDidUpdate = (prevProps) => {
    /*console.log("prevPros: " + JSON.stringify(prevProps));
    console.log("prevState: " + JSON.stringify(prevState));
    console.log("snapshot: " + JSON.stringify(snapshot));*/

    
    if (this.state.newArray !== prevProps.newArray){
      this.props.actionName(this.state.newArray)
      
      console.log("action: " + this.props.actionName)
      console.log("redux state: " + JSON.stringify(this.props.reduxState))
    }

  }

  createNewArray(){
    const array1 = [1, 2, 3, 4, 5, 6]
    this.setState({
      newArray: array1
    })
  }

  render() {
    const user_text = "LOL"
    
    return (
      <div className="row h-100 w-100">
        {/* Init Materializecss */}
        <Materialize />
        {/* Navigation */}
        <div className="my-1">
            <TopNav />
            <LeftNav />
            <RightNav />
        </div>
        {/* Content */}
        <div className="row w-100">
          <div className="col w-100">
            <div className="card-panel teal">

              <span className="white-text">
                <h1 className="center-align"> #Content </h1>
              </span>

              <button onClick={() => this.createNewArray()} >Button </button>

              {this.state.newArray}

            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) =>{
  return {
    reduxState
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({actionName}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);



