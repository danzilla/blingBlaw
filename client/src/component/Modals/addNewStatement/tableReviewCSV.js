import React from 'react'

class TableReview extends React.Component {
    // React States
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            data1: []
        };
    }
    // Render
    render() {
         return (
        <table className={this.props.className}>
                <thead class="thead-dark">
                    <tr class="bg-dark text-light">
                        <th scope="col" class="text-center"> ID </th>
                        <th scope="col" class="">Date</th>
                        <th scope="col" class="">Description</th>
                        <th scope="col" class="text-center">Transaction</th>
                        <th scope="col" class="text-center">Balance</th>
                        <th scope="col" class="text-center">Labels</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.reviewCSV.map((row, i) =>
                        <tr key={i}>
                            <td>i</td>
                            <td>{row.field1}</td>
                            <td>{row.field2}</td>
                            {/* 
                                Check if Deposite or Withdrawl | Display only one
                            */}
                            <td>{row.field3 === '' ? row.field4 : row.field3}</td>
                            <td>{row.field5}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
}

export default TableReview;