import React, { Component } from 'react';
import axios from 'axios';

class addNewUsersForm extends Component {
    // states
    constructor(props) {
        super(props)
        this.state = {
            register: {
                userName: "",
                password: "",
                fannyPack: ""
            },
            pageMesage: ""
        }
    }
    // handleChange - get and set state for register form
    handleChange = (propertyName, event) => {
        const register = this.state.register;
        register[propertyName] = event.target.value;
        this.setState({ register: register });
    }
    // handleSubmit - register
    handleSubmit = (event) => {
        if (!this.state.register.userName || !this.state.register.password || !this.state.register.fannyPack) {
            // If the input are empty 
            // setState to = False
            this.setState({ pageMesage: "Credentials required ", pageGood: false });
        } else {
            // submit to server
            axios.post('http://localhost:5000/users/add', {
                userName: this.state.register.userName,
                password: this.state.register.password,
                fannyPack: this.state.register.fannyPack
            })
                .then((response) => {
                    if ((!response.data) || (response.data.pageGood === false)) {
                        // if response.data = empty or bad
                        // set local state
                        this.setState({ pageMesage: response.data.pageMesage });
                    } else {
                        // if response.data = good
                        // set local state
                        this.setState({ pageMesage: response.data.pageMesage });
                    }
                })
                .catch((error) => {
                    // get and set props - register state
                    console.log("message: " + error.message);
                });
        }
        // default prevent-refresh Form dawg
         event.preventDefault();
    }
    // Render
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {/* Register Form - input */}
                <div className="row">
                    {/* FannyPack Name */}
                    <div className="input-field col s4 m4">
                        <input name="fannyPack" id="fannyPack" type="text"
                            onChange={this.handleChange.bind(this, 'fannyPack')}
                            value={this.state.register.fannyPack}
                            className="validate" required />
                        <label htmlFor="fannyPack">Fanny Pack</label>
                    </div>
                    {/* User Name */}
                    <div className="input-field col s4 m4">
                        <input name="userName" id="userName" type="text"
                            onChange={this.handleChange.bind(this, 'userName')}
                            value={this.state.register.userName}
                            className="validate" required />
                        <label htmlFor="userName">User name</label>
                    </div>
                    {/* Password */}
                    <div className="input-field col s4 m4">
                        <input name="password" id="password" type="password"
                            onChange={this.handleChange.bind(this, 'password')}
                            value={this.state.register.password}
                            className="validate" required />
                        <label htmlFor="password">Password</label>
                    </div>
                    {/* err */}
                    <div className="center-align col s12 pink-text text-lighten-2">
                        {this.state.pageMesage}
                    </div>
                </div>
                {/* Form - Sub button */}
                <div className="row center-align">
                    <button className="btn waves-effect waves-light" type="submit" name="action"> Add user </button>
                </div>
            </form>
        );
    }
}

export default addNewUsersForm;
