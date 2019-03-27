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

      <div class="valign-wrapper" style={style}>
        <div class="valign" style={h100}>
          <div class="container">
          
            <div class="row">
              <div class="col s8 m4 offset-m3">
                <div class="card">
                  <div class="card-content">
                    
                    <span class="card-title black-text">Sign In</span>
                    <form>

                      <div class="row">    
                        <div class="input-field col s12">
                          <input name="user" id="user" type="text" class="validate" />
                          <label for="user">User name</label>
                        </div>
                        <div class="input-field col s12">
                          <input name="password" id="password" type="password" class="validate" />
                          <label for="password">Password</label>
                        </div>
                      </div>

                      <div className="row center-align">
                        <button class="btn waves-effect waves-light" type="submit" name="action">
                          Sign In
                        <i class="material-icons right">send</i>
                        </button>
                        <a href="/register" class="waves-effect waves-light">
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

