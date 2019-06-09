import React, { Component } from 'react'

// Global-Style Materialize
import Materialize from '../../util/Materialize'


class Dashboard extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      newArray: ""
    }
  }


  componentDidMount() {
    console.log("localStorage-PRE: " + JSON.stringify(localStorage));
    let looool = "adasdasdsa";
    localStorage.setItem('myValueInLocalStorage', looool);
    console.log("localStorage-POST: " + JSON.stringify(localStorage));
  }

  render() {
    return (
      <div className="row">

        <h1> Hello </h1>



        {/* Init Materializecss */}
        <Materialize />
      </div>
    );
  }
}


export default Dashboard;



