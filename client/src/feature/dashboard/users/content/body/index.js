import React, { Component } from 'react';
import axios from 'axios';
// User Table
class Table extends Component {
    // constructor
    constructor(props) {
        super(props)
        this.state = { response: ["response"] }
    }
    // 
    // componentDidMount
    componentDidMount() {
        axios
        .post('http://localhost:5000/user/view', {
            uname: "this.state.login.userName",
            pwd: "this.state.login.password"
        })
        .then((response) => {
            this.setState({ response: response.data.pageInfo.pageMessage})
            this.props.updateAlertMessage("Users been loaded!")
            console.log(response.data.pageInfo);
        })
        .catch((error) => {
            this.props.updateAlertMessage("error")
            console.log(error);
        });
    }
    // 
    // Data
    render() {
        return (
            <div>
                <table className="highlight responsive-table">
                    <thead>
                        <tr>
                            <th>Serial</th>
                            <th>User</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.response.map(item => {
                                return (
                                    <tr key={item.user_serial}>
                                        <td>{item.user_serial}</td>
                                        <td>{item.user_name}</td>
                                        <td><button className="btn waves-effect waves-dark"><i class="material-icons">settings</i></button></td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
            
        );
    }
}
export default Table;
