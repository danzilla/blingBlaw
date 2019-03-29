import React, { Component } from 'react';

class LeftNav extends Component {
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
            <div id="slideoutLeft" class="sidenav container">
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



