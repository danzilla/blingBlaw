import React, { Component } from 'react';
import axios from 'axios';
// addNewFannyPackForm
class addNewFannyPackForm extends Component {
    // states
    constructor(props) {
        super(props)
        this.state = {
            wallet: {
                name: ""
            }
        }
    }
    // handleChange - get and set state for wallet form
    handleChange = (propertyName, event) => {
        const wallet = this.state.wallet;
        wallet[propertyName] = event.target.value;
        this.setState({ wallet: wallet });
    }
    // onSubmit
    submitNewAccount = () => {

        if (this.state.wallet.name){
            alert(this.state.wallet.name);
        }
        // Axios - POST - fannypack/view
        axios.post('http://localhost:5000/fannypack/add', {
            fannyPack: this.state.wallet.name,
            userSerial: this.props.activeUser
        })
        // if any response
        .then((response) => {
            alert(JSON.stringify(response));
        })
        // catch error
        .catch((error) => {
            alert(JSON.stringify(error));
        });
    }
    // Render
    render() {
        return (
            /* Account Form - input */
            <div className="container py-1">
                {/* AccountName */}
                <div className="input-field col s11 m11">
                    <input name="AccountName" id="AccountName" type="text"
                        onChange={this.handleChange.bind(this, 'name')}
                        value={this.state.wallet.name}
                        className="validate" required />
                    <label htmlFor="AccountName">Account name</label>
                </div>
                {/* Form - Sub button */}
                <div className="input-field col s1 m1">
                    <div className="row">
                        <button onClick={this.submitNewAccount} name="action"
                            className="btn waves-effect waves-light">
                            <i className="material-icons">create_new_folder</i>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
export default addNewFannyPackForm;
