import React, { Component } from 'react';

import axios from 'axios';

class viewCategoryTable extends Component {
    // states
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }
    componentDidMount = () => {
        console.log("componentDidMount: " + "loading category");
        // loading category
        // Better way to manage category
        // submit to server
        axios.get('http://localhost:5000/category/view')
        .then((response) => {
            if (response.data.rowCount >= 1) {
                this.setState({ data: response.data.data });
                // pass it to props-Parent
                this.props.categories(response.data.data);
            } else {
                this.setState({ data: "error" });
            }
        })
        .catch((error) => {
            // get and set props - register state
            this.setState({ data: error });
        });
        
    }
    // Render
    render() {
        return (
            <div className="row">
                <table className="table">
                    <thead className="thead-dark">
                        <tr className="bg-dark text-light">
                            <th scope="col" className="">category_id</th>
                            <th scope="col" className="">category_serial</th>
                            <th scope="col" className="">category_name</th>
                            <th scope="col" className="text-center">category_parent</th>
                            <th scope="col" className="text-center">category_created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map((row, i) =>
                            <tr key={i}>
                                <td>{row.category_id}</td>
                                <td>{row.category_serial}</td>
                                <td>{row.category_name}</td>
                                <td>{row.category_parent}</td>
                                <td>{row.category_created}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default viewCategoryTable;
