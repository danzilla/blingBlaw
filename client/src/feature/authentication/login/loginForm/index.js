import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
// To-do
// Session and Auto login/redirect
// Session Client
// 
// Login
class LoginForm extends Component {
  // states
  constructor(props) {
    super(props)
    this.state = {
      login: {
        userName: "",
        password: ""
      },
      pageInfo: {
        pageMessage: "",
        pageCode: ""
      }
    }
  }
  // onClick show RegisterForm
  // isRegisterForm === TRUE
  activeRegisterForm = () => {
    this.props.activeRegisterPage()
  }
  //
  // onChange - get and set state for Login form
  handleChange = (propertyName, event) => {
    const login = this.state.login;
    login[propertyName] = event.target.value;
    this.setState({ login: login });
  }
  // submit login
  handleSubmit = (event) => {
    // If the input are empty
    if (!this.state.login.userName || !this.state.login.password) {
      // setState to = False
      this.setState({ pageMessage: "Credentials required "});
    } else { // validate against server:5000
      // Post | query
      axios
      .post('http://localhost:5000/login', {
        uname: this.state.login.userName,
        pwd: this.state.login.password
      })
      .then((response) => {
        // code - 3D000 - No Databases
        // code - 42P01 - No Tables 
        // code - ECONNREFUSED - Database - not being configured in Settings 
        //      - Change /server/app/config/app.db [ Dev or Prod ]
        // else - Show Good/Bad Message 
        if (response.data.pageInfo.pageCode === "3D000" || response.data.pageInfo.pageCode === "42P01") {
          // Go to - inital page - Set to isInitalConfig == True
          this.props.updateAlertMessage({ pageMessage: response.data.pageInfo.pageMessage })
          this.props.activFirstRunPage();
        } else { // else no errors
            if (response.data.pageInfo.pageCode === true) { // If login is good
              // Goto dashboard
              this.props.history.push('/dashboard');
            } else {  // if login is bad - show msg
              this.setState({ pageInfo: response.data.pageInfo });
            }
        }
        console.log(JSON.stringify(response.data.pageInfo));
      })
      .catch((error) => { // get and set props - Login state
        this.setState({ pageInfo: { ...this.state.pageInfo, pageMessage: error } });
        console.log(error);
      });
    }
    // default prevent-refresh form dawg
    event.preventDefault();
  }

  // validation
  render() {
    return (
    <form onSubmit={this.handleSubmit}>
        {/* Login Form - input */}
        <div className="row">
            {/* User Name */}
            <div className="input-field col s12">
                <input name="userName" id="userName" type="text"
                onChange={this.handleChange.bind(this, 'userName')}
                value={this.state.login.userName}
                className="validate" required />
                <label htmlFor="userName">User name</label>
            </div>
            {/* Password */}
            <div className="input-field col s12">
                <input name="password" id="password" type="password"
                onChange={this.handleChange.bind(this, 'password')}
                value={this.state.login.password}
                className="validate" required />
                <label htmlFor="password">Password</label>
            </div>
            {/* err */}
            <div className="center-align col s12 pink-text text-lighten-2">
                {this.state.pageInfo.pageMessage}
            </div>
        </div>
        {/* Login Form - Sub button */}
        <div className="row center-align">
            <button className="btn waves-effect waves-light"
                type="submit" name="action">
                Sign In
            </button>
            <br />
            <button className="my-1 waves-effect waves-teal btn-flat"
                onClick={this.activeRegisterForm} >
                Register
            </button>
        </div>
    </form>
    );
  }
}
export default withRouter(LoginForm);
