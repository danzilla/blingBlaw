import React, { Component } from 'react';
import { emojify } from 'react-emojione';
import axios from 'axios';

// RegisterForm
class RegisterForm extends Component {
  // states
  constructor(props) {
    super(props)
    this.state = {
      register: {
        userName: "",
        password: "",
        fannyPack: ""
      },
      pageMesage: "",
      isRegFrom: true
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

  activeLoginForm = () => {
    this.props.isRegisterForm(false)
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

                    <h5 className="card-title black-text">Register {emojify(':heart:')}</h5>

                    <form onSubmit={this.handleSubmit}>
                      {/* Register Form - input */}
                      <div className="row">
                        {/* FannyPack Name */}
                        <div className="input-field col s12">
                          <input name="fannyPack" id="fannyPack" type="text"
                            onChange={this.handleChange.bind(this, 'fannyPack')}
                            value={this.state.register.fannyPack}
                            className="validate" required />
                          <label for="fannyPack">Fanny Pack</label>
                        </div>
                        {/* User Name */}
                        <div className="input-field col s12">
                          <input name="userName" id="userName" type="text"
                            onChange={this.handleChange.bind(this, 'userName')}
                            value={this.state.register.userName}
                            className="validate" required />
                          <label for="userName">User name</label>
                        </div>
                        {/* Password */}
                        <div className="input-field col s12">
                          <input name="password" id="password" type="password"
                            onChange={this.handleChange.bind(this, 'password')}
                            value={this.state.register.password}
                            className="validate" required />
                          <label for="password">Password</label>
                        </div>
                        {/* err */}
                        <div className="center-align col s12 pink-text text-lighten-2">
                          {this.state.pageMesage}
                        </div>
                      </div>
                      {/* Form - Sub button */}
                      <div className="row center-align">
                        <button className="btn waves-effect waves-light" type="submit" name="action"> Register </button>
                        <br />
                        <a onClick={this.activeLoginForm} className="waves-effect waves-light"> login </a>
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

export default RegisterForm;
