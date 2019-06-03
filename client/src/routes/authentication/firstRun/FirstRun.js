import React, { Component } from 'react';
import { emojify } from 'react-emojione';
import axios from 'axios';

const firstRunInitialDB = require('../../../settings/fetch');

// RegisterForm
class FirstRun extends Component {
  // states
  constructor(props) {
    super(props)
    this.state = {
      firstRun: {
        assets: 'checked',
        fannyPack: ''
      },
      register: {
        fannyPack: ""
      },
      code: "",
      pageMesage: "",
      isRegFrom: true
    }
  }

  // onClick show LoginForm
  // set - isRegisterForm === false
  activeLoginForm = () => {
    this.props.isLoginForm(false)
    this.props.isRegisterForm(true)
    this.props.isInitalConfig(false)
  }

  // Init Database and Table 
  // onClick create DB - Request 
  initDatabase = () => {
    console.log("\n- First - Run -");
    console.log("firstRunInitialDB: " + firstRunInitialDB + "\n");
    // submit to server
    axios.post('http://localhost:5000/firstrun/initDB', {
      fannyPack: this.state.register.fannyPack
    })
    .then((response) => {
      console.log("response : " + JSON.stringify(response.data));
      this.setState({ 
        pageMesage: response.data,
        firstRun: response.data.firstRun
      });
    })
    .catch((error) => {
      this.setState({ 
        pageMesage: error,
        firstRun: {
          assets: '',
          fannyPack: ''
        }
      });
      console.log("error: " + error.message);
    });
  }







  // First Run
  render() {
    console.log(JSON.stringify(this.state.firstRun));
    
    return (
      <div className="valign-wrapper w-100 h-100">
        <div className="valign w-100">
          <div className="container">

            <div className="row">
              <div className="col m4 offset-m4 s8 offset-s2">
                <div className="card card-1 z-depth-4">
                  <div className="card-content">
                    
                    {/* contents */}
                    <div className="container">

                      1: {this.state.firstRun.assets}
                      2: {this.state.firstRun.fannyPack}

                      {/* Heading */}
                      <h5 className="card-title black-text">
                        Initial app config {emojify(':hot_pepper:')}
                      </h5>
                      {/* assets config */}
                      <ul>
                        <li>
                          <label>
                            <input type="checkbox" 
                              checked={this.state.firstRun.assets} />
                            <span>Initial assets config</span>
                          </label>
                        </li>
                        <li>
                          <label>
                            <input type="checkbox" 
                              checked={this.state.firstRun.fannyPack} />
                            <span>Initial fannyPackz config</span>
                          </label>
                        </li>
                      </ul>
                    </div>
                    
                    {/* err */}
                    {this.state.pageMesage &&
                      <div className="center-align col m12 s12 pink-text text-lighten-2">
                        {JSON.stringify(this.state.pageMesage)}
                      </div>
                    }

                    <div className="col m12 center-align">
                      <a className=" waves-effect waves-light btn pink lighten-4"
                        onClick={this.initDatabase}>
                        <i className="material-icons left">sd_storage</i>
                        Initialize Database!
                      </a>
                    </div>

                    {/* Form - Sub button */}
                    <div className="row center-align">
                      <a onClick={this.activeLoginForm} 
                        className="waves-effect waves-light"> 
                        Register 
                      </a>
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

export default FirstRun;
