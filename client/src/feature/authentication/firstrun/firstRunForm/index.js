import React, { Component } from 'react';
import axios from 'axios';

class FirstRunCheck extends Component {
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
      FirstRunCheck: "Hi",
      firstRunCheck: firstRunCheck,
      pageMesage: "",
      databaseStatus: "",
      data: ""
    }
  }

  // onClick show register form
  // set - isRegisterForm === false
  activeRegisterPage = () => {
    this.props.activeRegisterPage()
  }

  // Init Database and Table
  // onClick create DB - Request
  initDatabase = () => {
    // onClick
    this.props.updateAlertMessage({ pageMessage: "Hold on... initializing DBz" });
    // submit to server
    axios.post('http://localhost:5000/firstrun')
    .then((response) => {
      console.log("response : " + response.data);
      this.setState({ FirstRunCheck: response.data})
      this.props.updateAlertMessage({ pageMessage: response.data.pageMesage });
    })
    .catch((error) => {
      let errMsg = error.response.statusText + " - " + error.response.status;
      console.log("error: " + errMsg);
      this.props.updateAlertMessage({ pageMessage: errMsg });
    });
  }
    render() {

        if (this.state.FirstRunCheck){
            { JSON.stringify(this.state.FirstRunCheck) }
        }
        
        return (
            <div className="App">
                
                <ul>
                    <li>
                        <label>
                            <input type="checkbox" checked={this.state.firstRunCheck.database.usersDB.checked} />
                            <span>Initial assets (Database)</span>
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="checkbox"
                                checked={this.state.firstRunCheck.database.fannyDB.checked} />
                            <span>Initial fannyPackz (Database)</span>
                        </label>
                    </li>

                    <hr />
                    <li>
                        <label>
                            <input type="checkbox"
                                checked={this.state.firstRunCheck.schema.usersSchema.checked} />
                            <span>Initial Users (Schema)</span>
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="checkbox"
                                checked={this.state.firstRunCheck.schema.fannypackSchema.checked} />
                            <span>Initial fannyPackz (Schema)</span>
                        </label>
                    </li>

                    <hr />
                    <li>
                        <label>
                            <input type="checkbox"
                                checked={this.state.firstRunCheck.table.userAuth.checked} />
                            <span>Initial userAuth (Table)</span>
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="checkbox"
                                checked={this.state.firstRunCheck.table.userDetails.checked} />
                            <span>Initial userDetails (Table)</span>
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="checkbox"
                                checked={this.state.firstRunCheck.table.userRecord.checked} />
                            <span>Initial userRecord (Table)</span>
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="checkbox"
                                checked={this.state.firstRunCheck.table.userGroup.checked} />
                            <span>Initial userGroup (Table)</span>
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="checkbox"
                                checked={this.state.firstRunCheck.table.fannyPack.checked} />
                            <span>Initial fannyPack (Table)</span>
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="checkbox"
                                checked={this.state.firstRunCheck.table.fannyRecord.checked} />
                            <span>Initial fannyPackzRecord (Table)</span>
                        </label>
                    </li>
                </ul>
                {/* Err Message */}
                {this.state.pageMesage &&
                    <div className="center-align col m12 s12 pink-text text-lighten-2">
                        {this.state.pageMesage}
                    </div>
                }
                {/* Initialize Database */}
                <div className="col m12 center-align">
                    <a className="capitalize waves-effect waves-light btn pink lighten-2"
                        onClick={this.initDatabase}>
                        <i className="material-icons left">sd_storage</i> Initialize Database!
                    </a>
                </div>
                {/* Form - Sub button */}
                <div className="row center-align">
                    <a onClick={this.activeRegisterPage} className="waves-effect waves-light">
                        Register
                    </a>
                </div>
            </div>
        );
    }
}
export default FirstRunCheck;


/*


*/