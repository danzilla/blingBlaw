import React, { Component } from 'react';

import Chart from './viewStatementsChart'


class StatementCard extends Component {

    render() {
        return (
            <div className="col m3">
                <div className="card card-1">
                    <div className="card-image waves-effect waves-block waves-light">
                        <div className="activator m-1">
                            <Chart />
                        </div>
                    </div>
                    <div className="card-content">
                        <span className="card-title activator grey-text text-darken-4">
                            {this.props.cardTitle}
                            <i className="material-icons right">more_vert</i>
                        </span>
                    </div>
                    <div className="card-reveal">
                        <span className="card-title grey-text text-darken-4">
                            {this.props.cardTitle}
                            <i className="material-icons right">close</i>
                        </span>
                        <blockquote>
                            Description:  <br />
                            {this.props.cardBody[0].statement_desc}  <br />
                            Last modified:  <br />
                            {this.props.cardBody[0].statement_created}  <br />
                        </blockquote>

                        <div className="center">
                            {/* Modal id  - From props */}
                            <a href={'#modal' + this.props.cardModalId} 
                                className="waves-effect waves-light btn light-blue lighten-2 modal-trigger">
                                <i className="material-icons">web</i>
                            </a>
                            <a href="#!" className="waves-effect waves-light btn mx-1 orange darken-3 tooltipped"
                                data-position="bottom" data-tooltip="Update">
                                <i className="material-icons">mode_edit</i>
                            </a>
                            <a href="#!" className="waves-effect waves-dark btn pink darken-3 tooltipped"
                                data-position="bottom" data-tooltip="Delete">
                                <i className="material-icons">delete</i>
                            </a>
                        </div>
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default StatementCard;
