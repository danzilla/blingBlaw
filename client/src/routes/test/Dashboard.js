import React, { Component } from 'react';

import TopNav from '../../component/Navigation/topNav'
import LeftNav from '../../component/Navigation/leftNav'
import RightNav from '../../component/Navigation/rightNav'

// Global-Style Materialize
import Materialize from '../../util/Materialize';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      minValueX: '15',
      maxValueX: '50',
      minValueY: '25',
      maxValueY: '75',
      valueY: '50',
      valueX: '25',
      widthX: "25%",
      widthXX: "75%",
      heightY: "50%",
      heightYY: "50%"
    };
  }
  handleChangeX(event) {
    this.setState({ 
      valueX: event.target.value,
      widthX: event.target.value + '%',
      widthXX: +100 - event.target.value + '%',
     });
  }
  handleChangeY(event) {
    this.setState({
      valueY: event.target.value,
      heightY: event.target.value + '%',
      heightYY: +100 - event.target.value + '%'
    });
  }


  render() {

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
          <div class="col w-100">
            <div class="card-panel teal">
              <span class="white-text">I am a very simple card. I am good at containing small bits of information.
                I am convenient because I require little markup to use effectively. I am similar to what is called a panel in other frameworks.
                </span>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Dashboard;



