import React, { Component } from "react";
import { connect } from "react-redux";

import UserInfo from "../../components/_test/UserInfo";
import Form1 from "../../components/_test/Form";

import { Form } from 'antd';


class Dashboard extends Component {
  render() {
    return (
      <div className="container">
        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
            {/* Props details */}
            {this.props ? <p> {JSON.stringify(this.props)} </p> : <p>connect not working</p>}
            {/* Form */}
            <Form1 />
            {/*Body*/}
            {this.props.data.fetchReducers.isFetching ? <h3>Loading...</h3> : null}
            {this.props.data.fetchReducers.isError ? (<h3 className="error">No such User exists.</h3>) : null}
            {Object.keys(this.props.data.fetchReducers.userData).length > 0 ? (<UserInfo user={this.props.data.fetchReducers.userData} />) : null}
        </Form>
      </div>
    );
  }
}
// State TEST
const mapStateToProps = state => { return { data: state }; };
export default connect(mapStateToProps)(Dashboard);