import React, { Component } from 'react';

// Form FirstRun
import FirstRun from './firstRun/FirstRun'
// Form Login
import LoginForm from './login/Login'
// Form Register
import RegForm from './register/Register'

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
    // isInitalConfig
    // Get isInitalConfig - From DB
    isInitalConfig = (isInialDBState) => {
      this.setState({ isInitalConfig: isInialDBState })
    }
    
    // blaze
    render() {
        if (this.state.isRegFrom === true) {
            // Register form
            return ( 
                <RegForm
                    isLoginForm={this.isLoginForm}
                    isRegisterForm={this.isRegisterForm} 
                    isInitalConfig={this.isInitalConfig}
                 /> 
            )
        } else if (this.state.isInitalConfig === true) {
            // First Run
            return ( 
                <FirstRun 
                    isLoginForm={this.isLoginForm}
                    isRegisterForm={this.isRegisterForm} 
                    isInitalConfig={this.isInitalConfig}
                /> 
            )
        } else {
            // Login Page
            return ( 
                <LoginForm 
                    isLoginForm={this.isLoginForm}
                    isRegisterForm={this.isRegisterForm} 
                    isInitalConfig={this.isInitalConfig}
                /> 
            )
        }
    }
}

export default Login;
