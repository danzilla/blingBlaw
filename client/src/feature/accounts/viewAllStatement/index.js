// Content page
// 
// React 
import React, { Component } from 'react'
// Global-Style Materialize
import Materialize from '../../../util/Materialize'
// Content
class AllStatements extends Component {
  // state
  constructor(props) {
    super(props)
      this.state = {
          reviewData: [],
          statementInfo: {
              staType: "",
              staComment: "",
              staDate: ""
          },
          pageMesage: ""
      }
  }
  // Rrrr
  render() {
    return (
    <div>
        <div className="col m4">
          <div class="card">
            <div class="card-image">
              <img src="https://i.imgur.com/o2XUcmP.jpg" />
              <span class="card-title">Card Title</span>
            </div>
            <div class="card-content">
              <p>I am a very simple card. I am good at containing small bits of information.
                      I am convenient because I require little markup to use effectively.</p>
            </div>
            <div class="card-action">
              <a href="#">This is a link</a>
            </div>
          </div>
        </div>
        <div className="col m4">
          <div class="card">
            <div class="card-image">
              <img src="https://i.imgur.com/kgmuQzi.jpg" />
              <span class="card-title">Card Title</span>
            </div>
            <div class="card-content">
              <p>I am a very simple card. I am good at containing small bits of information.
              I am convenient because I require little markup to use effectively.</p>
            </div>
            <div class="card-action">
              <a href="#">This is a link</a>
            </div>
          </div>
        </div>
        <div className="col m4">
          <div class="card">
            <div class="card-image">
              <img src="https://i.imgur.com/qxMVG2A.jpg" />
              <span class="card-title">Card Title</span>
            </div>
            <div class="card-content">
              <p>I am a very simple card. I am good at containing small bits of information.
              I am convenient because I require little markup to use effectively.</p>
            </div>
            <div class="card-action">
              <a href="#">This is a link</a>
            </div>
          </div>
        </div>
        <div className="col m4">
          <div class="card">
            <div class="card-image">
              <img src="https://i.imgur.com/o2XUcmP.jpg" />
              <span class="card-title">Card Title</span>
            </div>
            <div class="card-content">
              <p>I am a very simple card. I am good at containing small bits of information.
                      I am convenient because I require little markup to use effectively.</p>
            </div>
            <div class="card-action">
              <a href="#">This is a link</a>
            </div>
          </div>
        </div>
        <div className="col m4">
          <div class="card">
            <div class="card-image">
              <img src="https://i.imgur.com/kgmuQzi.jpg" />
              <span class="card-title">Card Title</span>
            </div>
            <div class="card-content">
              <p>I am a very simple card. I am good at containing small bits of information.
              I am convenient because I require little markup to use effectively.</p>
            </div>
            <div class="card-action">
              <a href="#">This is a link</a>
            </div>
          </div>
        </div>
        <div className="col m4">
          <div class="card">
            <div class="card-image">
              <img src="https://i.imgur.com/qxMVG2A.jpg" />
              <span class="card-title">Card Title</span>
            </div>
            <div class="card-content">
              <p>I am a very simple card. I am good at containing small bits of information.
              I am convenient because I require little markup to use effectively.</p>
            </div>
            <div class="card-action">
              <a href="#">This is a link</a>
            </div>
          </div>
        </div>    
    </div>
    );
  }
}
// Bling
export default AllStatements;
