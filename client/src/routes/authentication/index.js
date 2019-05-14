import React, { Component } from 'react';
import { Redirect } from 'react-router';

// Form login
import LoginForm from './login/Login'
// Form login
import ReqForm from './register/Register'


// Login
class Login extends Component {
    // States
    constructor(props) {
        super(props)
        this.state = {
            pageGood: false,
            isRegFrom: false
        }
    }
    // isLogged
    isLogged = (isLoggedState) => {
        this.setState({
            pageGood: isLoggedState
        })
    }
    isRegisterForm = (isRegisterFormState) => {
      this.setState({
          isRegFrom: isRegisterFormState
      })
    }
    // blaze
    render() {
        if (this.state.pageGood === true) {
            // Dashboard page - if logged good
            return ( <Redirect to="/dashboard" /> )
        }
        if (this.state.isRegFrom === true) {
            // Register form
            return ( <ReqForm isRegisterForm={this.isRegisterForm} /> )
        } else {
            // Login Page - if Bad
            return ( <LoginForm isLogged={this.isLogged} isRegisterForm={this.isRegisterForm} /> )
        }
    }
}

export default Login;
