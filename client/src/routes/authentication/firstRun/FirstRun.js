import React, { Component } from 'react';
import { emojify } from 'react-emojione';
import axios from 'axios';

import List from './List';

const firstRunInitialDB = require('../../../settings/fetch');


// FirstRun
class FirstRun extends Component {
  
  // states
  constructor(props) {
    const firstRunCheck = {
      database: {
        usersDB: {checked: ""},
        fannyDB: { checked: "" }
      },
      schema: {
        usersSchema: { checked: "" },
        fannypackSchema: { checked: "" }
      },
      table: {
        userAuth: { checked: "" },
        userDetails: { checked: "" },
        userRecord: { checked: "" },
        userGroup: { checked: "" },
        fannyPack: { checked: "" },
        fannyRecord: { checked: "" }
      }
    }
    super(props)
    this.state = {
      firstRunCheck: firstRunCheck,
      pageMesage: "",
      data: ""
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
    // submit to server
    axios.post('http://localhost:5000/firstrun', {
      code: "this.state.code"
    })
    .then((response) => {
      console.log("response : " + JSON.stringify(response.data));
      this.setState({ 
        firstRunCheck: response.data.firstRunCheck,
        pageMesage: response.data.pageMesage,
        databaseStatus: response.data.firstRun,
        data: response.data.firstRunCheck
      });
    })
    .catch((error) => {
      let errMsg = error.response.statusText + " - " + error.response.status;
      let databaseStatus = { assets: '', fannyPack: ''};
      console.log("error: " + errMsg);
      this.setState({ 
        pageMesage: errMsg,
        databaseStatus: databaseStatus
      });
    });
  }

  // First Run
  render() {
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
                      {/* Heading */}
                      <h5 className="card-title black-text">
                        Initial app config {emojify(':hot_pepper:')}
                      </h5>
                      {/* assets config */}
                      <List firstRunCheck={this.state.firstRunCheck}
                        databaseStatus={this.state.databaseStatus} />
                    </div>
                    
                    {/* err */}
                    {this.state.pageMesage &&
                      <div className="center-align col m12 s12 pink-text text-lighten-2">
                        {this.state.pageMesage}
                      </div>
                    }

                    <div className="col m12 center-align">
                      <a 
                        className="capitalize waves-effect waves-light btn pink lighten-2"
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
