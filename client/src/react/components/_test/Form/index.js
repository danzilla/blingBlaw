import React, { Component } from "react";
import { connect } from "react-redux";
import {
  thunk_action_creator,
  thunk_action_clear
} from "../../../../redux/actions/fetchAction";

class UserFindForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const username = this.getUsername.value;
    this.props.dispatch(thunk_action_creator(username));
    this.getUsername.value = "";
    console.log(this.props);
  };
  cleanSearch = e => {
    e.preventDefault();
    this.props.dispatch(thunk_action_clear());
    this.getUsername.value = "";
    console.log(this.props);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="form">
        <h2 className="title">Enter the Github Username</h2>
        <input
          type="text"
          placeholder="Enter Github Username"
          required
          ref={input => (this.getUsername = input)}
        />
        <button onClick={this.cleanSearch} className="button">Reset</button>
        <button className="button">Submit</button>
      </form>
    );
  };
}

const mapStateToProps = state => {
  return { data: state };
};
export default connect(mapStateToProps)(UserFindForm);
