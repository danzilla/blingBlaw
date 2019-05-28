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
      code: "",
      pageMesage: "asdasd",
      isRegFrom: true
    }
  }

  // onClick show LoginForm
  // set - isRegisterForm === false
  activeLoginForm = () => {
    this.props.isRegisterForm(false)
    this.props.isInitalConfig(false)
  }

  // Init Database and Table 
  // onClick create DB - Request 
  initDatabase = () => {
    console.log("asdfsafsdf: initDatabase");

    // submit to server
    axios.post('http://localhost:5000/dummy/createTable', {
      userName: this.state.register.userName,
      password: this.state.register.password,
      fannyPack: this.state.register.fannyPack
    })
    .then((response) => {
      this.setState({ pageMesage: response});
      console.log("response : " + JSON.stringify(response));
    })
    .catch((error) => {
      this.setState({ pageMesage: error.message});
      console.log("error: " + error.message);
    });
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

                     {/* err */}
                     <div className="center-align col m12 s12 pink-text text-lighten-2">
                       {JSON.stringify(this.state.pageMesage)}
                     </div>

                     <div className="col m12 center-align">
                        <a className=" waves-effect waves-light btn pink lighten-4"
                          onClick={this.initDatabase}>
                          <i className="material-icons left">sd_storage</i>
                          Initialize Database!
                        </a>
                      </div>

                       {/* Form - Sub button */}
                      <div className="row center-align">
                        <a onClick={this.activeLoginForm} className="waves-effect waves-light"> Register </a>
                        <a onClick={this.activeLoginForm} className="waves-effect waves-light"> login </a>
                      </div>

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
