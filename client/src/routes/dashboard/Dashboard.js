import React, { Component } from 'react';

import Table from './table'

// Global-Style Materialize
import Materialize from '../../util/Materialize';

class Dashboard extends Component {

  render() {
    return (

      <div className="row h-100">

        <Materialize />

        <div className="col m4 s12 h-100">
          <div class="valign-wrapper h-100">


            <ul id="dropdown1" class="dropdown-content">
              <li><a href="#!">one</a></li>
              <li><a href="#!">two</a></li>
              <li class="divider"></li>
              <li><a href="#!">three</a></li>
            </ul>
            
            <nav className="container">
              <div class="nav-wrapper">
                
                <form>
                  <div class="input-field cyan darken-3">
                    <input id="search" type="search" placeholder="Search for awesomeness" required />
                    <label class="label-icon" for="search">
                      <i class="material-icons">search</i>
                    </label>
                    <i class="material-icons">close</i>
                  </div>
                  <a class='dropdown-trigger btn' for="search" href='#' data-target='dropdown1'>
                    Drop Me!
                  </a>
                </form>

              </div>
            </nav>

   

          </div>
        </div>

        <div className="col m8 s12 h-100 overflowY">
          <div className="card z-depth-2">
            <Table />
            <Table />
            <Table />
          </div>
        </div>

      </div>
      
    );
  }
}

export default Dashboard;
