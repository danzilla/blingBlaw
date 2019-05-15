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
    showTransaction = () => {
        this.props.isDashboardPage(false);
        this.props.isStatementPage(true);
        this.props.isTransactionPage(false);
        console.log("adasds  asd  ada");
    }

    showLola = (lola) => {
        console.log(lola);
    }

    render() {
        // console.log(JSON.stringify(this.state.data));
        const rows = this.state.data;
        let cardStatement = "";
        if (rows){
            cardStatement = Object.keys(rows).map((i) =>
                <StatementCard
                    key={rows[i][0].statement_serial}
                    cardTitle={rows[i][0].statement_date}
                    cardModalId={rows[i][0].statement_serial}
                    cardBody={rows[i]}
                    showTransaction={this.showTransaction}
                    cardChartData={rows[i]} />,
            );
        } else {
            cardStatement = "No Data";
        }
        return (
            <div className="h-100">
                <div className="col m12 s12 h-100 overflowY">
                    <div className="row">
                        {cardStatement}
                    </div>
                </div>
            </div>
        );
    }
}

export default viewStatements;
