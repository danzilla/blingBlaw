import React, { Component } from 'react';
import { emojify } from 'react-emojione';
import axios from 'axios';

// To-do
// Session and Auto login/redirect
// Session Client

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
      pageMesage: "",
      pageGood: false
    }
  }

  // onChange - get and set state for Login form
  handleChange = (propertyName, event) => {
    const login = this.state.login;
    login[propertyName] = event.target.value;
    this.setState({ login: login });
  }

  // submit login
  handleSubmit = (event) => {

    if (!this.state.login.userName || !this.state.login.password){
      // If the input are empty
      // setState to = False
      this.setState({ pageMesage: "Credentials required ", pageGood: false });
    } else {
      // validate against server:5000
      // query
      axios.post('http://localhost:5000/login', {
        uname: this.state.login.userName,
        pwd: this.state.login.password
      })
      .then((response) => {
        if ((!response.data) || (response.data.pageGood === false)) {
          // if response.data = empty or bad
          // set local state
          this.setState({ pageMesage: response.data.pageMesage, pageGood: response.data.pageGood });
          // get and set props - Login state
          this.props.isLogged(response.data.pageGood)
        } else {
          // if response.data = good
          // set local state
          this.setState({ pageMesage: response.data.pageMesage, pageGood: response.data.pageGood });
          // get and set props - Login state
          this.props.isLogged(response.data.pageGood)
        }
      })
      .catch((error) => {
        // get and set props - Login state
        this.props.isLogged(false)
        console.log(error);
      });
    }
    // default prevent-refresh form dawg
    event.preventDefault();
  }

  // onClick show RegisterForm
  // isRegisterForm === TRUE
  activeRegisterForm = () => {
    this.props.isRegisterForm(true)
  }

  render() {
    return (
      <div className="valign-wrapper w-100 h-100">
        <div className="valign w-100">
          <div className="container">

            <div className="row">
              <div className="col m4 offset-m4 s8 offset-s2">
                <div className="card card-1 z-depth-4">
                  <div className="card-content">

                    <h5 className="card-title black-text">Sign In <span>{emojify(':rocket:')}</span></h5>

                    <form onSubmit={this.handleSubmit}>
                      {/* Login Form - input */}
                      <div className="row">
                        {/* User Name */}
                        <div className="input-field col s12">
                          <input name="userName" id="userName" type="text"
                            onChange={this.handleChange.bind(this, 'userName')}
                            value={this.state.login.userName}
                            className="validate" required />
                          <label for="userName">User name</label>
                        </div>
                        {/* Password */}
                        <div className="input-field col s12">
                          <input name="password" id="password" type="password"
                            onChange={this.handleChange.bind(this, 'password')}
                            value={this.state.login.password}
                            className="validate" required />
                          <label for="password">Password</label>
                        </div>
                        {/* err */}
                        <div className="center-align col s12 pink-text text-lighten-2">
                          {this.state.pageMesage}
                        </div>
                      </div>
                      {/* Login Form - Sub button */}
                      <div className="row center-align">
                        <button className="btn waves-effect waves-light" type="submit" name="action"> Sign In </button>
                        <br />
                        <a  onClick={this.activeRegisterForm} className="waves-effect waves-light"> Register </a>
                      </div>
                    </form>

                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    );
  }
}

export default LoginForm;
