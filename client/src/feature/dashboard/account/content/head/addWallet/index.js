import React, { Component } from 'react';
import axios from 'axios';
// addNewWallet Form
class addNewUsersForm extends Component {
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
    submitWallet = () => {
        if (this.state.wallet.name){
            alert(this.state.wallet.name);
        }
    }
    // Render
    render() {
        return (
            /* Wallet Form - input */
            <div className="container">
                {/* walletName */}
                <div className="input-field col s11 m11">
                    <input name="walletName" id="walletName" type="text"
                        onChange={this.handleChange.bind(this, 'name')}
                        value={this.state.wallet.name}
                        className="validate" required />
                    <label htmlFor="walletName">Wallet name</label>
                </div>
                {/* Form - Sub button */}
                <div className="input-field col s1 m1">
                    <div className="row">
                        <button onClick={this.submitWallet} name="action"
                            className="btn waves-effect waves-light">
                            <i className="material-icons">create_new_folder</i>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
export default addNewUsersForm;
