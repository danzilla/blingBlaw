import React, { Component } from 'react'
import axios from 'axios'

import StatementCard from './viewStatementsCards'
import StatementsTransactions from './viewStatementsTransactions'

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

        // console.log(JSON.stringify(this.state.data));
        const rows = this.state.data;
        let cardStatement = "";
        let statementTransaction = "";
        if (rows){
            cardStatement = Object.keys(rows).map((i) =>
                <StatementCard
                    key={rows[i][0].statement_serial}
                    cardTitle={rows[i][0].statement_date}
                    cardModalId={rows[i][0].statement_serial}
                    cardBody={rows[i]}
                    cardChartData={rows[i]} />,
            );
            statementTransaction = Object.keys(rows).map((j) =>
                <StatementsTransactions
                    key={rows[j][0].statement_serial}
                    cardModalId={rows[j][0].statement_serial}
                    cardBody={rows[j]} />,
            );
        } else {
            cardStatement = "No Data";
        }

        return (
            <div className="h-100">
                <div className="col m12 s12 h-100 overflowY">
                    <nav className="card-1 waves-effect waves-block waves-darker red accent-1">
                        <div className="nav-wrapper container ">
                            <div className="center">
                                <a href="">Chart - need to be SUM and GROUP of Parent Spends </a>
                            </div>
                        </div>
                    </nav>
                    <div className="row">
                        {statementTransaction}
                        {cardStatement}
                    </div>
                   
                </div>
            </div>
        );
    }
}

export default viewStatements;
