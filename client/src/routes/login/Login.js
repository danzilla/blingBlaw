import React, { Component } from 'react';
import axios from 'axios'

// Login
class Login extends Component {
  //states
  constructor(props) {
    super(props)
    this.state = {
      login: {
        userName: "",
        password: ""
      },
      pgMsg: "asdas",
      pgMsgColor: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  // onChange - get and set state for Login form
  handleChange(propertyName, event){
    const login = this.state.login;
    login[propertyName] = event.target.value;
    this.setState({ login: login });
  }

  handleSubmit(event){
    axios.post('http://localhost:5000/login', {
        uname: this.state.login.userName,
        pwd: this.state.login.password
      })
      .then(function (response) {
        console.log(response.data.hello)
        this.setState({ pgMsg: "pga" })
      })
      .catch(function (error) {
        console.log(error);
      });
    
    event.preventDefault();
  }


  render() {

    return (
      <div className="valign-wrapper w-100 h-100">
        <div className="valign w-100">
          <div className="container">
          
            <div className="row">
              <div className="col s8 m4 offset-m3">
                <div className="card">
                  <div className="card-content">
                    
                    <span className="card-title black-text">Sign In</span>
                    {this.state.pgMsg}
                    <form onSubmit={this.handleSubmit}>

                      <div className="row">    
                        <div className="input-field col s12">
                          <input name="userName" id="userName" type="text"
                            onChange={this.handleChange.bind(this, 'userName')}
                            value={this.state.login.userName}
                            className="validate" />
                          <label for="userName">User name</label>
                        </div>
                        <div className="input-field col s12">
                          <input name="password" id="password" type="password"
                            onChange={this.handleChange.bind(this, 'password')} 
                            value={this.state.login.password}
                            className="validate" />
                          <label for="password">Password</label>
                        </div>
                      </div>

                      <div className="row center-align">
                        <button className="btn waves-effect waves-light" type="submit" name="action"> Sign In </button>
                        <br />
                        <a href="/register" className="waves-effect waves-light"> Register </a>
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

export default Login;

