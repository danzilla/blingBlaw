import React, { Component } from 'react';
import axios from 'axios';

class viewUsersTable extends Component {
    // states
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }
    componentDidMount = () => {
        console.log("componentDidMount: loading Users");
        // load Users
        // Better way to manage Users
        // submit to server
        axios.get('http://localhost:5000/users/view')
        .then((response) => {
            if (response.data.rowCount >= 1) {
                this.setState({ data: response.data.data });
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
            <div>
                <table className="table">
                    <thead className="thead-dark">
                        <tr className="bg-dark text-light">
                            <th scope="col" className="">Time</th>
                            <th scope="col" className="">user_serial</th>
                            <th scope="col" className="text-center">user_name</th>
                            <th scope="col" className="text-center">user_pwd</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map((row, i) =>
                            <tr key={i}>
                                <td>{row.user_pwd_salt}</td>
                                <td>{row.user_serial}</td>
                                <td>{row.user_name}</td>
                                <td>{row.user_pwd_hash}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default viewUsersTable;
