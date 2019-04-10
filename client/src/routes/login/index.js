import React, { Component } from 'react';
import { Redirect } from 'react-router';

// Form login
import LoginForm from './Login'

// Login
class Login extends Component {
    // States
    constructor(props) {
        super(props)
        this.state = {
            pageGood: false
        }
    }
    // isLogged 
    isLogged = (isLoggedState) => {
        this.setState({
            pageGood: isLoggedState
        })
    }
    // blaze
    render() {
        if (this.state.pageGood === true) {
            // Dashboard page - if logged good
            return ( <Redirect to="/dashboard" /> )
        } else {
            // Login Page - if Bad
            return ( <LoginForm isLogged={this.isLogged} /> )
        }
    }
}

export default Login;

