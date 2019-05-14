import React, { Component } from 'react'
import axios from 'axios'

import Table from '../../Charts/table'
import Chart from '../../Charts/chart'

class viewStatements extends Component {

    // states
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }
    componentDidMount = () => {
        console.log("componentDidMount: loading Statements");
        // load statement
        // Better way to manage statement
        // submit to server
        axios.get('http://localhost:5000/statement/view')
            .then((response) => {
                // console.log(JSON.stringify(response.data.bigTable));
                // let lolaa = response.data.bigTable;
                // var customer = Object.keys(lolaa).map(function (s) { return lolaa[s] });
                if (response.data.bigTable) {
                    this.setState({ data: response.data.bigTable });
                }
            })
            .catch((error) => {
                // get and set props - register state
                this.setState({ data: error });
            });
    }

    render() {

        return (
            <div className="w-100 h-100">
                <div className="col m12 s12 w-100 h-100">
                    <div className="row h-100 overflowN">

                        <div className="col m9 h-100">
                            <div className="card-panel hoverable col m12 h-95 overflowY">
                                <Table />
                            </div>
                        </div>

                        <div className="col m3 h-100">
                            <div className="row h-100 overflowN">

                                <div class="valign-wrapper h-50">
                                    <div className="card-1 col m12 card h-auto">
                                        <Chart />
                                    </div>
                                </div>
                                <div class="valign-wrapper h-0">
                                    <div className="card-1 col m12 card h-auto">
                                        <Chart />
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default viewStatements;
