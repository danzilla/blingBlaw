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
            <div id="slideoutRight" className="sidenav container">
                <div className="row">
                    <h1>
                        Right Side
                    </h1>
                </div>
            </div>
        );
    }
}

export default LeftNav;



