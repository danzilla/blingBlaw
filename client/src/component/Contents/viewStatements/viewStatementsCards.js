import React, { Component } from 'react';

import Chart from './viewStatementsChart'

class StatementCard extends Component {

    render() {
        return (
                <div className="card card-1">
                    <div className="card-image waves-effect waves-block waves-light">
                        <div className="activator m-1">
                            <Chart />
                        </div>
                    </div>
                    <div className="card-content">
                        <span className="card-title activator grey-text text-darken-4">
                            Sep 2019
                            <i className="material-icons right">more_vert</i>
                        </span>
                    </div>
                    <div className="card-reveal">
                        <span className="card-title grey-text text-darken-4">
                            Sep 2019
                            <i className="material-icons right">close</i>
                        </span>
                        <p>Here is some more information about this product that is only revealed once clicked on.</p>
                    </div>
                </div>
            
        );
    }
}

export default StatementCard;
