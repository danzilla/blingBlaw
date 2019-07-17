import React, { Component } from 'react';
import axios from 'axios';
// addNewWallet Form
class addNewUsersForm extends Component {
    // states
    constructor(props) {
        super(props)
        this.state = {
            fannyPackData: ""
        }
    }
    // onSubmit
    getFannyPackForUser = () => {
        // Axios - POST - fannypack/view
        axios.post('http://localhost:5000/fannypack/view', {
            userSerial: this.props.userSerial
        })
        // if any response
        .then((response) => {
            alert(JSON.stringify(response));
            this.setState({ fannyPackData: response.data})
        })
        // catch error
        .catch((error) => {
            // get and set props - register state
            alert(JSON.stringify(error));
            this.setState({ fannyPackData: error })
        });
    }
    // Render
    render() {
        return (
            /* vieFannyPack-user - input */
            <div className="container">
                <button onClick={this.getFannyPackForUser} name="action" className="btn waves-effect waves-light">
                    <i className="material-icons">create_new_folder</i>
                </button>
                <p>
                    {JSON.stringify(this.state.fannyPackData)}
                </p>
            </div>
        );
    }
}
export default addNewUsersForm;
