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
        this.props.getLeftNav(event.target.value)
    }

    render() {
        let text = {
            id: 'xyz',
            name: 'zzzasdasdasdasdasd',
        };
        return (
            <div id="slideoutLeft" className="sidenav container">


                <h4>HHH {this.props.hah}</h4>
                
                <button onClick={() => this.props.getLeftNav(this.state.minValueX)}>LOLAA</button>
                <button onClick={() => this.props.getRightNav()}>123213</button>


                <div className="row">
                    <div className="col m6">
                        <p> Height-Top: {this.state.heightY} </p>
                        <p> Height-Bottom: {this.state.heightYY} </p>
                    </div>
                    <div className="col m6">
                        <p> Width-Nav : {this.state.widthX} </p>
                        <p> Width-Content : {this.state.widthXX} </p>
                    </div>
                </div>
                <div className="row ">
                    <p className="range-field center-align">
                        <input
                            className="vranger"
                            type="range"
                            min={this.state.minValueY} max={this.state.maxValueY}
                            value={this.state.valueY}
                            onChange={this.handleChangeY.bind(this)}
                            step="1" />
                    </p>
                    <p className="range-field center-align">
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



