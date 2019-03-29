import React, { Component } from 'react';

class LeftNav extends Component {



    render() {

        return (

                <div id="slide-out" class="sidenav container">
                    <div className="row">
                        <div className="col">
                            <p> Height-Top: {this.state.heightY} </p>
                            <p> Height-Bottom: {this.state.heightYY} </p>
                        </div>
                        <div className="col">
                            <p> Width-Nav : {this.state.widthX} </p>
                            <p> Width-Content : {this.state.widthXX} </p>
                        </div>
                    </div>
                    <div className="row">
                        <p class="range-field center-align">
                            <input
                                className="vranger pink lighten-1"
                                type="range"
                                min={this.state.minValueY} max={this.state.maxValueY}
                                value={this.state.valueY}
                                onChange={this.handleChangeY.bind(this)}
                                step="1" />
                        </p>
                        <p class="range-field center-align">
                            <input
                                type="range"
                                min={this.state.minValueX} max={this.state.maxValueX}
                                value={this.state.valueX}
                                onChange={this.handleChangeX.bind(this)}
                                step="1" />
                        </p>
                    </div>
                </div>

        );
    }
}

export default LeftNav;



