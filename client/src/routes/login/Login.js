import React, { Component } from 'react';

class Login extends Component {

  render() {

    let h100 = {
      width: '100%'
    }
    let style = {
      width:'100%', 
      height:'100%', 
      position: 'absolute'
    }

    return (

      <div className="valign-wrapper" style={style}>
        <div className="valign" style={h100}>
          <div className="container">
          
            <div className="row">
              <div className="col s8 m4 offset-m3">
                <div className="card">
                  <div className="card-content">
                    
                    <span className="card-title black-text">Sign In</span>
                    <form>

                      <div className="row">    
                        <div className="input-field col s12">
                          <input name="user" id="user" type="text" className="validate" />
                          <label for="user">User name</label>
                        </div>
                        <div className="input-field col s12">
                          <input name="password" id="password" type="password" className="validate" />
                          <label for="password">Password</label>
                        </div>
                      </div>

                      <div className="row center-align">
                        <button className="btn waves-effect waves-light" type="submit" name="action">
                          Sign In
                        <i className="material-icons right">send</i>
                        </button>
                        <a href="/register" className="waves-effect waves-light">
                          Register
                        </a>
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

