import React, { Component } from 'react';

// Form Login
import LoginForm from './login/Login'
// Form Register
import ReqForm from './register/Register'
// Form Dummy
import Dummy from './dummyData/Dummy'

// Login - page
class Login extends Component {
    // States
    constructor(props) {
        super(props)
        this.state = {
            isLogForm: true,
            isRegFrom: false,
            isInitalConfig: false
        }
    }
    // isLoginForm
    // Get isLoginForm - From Login
    isLoginForm = (isLoginFormState) => {
        this.setState({ isLogForm: isLoginFormState })
    }
    // isRegisterForm
    // Get isRegisterForm - From Register
    isRegisterForm = (isRegisterFormState) => {
      this.setState({ isRegFrom: isRegisterFormState })
    }
    // isRegisterForm
    // Get isRegisterForm - From DB
    isInitalConfig = (isInialDBState) => {
      this.setState({ isInitalConfig: isInialDBState })
    }
    
    // blaze
    render() {
        if (this.state.isRegFrom === true) {
            // Register form
            return ( 
                <ReqForm 
                isRegisterForm={this.isRegisterForm} 
                isInitalConfig={this.isInitalConfig} /> 
            )
        } else if (this.state.isInitalConfig === true) {
            // Inital Database setting
            return ( 
                <Dummy 
                isRegisterForm={this.isRegisterForm} 
                isInitalConfig={this.isInitalConfig} /> 
            )
        } else {
            // Login Page
            return ( 
                <LoginForm 
                isRegisterForm={this.isRegisterForm} /> 
            )
        }
    }
}

export default Login;
